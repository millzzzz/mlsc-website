import { StorageAdapter } from 'payload/dist/uploads/types';
import { supabase } from './supabase';

const bucketName = process.env.PAYLOAD_SUPABASE_BUCKET || 'mlsc-website-files';

export const supabaseAdapter: StorageAdapter = {
  upload: async ({ data, filename }) => {
    const { data: uploadData, error } = await supabase.storage
      .from(bucketName)
      .upload(`uploads/${filename}`, data, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      throw new Error(`Error uploading file: ${error.message}`);
    }

    const { data: publicUrlData } = supabase.storage
      .from(bucketName)
      .getPublicUrl(`uploads/${filename}`);

    return {
      filename,
      filesize: data.length,
      mimeType: data.type,
      url: publicUrlData.publicUrl,
    };
  },

  delete: async ({ filename }) => {
    const { error } = await supabase.storage
      .from(bucketName)
      .remove([`uploads/${filename}`]);

    if (error) {
      throw new Error(`Error deleting file: ${error.message}`);
    }

    return true;
  },
};