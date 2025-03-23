import { buildConfig } from 'payload/config';
import { postgresAdapter } from '@payloadcms/db-postgres';
import path from 'path';

// Import patched collections
import { collections } from './cms.config';

const serverURL = process.env.SERVER_URL || 'http://localhost:3000';

export default buildConfig({
  serverURL,
  admin: {
    user: 'users',
  },
  collections,
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
});