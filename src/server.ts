import express from 'express';
import payload from 'payload';
import { Hono } from 'hono';
import { serve } from '@hono/bun';
import { serveStatic } from '@hono/bun/serve-static';
import path from 'path';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Create an Express app for Payload CMS
const app = express();

// Initialize Payload
const start = async () => {
  // Initialize Payload
  await payload.init({
    secret: process.env.PAYLOAD_SECRET || 'your-secret-key',
    express: app,
    onInit: () => {
      console.log(`Payload Admin URL: ${payload.getAdminURL()}`);
    },
  });

  // Create a Hono app for the frontend
  const hono = new Hono();

  // Serve static files
  hono.use('/*', serveStatic({ root: './public' }));
  
  // Import your routes
  const { default: publicRoutes } = await import('./routes/public');
  
  // Use your routes
  hono.route('/', publicRoutes);

  // Start the Hono server
  const port = process.env.PORT || 3000;
  serve({
    fetch: hono.fetch,
    port: Number(port),
  }, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
};

// Start the server
start();