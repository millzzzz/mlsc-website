import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import * as dotenv from 'dotenv';
import payload from 'payload';

// Load environment variables
dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');

// This script initializes the Payload CMS database for local development
async function setupPayloadCMS() {
  console.log('Setting up Payload CMS...');
  
  // Create uploads directory if it doesn't exist
  const uploadsDir = path.join(projectRoot, 'uploads');
  if (!fs.existsSync(uploadsDir)) {
    console.log('Creating uploads directory...');
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  try {
    // Require the payload config directly
    const payloadConfig = require('../src/cms/payload.config').default;
    
    // Initialize Payload with the config
    await payload.init(payloadConfig);

    console.log('Database tables have been initialized successfully');
    console.log('You can now access Payload CMS at: http://localhost:3000/admin');
    console.log('Run the dev server with: bun run dev');
    
    // Exit the script
    process.exit(0);
  } catch (error) {
    console.error('Error setting up Payload CMS:', error);
    process.exit(1);
  }
}

// Run the setup function
setupPayloadCMS(); 