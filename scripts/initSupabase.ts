import { supabase } from '../src/lib/supabase';

const bucketName = process.env.PAYLOAD_SUPABASE_BUCKET || 'mlsc-website-files';

async function initSupabaseBucket() {
  console.log(`Checking if bucket '${bucketName}' exists...`);
  
  const { data: buckets, error } = await supabase.storage.listBuckets();
  
  if (error) {
    console.error('Error checking buckets:', error.message);
    process.exit(1);
  }
  
  const bucketExists = buckets.some(bucket => bucket.name === bucketName);
  
  if (!bucketExists) {
    console.log(`Creating bucket '${bucketName}'...`);
    const { error: createError } = await supabase.storage.createBucket(bucketName, {
      public: true,
      fileSizeLimit: 5368709120, // 5GB limit
    });
    
    if (createError) {
      console.error('Error creating bucket:', createError.message);
      process.exit(1);
    }
    
    console.log(`Bucket '${bucketName}' created successfully!`);
  } else {
    console.log(`Bucket '${bucketName}' already exists.`);
  }
  
  console.log('Supabase storage setup complete!');
}

initSupabaseBucket().catch(console.error);