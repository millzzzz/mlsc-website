import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client with environment variables
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Client-side Supabase instance (uses public key)
export const createSupabaseClient = () => {
  const publicUrl = process.env.PAYLOAD_PUBLIC_SUPABASE_URL || '';
  const publicKey = process.env.PAYLOAD_PUBLIC_SUPABASE_KEY || '';
  
  return createClient(publicUrl, publicKey);
};