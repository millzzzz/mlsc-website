// server.js - Node.js fallback server for development
// Use this if bun dev is not working correctly

import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { readFileSync } from 'node:fs';

// Load environment variables
const env = {};
try {
  const envFile = readFileSync('.env', 'utf8');
  envFile.split('\n').forEach(line => {
    if (line && !line.startsWith('#')) {
      const [key, value] = line.split('=');
      if (key && value) {
        env[key.trim()] = value.trim();
      }
    }
  });
} catch (err) {
  console.warn('No .env file found or could not be read');
}

// Import our app
const { default: app } = await import('./src/index.js');

// Create HTTP server
const PORT = process.env.PORT || env.PORT || 3001; // Using 3001 as default to avoid conflicts with Bun dev server

console.log(`Starting server on http://localhost:${PORT}`);
console.log(`Preview mode access: http://localhost:${PORT}/?preview=${env.PREVIEW_SECRET}`);

createServer((req, res) => {
  // Handle the request using our Hono app
  app.fetch(req, {
    headers: new Headers(req.headers),
  }).then(honoRes => {
    // Set status code
    res.statusCode = honoRes.status;
    
    // Copy headers
    honoRes.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });
    
    // Stream the response body
    honoRes.body.pipe(res);
  }).catch(err => {
    console.error('Error handling request:', err);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Internal Server Error');
  });
}).listen(PORT);

// Note: This is a basic fallback server and may not support all Hono features
// Use bun dev when possible