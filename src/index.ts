import { Hono } from 'hono';
import { serveStatic } from 'hono/bun';
import { logger } from 'hono/logger';
import { env } from 'hono/adapter';
import { getCookie, setCookie } from 'hono/cookie';
import { createMiddleware } from 'hono/factory';
import { publicRoutes } from './routes/public';
import { previewRoutes } from './routes/preview';
import { errorHandler } from './middleware/error-handler';

// Define app variable types
type Variables = {
  isPreviewMode: boolean;
};

// Create the main app
const app = new Hono<{ Variables: Variables }>();

// Apply middleware
app.use('*', logger());
app.use('*', errorHandler);
app.use('/static/*', serveStatic({ root: './public' }));

// Preview mode middleware
const previewModeMiddleware = createMiddleware(async (c, next) => {
  try {
    const { PREVIEW_SECRET } = env<{ PREVIEW_SECRET: string }>(c);
    
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

// Apply routes based on mode
app.use(async (c, next) => {
  const isPreviewMode = c.get('isPreviewMode');
  
  if (isPreviewMode) {
    // In preview mode, check preview routes first
    const response = await previewRoutes.fetch(c.req.raw);
    
    // If preview routes handled it, return that response
    if (response.status !== 404) {
      return response;
    }
    
    // If not found in preview routes, fall back to public routes
    return publicRoutes.fetch(c.req.raw);
  } else {
    // In public mode, only use public routes
    return publicRoutes.fetch(c.req.raw);
  }
});

// Start the server if not imported
if (import.meta.main) {
  const port = process.env.PORT || 3001;
  console.log(`Server is running on http://localhost:${port}`);
  console.log(`Preview mode access: http://localhost:${port}/?preview=${process.env.PREVIEW_SECRET || 'mlsc-2025'}`);
  
  try {
    Bun.serve({
      fetch: app.fetch,
      port: Number(port),
    });
  } catch (error) {
    if (error.code === 'EADDRINUSE') {
      console.error(`Port ${port} is already in use. Try setting a different PORT in your .env file.`);
      process.exit(1);
    } else {
      console.error('Server error:', error);
      process.exit(1);
    }
  }
}

export default app;