import express from 'express';
import payload from 'payload';
import { postgresAdapter } from '@payloadcms/db-postgres';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');

// Create Express app
const app = express();

// Initialize Payload
const start = async () => {
  // Initialize Payload
  await payload.init({
    secret: process.env.PAYLOAD_SECRET || 'mlsc-studio-secret-key',
    express: app,
    db: postgresAdapter({
      pool: {
        connectionString: process.env.SUPABASE_DATABASE_URL || '',
        ssl: process.env.NODE_ENV === 'production',
        max: 10,
      },
    }),
    admin: {
      user: 'users',
      bundler: false, // Disable webpack bundler for faster startup
    },
    onInit: () => {
      console.log('✅ Payload CMS has initialized');
    },
  });

  // Redirect root to admin
  app.get('/', (_, res) => {
    res.redirect('/admin');
  });

  // Start server
  const PORT = process.env.ADMIN_PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Payload Admin server running at http://localhost:${PORT}`);
    console.log(`Admin dashboard: http://localhost:${PORT}/admin`);
  });
};

start(); 