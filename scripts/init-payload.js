const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');
const payload = require('payload');
const { postgresAdapter } = require('@payloadcms/db-postgres');

// Load environment variables
dotenv.config();

const projectRoot = path.resolve(__dirname, '..');

// This script initializes the Payload CMS database for local development
async function initializePayloadDB() {
  console.log('Initializing Payload CMS database...');
  
  // Create uploads directory if it doesn't exist
  const uploadsDir = path.join(projectRoot, 'uploads');
  if (!fs.existsSync(uploadsDir)) {
    console.log('Creating uploads directory...');
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  try {
    // Create a minimal config directly to initialize the database
    const minimalConfig = {
      serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000',
      secret: process.env.PAYLOAD_SECRET || 'mlsc-studio-secret-key',
      admin: {
        user: 'users',
      },
      collections: [
        // Minimal user collection to allow admin login
        {
          slug: 'users',
          auth: true,
          admin: {
            useAsTitle: 'email',
          },
          fields: [
            {
              name: 'email',
              type: 'email',
              required: true,
            },
          ],
        },
      ],
      // Connect to Postgres via Supabase
      db: postgresAdapter({
        pool: {
          connectionString: process.env.SUPABASE_DATABASE_URL,
          ssl: process.env.NODE_ENV === 'production',
          max: 10,
        },
      }),
    };

    // Initialize Payload with minimal config
    await payload.init({
      secret: process.env.PAYLOAD_SECRET || 'mlsc-studio-secret-key',
      config: minimalConfig,
      local: true, // Use local mode for initialization only
    });

    console.log('✅ Database tables have been initialized successfully');
    console.log('');
    console.log('You can now access Payload CMS at: http://localhost:3000/admin');
    console.log('Run the dev server with: bun run dev');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error initializing Payload CMS database:', error);
    process.exit(1);
  }
}

// Run the initialization
initializePayloadDB(); 