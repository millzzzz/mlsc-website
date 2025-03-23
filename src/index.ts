import { Hono } from 'hono';
import { serveStatic } from 'hono/bun';
import { logger } from 'hono/logger';
import { env } from 'hono/adapter';
import { getCookie, setCookie } from 'hono/cookie';
import { createMiddleware } from 'hono/factory';
import { publicRoutes } from './routes/public';
import { previewRoutes } from './routes/preview';
import { apiRoutes } from './routes/api';
import { errorHandler } from './middleware/error-handler';
import payload from 'payload';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import payloadConfig from './cms/payload.config';

// Define app variable types
type Variables = {
  isPreviewMode: boolean;
};

// Get the current directory
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');

// Create the main app
const app = new Hono<{ Variables: Variables }>();

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false
  }
});

// Store a reference to the payload instance for later use
let payloadInstance: any = null;

// Function to initialize Payload CMS
const initPayloadCMS = async (): Promise<void> => {
  try {
    // Create uploads directory if it doesn't exist
    const uploadsDir = path.join(projectRoot, 'uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    // Initialize Payload with correct options
    payloadInstance = await payload.init({
      // Keep it very simple with just the required parameters
      config: {
        ...payloadConfig,
        secret: process.env.PAYLOAD_SECRET || 'mlsc-studio-secret-key',
      },
      // Bypass type checking for now since the Payload types may not match our version
      ...(({
        onInit: () => {
          console.log('✅ Payload CMS has initialized');
        },
        local: true, // Important: prevents Payload from starting its own server
      } as any)),
    });
    
    console.log('Payload CMS initialized successfully');
    return payloadInstance;
  } catch (error) {
    console.error('Failed to initialize Payload CMS:', error);
    throw error;
  }
};

// Apply middleware
app.use('*', logger());
app.use('*', errorHandler);
app.use('/static/*', serveStatic({ root: projectRoot }));

// Create a special middleware to handle Payload admin and API requests
const payloadMiddleware = createMiddleware(async (c, next) => {
  const path = c.req.path;
  
  // Check if the request is for Payload admin or API
  if (path.startsWith('/admin') || 
      path.startsWith('/api/admins') || 
      path.startsWith('/api/users') || 
      path.startsWith('/api/payload') ||
      path.startsWith('/api/globals') ||
      path.startsWith('/api/_preferences')) {
    
    if (!payloadInstance) {
      return c.text('Payload CMS is initializing, please try again in a moment', 503);
    }
    
    try {
      // Use Payload's built-in request handler
      // Convert Hono request to a format Payload can process
      const url = new URL(c.req.url);
      const payloadReq = {
        method: c.req.method,
        url: url.pathname + url.search,
        path: url.pathname,
        headers: Object.fromEntries(c.req.raw.headers),
        body: await c.req.json().catch(() => ({})),
        cookies: Object.fromEntries(c.req.raw.headers.get('cookie')?.split(';').map(c => c.trim().split('=')) || []),
        query: Object.fromEntries(url.searchParams),
      };
      
      // Create response objects
      let statusCode = 200;
      let responseHeaders = new Headers();
      let responseBody = '';
      
      // Create a mock response object
      const payloadRes = {
        status: (code: number) => {
          statusCode = code;
          return payloadRes;
        },
        setHeader: (name: string, value: string) => {
          responseHeaders.set(name, value);
          return payloadRes;
        },
        send: (body: any) => {
          responseBody = body;
        },
        json: (body: any) => {
          responseHeaders.set('Content-Type', 'application/json');
          responseBody = JSON.stringify(body);
        },
        end: () => {
          // Do nothing
        },
      };
      
      // Process with Payload - using the correct router path
      if (typeof payloadInstance.express?.router?.handle === 'function') {
        // Older Payload versions
        await payloadInstance.express.router.handle(payloadReq, payloadRes);
      } else if (typeof payloadInstance.router?.handler === 'function') {
        // Some Payload versions
        await payloadInstance.router.handler(payloadReq, payloadRes);
      } else if (typeof payloadInstance.router === 'function') {
        // Newer Payload versions
        await payloadInstance.router(payloadReq, payloadRes);
      } else {
        console.error('Could not find Payload router handler');
        return c.text('Configuration Error: Could not find Payload router', 500);
      }
      
      // Return the processed response
      if (responseHeaders.has('Content-Type')) {
        c.header('Content-Type', responseHeaders.get('Content-Type') || '');
      }
      
      // Use c.body() without statusCode for type safety
      c.status(statusCode as any); // Type assertion to bypass type checking
      return c.body(responseBody);
    } catch (error) {
      console.error('Error in Payload middleware:', error);
      return c.text('Internal Server Error', 500);
    }
  }
  
  return next();
});

app.use('*', payloadMiddleware);

// Set up media handling for uploads via Supabase storage proxy
app.get('/media/*', async (c) => {
  const filePath = c.req.path.replace('/media/', '');
  
  try {
    // Proxy the request to Supabase Storage
    const { data, error } = await supabase.storage
      .from('media')
      .download(`uploads/${filePath}`);
    
    if (error) {
      console.error(`Error fetching media file from Supabase: ${filePath}`, error);
      return c.notFound();
    }
    
    if (!data) {
      return c.notFound();
    }
    
    const ext = path.extname(filePath).toLowerCase();
    let contentType = 'application/octet-stream';
    
    switch (ext) {
      case '.png': contentType = 'image/png'; break;
      case '.jpg': case '.jpeg': contentType = 'image/jpeg'; break;
      case '.gif': contentType = 'image/gif'; break;
      case '.svg': contentType = 'image/svg+xml'; break;
      case '.webp': contentType = 'image/webp'; break;
    }
    
    c.header('Content-Type', contentType);
    // Add cache control headers
    c.header('Cache-Control', 'public, max-age=31536000'); // 1 year
    
    // Convert the Blob to a Buffer or ArrayBuffer for Hono
    const arrayBuffer = await data.arrayBuffer();
    return c.body(arrayBuffer);
  } catch (error) {
    const err = error as Error;
    console.error(`Error serving media file: ${filePath}`, err.message);
    return c.notFound();
  }
});

// Preview mode middleware
const previewModeMiddleware = createMiddleware(async (c, next) => {
  try {
    const PREVIEW_SECRET = process.env.PREVIEW_SECRET || 'mlsc-2025';
    
    // Check if this is a request to enable preview mode
    const requestedPreview = c.req.query('preview') === PREVIEW_SECRET;
    
    if (requestedPreview) {
      setCookie(c, 'preview-mode', 'true', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Lax',
        maxAge: 60 * 60 * 24 * 5, // 5 days
        path: '/',
      });
      
      // Redirect to remove the preview query parameter from URL
      const url = new URL(c.req.url);
      url.searchParams.delete('preview');
      return c.redirect(url.toString());
    }
    
    // Check if preview mode is active
    const isPreviewMode = getCookie(c, 'preview-mode') === 'true';
    c.set('isPreviewMode', isPreviewMode);
  } catch (error) {
    console.error('Preview middleware error:', error);
    // Default to non-preview mode if there's an error
    c.set('isPreviewMode', false);
  }
  
  await next();
});

app.use('*', previewModeMiddleware);

// Exit preview mode endpoint
app.get('/api/exit-preview', (c) => {
  setCookie(c, 'preview-mode', '', {
    httpOnly: true,
    maxAge: 0,
    path: '/',
  });
  return c.redirect('/');
});

// Apply routes
app.route('/', publicRoutes);
app.route('/api', apiRoutes);
app.route('/preview', previewRoutes);

// Special route to serve the Payload admin app
app.get('/admin*', (c) => {
  // This route will be handled by the payloadMiddleware
  // It ensures that even direct admin URLs work correctly
  return c.body('Admin route handled by Payload middleware');
});

// Special route for Payload API
app.all('/api/*', (c) => {
  // This will be intercepted by the payloadMiddleware if it's a Payload API route
  // Otherwise it will pass through to our own API routes
  return c.notFound();
});

// Start the server if not imported
if (import.meta.main) {
  const port = Number(process.env.PORT || 3000);
  
  (async () => {
    try {
      // Initialize Payload CMS before starting the server
      console.log('Initializing Payload CMS...');
      await initPayloadCMS();
      
      console.log(`Server is running on http://localhost:${port}`);
      console.log(`Payload CMS Admin: http://localhost:${port}/admin`);
      console.log(`Preview mode access: http://localhost:${port}/?preview=${process.env.PREVIEW_SECRET || 'mlsc-2025'}`);
      
      // Try to find an available port
      const tryPort = (p: number): Promise<void> => {
        console.log(`Attempting to start server on port ${p}...`);
        return new Promise((resolve, reject) => {
          try {
            const server = Bun.serve({
              fetch: app.fetch,
              port: p,
            });
            console.log(`Successfully bound to port ${p}`);
            resolve();
          } catch (error) {
            const err = error as Error & { code?: string };
            if (err.code === 'EADDRINUSE') {
              console.error(`Port ${p} is already in use, trying next port...`);
              // Try next port
              tryPort(p + 1).then(resolve).catch(reject);
            } else {
              reject(error);
            }
          }
        });
      };
      
      // Try to start with requested port and increment if needed
      await tryPort(port);
    } catch (error) {
      const err = error as Error & { code?: string };
      console.error('Server error:', err.message);
      process.exit(1);
    }
  })();
}

export default app;

// Export the client-side rendering function
export { hydrateEditorialPage } from './components/editorial/EditorialClient';