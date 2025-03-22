// server.js - Node.js server for production and development
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';
import path from 'path';
import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { publicRoutes } from './src/routes/public.js';
import { previewRoutes } from './src/routes/preview.js';
import payload from 'payload';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { createClient } from '@supabase/supabase-js';

// Determine the root directory of the project
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = new Hono();

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false
  }
});

// Initialize Payload CMS
const startPayload = async () => {
  // Initialize Payload
  await payload.init({
    secret: process.env.PAYLOAD_SECRET || 'mlsc-studio-secret-key',
    express: app.getClient(),
    onInit: () => {
      console.log('Payload CMS has initialized');
    },
    // Use Supabase Storage for file uploads
    upload: {
      limits: {
        fileSize: 5000000, // 5MB in bytes
      },
      useTempFiles: true,
      handlers: {
        // Custom handler to upload files to Supabase Storage
        afterUpload: async ({ doc }) => {
          // If there's a file in the doc, upload it to Supabase Storage
          if (doc.filename) {
            try {
              const filePath = path.join(__dirname, 'uploads', doc.filename);
              
              if (fs.existsSync(filePath)) {
                const fileData = fs.readFileSync(filePath);
                const { data, error } = await supabase.storage
                  .from('media')
                  .upload(`uploads/${doc.filename}`, fileData, {
                    contentType: doc.mimeType,
                    upsert: true
                  });
                
                if (error) {
                  console.error('Supabase Storage upload error:', error);
                } else {
                  // Get the public URL
                  const { data: urlData } = supabase.storage
                    .from('media')
                    .getPublicUrl(`uploads/${doc.filename}`);
                  
                  // Update the doc URL
                  doc.url = urlData.publicUrl;
                }
              }
            } catch (err) {
              console.error('Error handling file upload:', err);
            }
          }
          return doc;
        },
      },
    },
    db: postgresAdapter({
      pool: {
        connectionString: process.env.SUPABASE_DATABASE_URL,
        ssl: process.env.NODE_ENV === 'production',
        max: 10,
      },
    }),
  });
};

// Set up static file handling
app.get('/static/*', async (c) => {
  const filePath = c.req.path.replace('/static/', '');
  const fullPath = path.join(__dirname, 'static', filePath);
  
  try {
    const data = fs.readFileSync(fullPath);
    // Set appropriate content type based on file extension
    const ext = path.extname(fullPath).toLowerCase();
    let contentType = 'text/plain';
    
    switch (ext) {
      case '.html': contentType = 'text/html'; break;
      case '.css': contentType = 'text/css'; break;
      case '.js': contentType = 'text/javascript'; break;
      case '.json': contentType = 'application/json'; break;
      case '.png': contentType = 'image/png'; break;
      case '.jpg': case '.jpeg': contentType = 'image/jpeg'; break;
      case '.gif': contentType = 'image/gif'; break;
      case '.svg': contentType = 'image/svg+xml'; break;
      case '.pdf': contentType = 'application/pdf'; break;
      case '.ttf': contentType = 'font/ttf'; break;
      case '.woff': contentType = 'font/woff'; break;
      case '.woff2': contentType = 'font/woff2'; break;
    }
    
    c.header('Content-Type', contentType);
    return c.body(data);
  } catch (error) {
    console.error(`Error serving static file: ${filePath}`, error);
    return c.notFound();
  }
});

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
    return c.body(data);
  } catch (error) {
    console.error(`Error serving media file: ${filePath}`, error);
    return c.notFound();
  }
});

// Public routes
app.route('/', publicRoutes);

// Preview mode routes (for development/preview)
app.use('*', async (c, next) => {
  // Check if preview mode is enabled via query parameter
  const previewParam = c.req.query('preview');
  
  // Set a flag on the context to indicate preview mode
  if (previewParam === 'true') {
    c.set('isPreviewMode', true);
  }
  
  await next();
});

app.route('/preview', previewRoutes);

// Initialize the server
const PORT = process.env.PORT || 3000;

// Start Payload CMS first, then the Hono server
const initApp = async () => {
  try {
    // Create uploads directory if it doesn't exist
    const uploadsDir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }
    
    await startPayload();
    
    // Only start the server if not in a serverless environment (like Vercel)
    if (process.env.VERCEL_ENV === undefined) {
      serve({
        fetch: app.fetch,
        port: PORT,
      });
      
      console.log(`Server is running on port ${PORT}`);
    }
  } catch (error) {
    console.error('Failed to start server:', error);
  }
};

// Initialize the app
initApp();

// Export for serverless environments
export default app;