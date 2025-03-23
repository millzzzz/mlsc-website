// server.ts - Simple TypeScript server for loading public routes
import { Hono } from 'hono';
import path from 'path';
import fs from 'fs';
import { publicRoutes } from './src/routes/public';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Create Hono app
const app = new Hono();

// Set up static file handling
app.get('/static/*', async (c) => {
  const filePath = c.req.path.replace('/static/', '');
  const fullPath = path.join(import.meta.dir, 'static', filePath);
  
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

// Set up public file handling
app.get('/public/*', async (c) => {
  const filePath = c.req.path.replace('/public/', '');
  const fullPath = path.join(import.meta.dir, 'public', filePath);
  
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
    console.error(`Error serving public file: ${filePath}`, error);
    return c.notFound();
  }
});

// Set public routes as the default
app.route('/', publicRoutes);

// Initialize the server
const PORT = 8889;

console.log(`\n===============================`);
console.log(`🚀 Starting server...`);

// Start the server
Bun.serve({
  fetch: app.fetch,
  port: PORT,
});

console.log(`\n===============================`);
console.log(`🚀 Server is running on port ${PORT}`);
console.log(`🌐 Main site: http://localhost:${PORT}`);
console.log(`===============================\n`);