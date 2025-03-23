import { postgresAdapter } from '@payloadcms/db-postgres';
import path from 'path';
import { fileURLToPath } from 'url';

// Get dirname
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Import collections
import Editorial from './cms/collections/Editorial.ts';
import Media from './cms/collections/Media.ts';
import User from './cms/collections/User.ts';
import Sketchbook from './cms/collections/Sketchbook.ts';

const serverURL = process.env.SERVER_URL || 'http://localhost:3000';

// Create the config object directly instead of using buildConfig
const config = {
  secret: process.env.PAYLOAD_SECRET || 'MLSCWebsiteSecret123456789',
  serverURL,
  admin: {
    user: 'users',
  },
  collections: [
    Editorial,
    Media,
    User,
    Sketchbook,
  ],
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
    filenameCompoundIndex: true,
  },
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.js'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
};

export default config; 