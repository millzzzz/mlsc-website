import { createSupabaseClient } from './supabase';

const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB chunks

export async function uploadLargeFile(file: File, path: string): Promise<string> {
  const supabase = createSupabaseClient();
  const bucketName = process.env.PAYLOAD_SUPABASE_BUCKET || 'mlsc-website-files';
  
  // For files smaller than 250MB, use regular upload
  if (file.size < 250 * 1024 * 1024) {
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(path, file, {
        cacheControl: '3600',
        upsert: false,
      });
      
    if (error) throw new Error(`Error uploading file: ${error.message}`);
    
    const { data: urlData } = supabase.storage
      .from(bucketName)
      .getPublicUrl(path);
      
    return urlData.publicUrl;
  }
  
  // For larger files, use chunked upload
  const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
  let uploadedChunks = 0;
  
  // Start multipart upload
  const { data: { uploadId } = {}, error: initError } = await supabase.storage
    .from(bucketName)
    .createMultipartUpload(path);
    
  if (initError || !uploadId) {
    throw new Error(`Failed to initialize multipart upload: ${initError?.message}`);
  }
  
  // Upload each chunk
  const uploadPromises = [];
  
  for (let i = 0; i < totalChunks; i++) {
    const start = i * CHUNK_SIZE;
    const end = Math.min(file.size, start + CHUNK_SIZE);
    const chunk = file.slice(start, end);
    
    uploadPromises.push(
      supabase.storage
        .from(bucketName)
        .uploadPart(path, uploadId, i + 1, chunk)
        .then(({ error }) => {
          if (error) throw new Error(`Error uploading chunk ${i + 1}: ${error.message}`);
          uploadedChunks++;
          // You could add progress reporting here
        })
    );
  }
  
  await Promise.all(uploadPromises);
  
  // Complete multipart upload
  const { data: completeData, error: completeError } = await supabase.storage
    .from(bucketName)
    .completeMultipartUpload(path, uploadId);
    
  if (completeError) {
    throw new Error(`Failed to complete multipart upload: ${completeError.message}`);
  }
  
  const { data: urlData } = supabase.storage
    .from(bucketName)
    .getPublicUrl(path);
    
  return urlData.publicUrl;
}