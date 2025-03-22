# Setting Up Supabase for MLSC Studio Website

This guide explains how to set up Supabase to work with the MLSC Studio Website and Payload CMS.

## 1. Create a Supabase Project

1. Go to [Supabase](https://supabase.com/) and sign up or log in.
2. Create a new project.
3. Choose a name for your project (e.g., "mlsc-studio").
4. Set a secure database password (store this safely).
5. Choose the region closest to your users.
6. Wait for the project to be created (this may take a few minutes).

## 2. Get Your API Keys

Once your project is created:

1. Go to the project dashboard.
2. In the left sidebar, click on "Settings" > "API".
3. You will see two API keys:
   - **Project API Keys**: Look for "anon public" - This is your `SUPABASE_PUBLIC_KEY`.
   - **Service Role Keys**: This is your `SUPABASE_SERVICE_ROLE_KEY` (keep this secret!).
4. Copy the "URL" value - This is your `SUPABASE_URL`.

## 3. Set Up Database Connection

1. In the left sidebar, click on "Settings" > "Database".
2. Scroll down to "Connection string" and select "URI".
3. Copy the connection string - This is your `SUPABASE_DATABASE_URL`.
4. Replace `[YOUR-PASSWORD]` in the connection string with your database password.

## 4. Create a Storage Bucket

1. In the left sidebar, click on "Storage".
2. Click "Create new bucket".
3. Name the bucket "media".
4. Set the following permissions:
   - Make it public (or set appropriate RLS policies)
   - Allow file uploads

## 5. Configure Your .env File

Update your .env file with the values you've collected:

```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_PUBLIC_KEY=your-supabase-public-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
SUPABASE_DATABASE_URL=postgresql://postgres:password@your-project.supabase.co:5432/postgres
```

## 6. Additional Configuration (Optional)

### Set Up Authentication

If you want to use Supabase Authentication:

1. Go to "Authentication" > "Providers" in the Supabase dashboard.
2. Enable the providers you want to use (Email, Google, GitHub, etc.).

### Database Backups

For production use, consider setting up automated backups:

1. Go to "Settings" > "Database".
2. Configure the backup schedule and retention policy.

## 7. Local Development

For local development with Supabase:

1. Use the connection string with SSL disabled (for development only).
2. You can use the Supabase CLI for local development (see Supabase docs).

## 8. Production Deployment

When deploying to production:

1. Make sure SSL is enabled in the database connection.
2. Set appropriate environment variables in your hosting platform.
3. Consider using connection pooling for better performance.

## 9. Troubleshooting

If you encounter issues:

1. Check your .env file for correct values.
2. Verify network access to Supabase.
3. Check for SSL requirements in your connection settings.
4. Ensure your service role key has sufficient permissions.

---

For more detailed information, visit the [Supabase Documentation](https://supabase.com/docs) and [Payload CMS Documentation](https://payloadcms.com/docs). 