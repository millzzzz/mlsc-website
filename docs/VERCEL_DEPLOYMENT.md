# Deploying MLSC Website to Vercel

This guide walks through the process of deploying the MLSC Website to Vercel with Payload CMS and Supabase integration.

## Prerequisites

- A Supabase project with proper configuration (see [SUPABASE_SETUP.md](SUPABASE_SETUP.md))
- Vercel CLI installed (`bun add -g vercel` or `npm install -g vercel`)
- A Vercel account

## Step 1: Environment Variables Configuration

Before deploying, make sure you have all necessary environment variables:

```
# Essential Environment Variables
NODE_ENV=production
PREVIEW_SECRET=your-preview-secret-here
JWT_SECRET=your-jwt-secret-here
PAYLOAD_SECRET=your-payload-secret-key-here
PAYLOAD_PUBLIC_SERVER_URL=${VERCEL_URL}
SUPABASE_URL=your-supabase-url
SUPABASE_PUBLIC_KEY=your-supabase-public-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
SUPABASE_DATABASE_URL=postgresql://postgres:your-password@db.your-project.supabase.co:5432/postgres
FRONTEND_URL=${VERCEL_URL}
VERCEL_ENV=production
```

These will be set in the Vercel dashboard or through the Vercel CLI deployment process.

## Step 2: Vercel Project Setup

1. Log in to Vercel:

```bash
vercel login
```

2. If you're creating a new project, initialize it:

```bash
vercel
```

3. Follow the prompts to link to an existing project or create a new one.

## Step 3: Configure Build Settings

Vercel automatically recognizes our `vercel.json` configuration:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "server.js"
    }
  ],
  "env": {
    "NODE_ENV": "production"
  }
}
```

This configuration tells Vercel to:
- Use server.js as the entry point
- Route all requests to server.js
- Set NODE_ENV to production

## Step 4: Deploy to Vercel

Deploy your project with:

```bash
vercel --prod
```

If you need to update environment variables, use:

```bash
vercel env add PAYLOAD_SECRET
```

And follow the prompts to add each variable.

## Step 5: Verify the Deployment

1. Check that your site is accessible at the Vercel URL
2. Verify the Payload CMS admin interface at `/admin`
3. Confirm that media uploads work correctly with Supabase Storage

## Troubleshooting

### Database Connection Issues

If you experience database connection problems:

1. Check that your `SUPABASE_DATABASE_URL` has the correct password
2. Verify SSL settings in the connection string (SSL should be enabled in production)
3. Ensure your IP is not blocked by Supabase's security rules

### Payload CMS Not Loading

If the Payload CMS admin panel isn't loading:

1. Check the `PAYLOAD_PUBLIC_SERVER_URL` variable is correctly set to `${VERCEL_URL}`
2. Verify that `PAYLOAD_SECRET` is properly set
3. Look at the Vercel Function Logs for any errors

### Media Uploads Not Working

If media uploads fail:

1. Ensure your Supabase Storage bucket is properly configured
2. Check that your `SUPABASE_SERVICE_ROLE_KEY` has write permissions
3. Verify the Storage bucket policies allow uploads

## Regular Maintenance

After deploying successfully:

1. **Database Backups**: Set up regular Supabase database backups
2. **Monitor Performance**: Use Vercel Analytics to monitor site performance
3. **Update Dependencies**: Regularly update dependencies for security fixes

## Production Optimizations

For better production performance:

1. **Serverless Functions**: Consider splitting large functions into smaller ones
2. **Edge Caching**: Use Vercel's edge caching for static assets
3. **Connection Pooling**: Consider using connection pooling for database connections

---

If you need to redeploy after making changes:

```bash
git add .
git commit -m "Your changes description"
git push
```

Vercel will automatically deploy from your connected repository. 