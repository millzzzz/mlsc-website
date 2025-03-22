# CMS Integration with Payload CMS and Supabase

This document outlines the integration of Payload CMS with Supabase into the MLSC Studio website to manage content for the Sketchbook, Paintings, Editorial, and Shop sections.

## Overview

The MLSC Studio website uses Payload CMS as a headless content management system with Supabase as the database and storage provider to allow clients to upload and manage:
- Images for the portfolio sections (Sketchbooks, Paintings)
- Blog posts for the Editorial section
- Products for the Shop section

## Architecture

### 1. Technology Stack

- **Payload CMS**: Headless CMS that provides the admin UI and content modeling
- **Supabase**: Provides PostgreSQL database and storage for media files
- **Bun + Hono.js**: Server-side framework for rendering pages
- **TypeScript**: For type safety and better developer experience

### 2. Content Structure

#### Editorial
- Title
- Publication Date
- Author
- Content (Rich Text)
- Featured Image
- Additional Images with aspect ratio settings

#### Sketchbooks & Paintings
- Title
- Description
- Images (multiple)
- Categories/Tags

#### Shop Products
- Product Name
- Category
- Description
- Price
- Images
- Badge (e.g., "New", "Limited Edition", "Best Seller")
- Stock Status

### 3. Implementation Process

1. **Install Dependencies**
   ```bash
   bun add payload @payloadcms/db-postgres @supabase/supabase-js
   ```

2. **Configure Payload CMS**
   - Create collection models for Editorial, Media, and Users
   - Set up the PostgreSQL adapter to connect to Supabase

3. **Set Up Supabase**
   - Create a new Supabase project
   - Configure database access and storage buckets
   - See [SUPABASE_SETUP.md](SUPABASE_SETUP.md) for detailed setup instructions

4. **Image Handling with Supabase Storage**
   - Upload images to Supabase Storage bucket
   - Generate public URLs for media files
   - Implement image size variants and optimization

### 4. Workflow

#### Client Workflow
1. Log in to Payload CMS admin panel (accessible at `/admin`)
2. Upload images and enter content details
3. Preview changes before publishing
4. Publish content when ready

#### Server Workflow
1. Fetch content from Payload CMS API
2. Retrieve images from Supabase Storage
3. Render content in the appropriate templates

## Front-end Integration

### API Integration

Example API endpoint structure:
- `/api/editorial` - List all editorial posts
- `/api/editorial/:slug` - Get a specific editorial post
- `/api/paintings` - List all paintings
- `/api/shop` - List all shop products

### Image Grid Layout

The image grid layout follows the responsive masonry-style grid seen on olaoluslawn.com/works, with:
- Responsive columns (1-3 depending on screen size)
- Proper aspect ratio preservation
- Lazy loading for performance
- Subtle hover effects

## Security Considerations

1. **API Access**
   - Public API endpoints provide read-only access
   - Admin endpoints require authentication

2. **Media Management**
   - Supabase storage is protected with appropriate permissions
   - Image uploads are validated and sanitized

3. **Admin Access**
   - Role-based access control for CMS users
   - Secure authentication mechanism

## Development Setup

1. Install dependencies:
   ```bash
   bun install
   ```

2. Set up Supabase (see [SUPABASE_SETUP.md](SUPABASE_SETUP.md))

3. Configure environment variables in `.env`:
   ```
   PAYLOAD_SECRET=your-payload-secret
   SUPABASE_URL=your-supabase-url
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   SUPABASE_DATABASE_URL=your-database-connection-string
   ```

4. Start the development server:
   ```bash
   bun dev
   ```

## Deployment

1. For Vercel deployment (recommended), see [VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md)
2. Set up environment variables for your hosting provider
3. Connect to your Supabase instance
4. Ensure your database and storage policies are correctly configured 