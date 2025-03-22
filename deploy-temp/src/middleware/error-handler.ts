import { Context, MiddlewareHandler } from 'hono';

export const errorHandler: MiddlewareHandler = async (c, next) => {
  try {
    await next();
  } catch (error) {
    console.error('Server error:', error);
    
    const status = error instanceof Error ? 500 : (error as any)?.status || 500;
    const message = error instanceof Error 
      ? error.message 
      : 'An unexpected error occurred';
    
    if (!c.res.headers.get('content-type')) {
      c.status(status);
      return c.json({ 
        success: false, 
        error: message,
        ...(process.env.NODE_ENV === 'development' ? { stack: (error as Error).stack } : {})
      });
    }
  }
}; 