import express from 'express';
import payload from 'payload';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import fs from 'fs';
import { BuildConfig } from 'payload/config';
import { postgresAdapter } from '@payloadcms/db-postgres';

// Get the directory name
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');

// Import collections directly - TypeScript imports
import Editorial from './cms/collections/Editorial';
import Media from './cms/collections/Media';
import User from './cms/collections/User';
import Sketchbook from './cms/collections/Sketchbook';

// Patch collections to prevent errors
const patchedCollections = [Editorial, Media, User, Sketchbook].map(collection => {
  // Add default upload property for collections that don't have it
  if (!collection.upload) {
    return {
      ...collection,
      upload: {
        staticDir: 'uploads',
        mimeTypes: ['image/jpeg'],
        // Use a default filenameCompoundIndex since that's what's causing the error
        hooks: {
          beforeChange: [
            ({ req, data }) => {
              return data;
            }
          ]
        }
      }
    };
  }
  
  // For Media collection which does have upload property, ensure it has the right fields
  return collection;
});

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(projectRoot, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Create config object for Payload
const payloadConfig: any = {
  secret: process.env.PAYLOAD_SECRET || 'MLSCWebsiteSecret123456789',
  serverURL: process.env.SERVER_URL || 'http://localhost:3000',
  admin: {
    user: 'users',
    bundler: false,
  },
  collections: patchedCollections,
  blocks: [],
  db: postgresAdapter({
    pool: {
      connectionString: process.env.SUPABASE_DATABASE_URL || '',
      ssl: process.env.NODE_ENV === 'production',
      max: 10,
    },
  }),
  upload: {
    limits: {
      fileSize: 5000000, // 5MB in bytes
    },
  },
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
};

// Start the admin server
const start = async () => {
  try {
    console.log('Starting Payload CMS Admin server...');
    console.log(`Secret key is ${process.env.PAYLOAD_SECRET ? 'set in environment' : 'NOT in environment, using default'}`);
    console.log(`Database URL is ${process.env.SUPABASE_DATABASE_URL ? 'set' : 'NOT set'}`);
    
    // Initialize Payload with the required config property
    await payload.init({
      express: app,
      config: payloadConfig,
      onInit: () => {
        console.log('✅ Payload CMS Admin has initialized');
      },
    });

    // Redirect root to admin
    app.get('/', (_, res) => {
      res.redirect('/admin');
    });

    // Start server
    const PORT = process.env.ADMIN_PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Payload Admin server running at http://localhost:${PORT}`);
      console.log(`Admin dashboard: http://localhost:${PORT}/admin`);
    });
  } catch (error) {
    console.error('[Admin Error]', error);
    if (error instanceof Error) {
      console.error(error.stack);
    }
    process.exit(1);
  }
};

start(); 