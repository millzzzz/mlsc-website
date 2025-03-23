# MLSC Studio Admin & Editorial Grid

This application uses Payload CMS with Supabase for content management and storage, integrated into a Bun/TypeScript/Hono.js application.

## Quick Start

Run this command to start both the main site and admin servers:

```bash
npm run start
# or
bun run start
```

Then access:
- Main website: http://localhost:8889
- Editorial page: http://localhost:8889/editorial
- Admin panel: http://localhost:3000/admin

## How It Works

1. The application uses two servers:
   - Main server (port 8889): Serves the public website
   - Admin server (port 3000): Hosts the Payload CMS admin panel

2. Content Flow:
   - Create content in the Admin panel
   - Images are stored in Supabase storage
   - Content is displayed in a responsive grid on the editorial page

3. The editorial page shows a masonry-style grid similar to olaoluslawn.com/works
   - Even without content, placeholder images will be shown
   - Images are categorized and can be filtered

## Managing Content

1. Create a user in the admin panel on first visit
2. Add media files in the "Media" collection
3. Create editorial posts and link to your media
4. Set posts to "Published" status to make them visible

## Tech Stack

- **Frontend**: Hono.js with HTML templating
- **Backend**: Bun runtime with TypeScript
- **CMS**: Payload CMS (headless)
- **Storage**: Supabase Storage and PostgreSQL
- **Deployment**: Compatible with Vercel

## Development

- Main site only: `bun run dev`
- Admin panel only: `bun run admin`
- Both together: `bun run start`

The application is designed to keep complexity contained in the public.ts file, with the editorial grid implementation showing best practices for responsive layouts. 