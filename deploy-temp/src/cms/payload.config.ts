import { buildConfig } from 'payload/config';
import path from 'path';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { fileURLToPath } from 'url';

// Import collections
import Editorial from './collections/Editorial';
import Media from './collections/Media';
import User from './collections/User';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000',
  admin: {
    user: 'users',
    meta: {
      titleSuffix: '- MLSC Studio CMS',
      favicon: '/static/mlsc-icon.svg',
      ogImage: '/static/mlsc-logo.png',
    },
  },
  collections: [
    User,
    Editorial,
    Media,
  ],
  upload: {
    limits: {
      fileSize: 5000000, // 5MB
    },
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.SUPABASE_DATABASE_URL,
      ssl: process.env.NODE_ENV === 'production',
      // optional, same as where NODE_ENV is not production
      max: 10,
    },
  }),
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  cors: [
    process.env.FRONTEND_URL || 'http://localhost:3000',
  ],
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  csrf: [
    process.env.FRONTEND_URL || 'http://localhost:3000', 
  ],
}); 