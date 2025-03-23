import { buildConfig } from 'payload/config';
import path from 'path';
import { fileURLToPath } from 'url';
import { collections } from '../cms.config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000',
  admin: {
    user: 'users',
  },
  collections,
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  upload: {
    limits: {
      fileSize: 5000000, // 5MB, adjust as needed
    },
  },
});