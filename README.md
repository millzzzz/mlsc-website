# Learning
- `bun pm cache rm` - clear bun cache
- `lsof -i :3000` - see what's running on port 3000
- `kill -9 <PID>` - kill that process
- `pkill -f "payload generate:types"`

# MLSC Studio Website

A modern, TypeScript-powered website featuring a Payload CMS integration for managing content like the Editorial section with a gallery layout inspired by olaoluslawn.com/works.

## Technologies

- **Bun** - JavaScript runtime with bundling, TypeScript support, and package management
- **TypeScript** - Type-safe JavaScript
- **Hono.js** - Lightweight web framework
- **Payload CMS** - Headless CMS integrated with TypeScript
- **Supabase** - PostgreSQL database and storage

## Setup Instructions

### Prerequisites

- Bun installed: [bun.sh](https://bun.sh/)
- Supabase account: [supabase.com](https://supabase.com/)

### Environment Variables

Create a `.env` file in the root of the project with the following variables:

```
# Server configuration
PORT=3000
NODE_ENV=development

# Preview mode settings
PREVIEW_SECRET=your-preview-secret-here

# Authentication
JWT_SECRET=your-jwt-secret-here

# Payload CMS
PAYLOAD_SECRET=your-payload-secret-key-here
PAYLOAD_PUBLIC_SERVER_URL=http://localhost:3000

# Supabase Configuration
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_PUBLIC_KEY=your-supabase-public-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
SUPABASE_DATABASE_URL=postgresql://postgres:your-actual-password@db.your-project.supabase.co:5432/postgres

# Frontend Configuration
FRONTEND_URL=http://localhost:3000
```

### Supabase Setup

1. Create a new Supabase project
2. Create a storage bucket named `media`
3. Get your API keys from Project Settings > API
4. Find your database URL in Project Settings > Database > Connection string (URI format)
5. Replace placeholders in `.env` with your actual values

### Install Dependencies

```bash
bun install
```

### Initialize the Database

Run the setup script to create Payload CMS tables in your Supabase database:

```bash
bun run setup
```

### Start the Development Server

```bash
bun run dev
```

### Access the CMS

1. Open `http://localhost:3000/admin` in your browser
2. Create an admin user on first login
3. Start adding content in the Editorial collection

## Project Structure

- `src/` - TypeScript source code
  - `index.ts` - Main entry point with Hono and Payload integration
  - `cms/` - Payload CMS configurations
    - `collections/` - CMS collection definitions
    - `payload.config.ts` - Payload CMS configuration
  - `routes/` - Hono route handlers
    - `public.ts` - Public-facing routes
    - `api.ts` - API endpoints for fetching CMS data
- `scripts/` - Utility scripts
  - `setup-payload.ts` - Database initialization script
- `static/` - Static assets
- `uploads/` - Temporary directory for file uploads

## Adding Content

1. Log in to the CMS at `/admin`
2. Navigate to the Editorial collection
3. Create new content with:
   - Title, author, category, and description
   - Set "Display Type" to "Gallery" for image-focused content
   - Upload images with various aspect ratios
   - Set priority numbers to control order
   - Publish when ready

## Features

- TypeScript-powered end-to-end
- Headless CMS with PostgreSQL database
- Responsive masonry grid layout
- Category filtering
- Supabase Storage integration
- Preview mode for content drafts

## License

MIT

## 🎯 Key Features

- **Dual-View Architecture**: Public visitors see a clean production site, while team members access a feature-rich development version
- **Preview Mode**: Easy access for team members via a secret URL parameter
- **Admin Dashboard**: Management interface for content and site settings (preview mode only)
- **Modern Tech Stack**: Built with Bun, Hono.js, and TypeScript

## 🚀 Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (v1.0.0 or higher)
- [Node.js](https://nodejs.org/) (v18 or higher)

### Quick Start

```bash
# Clone the repository
git clone [repository-url]
cd mlsc-website

# Install dependencies
bun install

# Start development server
./scripts/start.sh dev

# If Bun isn't working properly, use Node.js fallback
./scripts/start.sh node
```

### Preview Mode Access

Access preview mode by visiting:

```
http://localhost:3000/?preview=your-secret-key
```

Replace `your-secret-key` with the value of `PREVIEW_SECRET` in your `.env` file.

## 📊 Project Status

This project is in active development. See our [development roadmap](docs/ROADMAP.md) for planned features and timelines.

## 📚 Documentation

For comprehensive documentation, please see the [docs directory](docs/):

- [Project Overview](docs/PROJECT.md)
- [Development Roadmap](docs/ROADMAP.md)
- [Troubleshooting Guide](docs/TROUBLESHOOTING.md)

## 🛠️ Technology Stack

- **Runtime**: [Bun](https://bun.sh/)
- **Framework**: [Hono.js](https://hono.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Deployment**: [Vercel](https://vercel.com/)

## 🖼️ Project Requirements

The website needs to showcase these elements:
- **Records Shop**: Vinyl record collections and releases
- **NYC MTA**: Transit-inspired artwork and designs
- **Gallery**: Exhibition of artistic works
- **Sketchbook Feel**: Overall aesthetic inspired by artist sketchbooks

## 🤝 Contributing

If you'd like to contribute to this project, please read our [contributing guidelines](docs/CONTRIBUTING.md).

## 📝 License

@copyright 2025 MLSC Studio

## Original Notes

APPROACH: TELL ME HOW YOU ENVISION YOUR WEBSITE TO BE. USE WHATEVER MEANS TO GET CLOSER TO THE FINAL VISUAL/PRODUCT. NOTHING'S EVER CREATED OUT OF EMPTINESS SO IT HELPS TO HAVE INSPIRATION IN MIND.

IN THIS PARTICULAR SCENARIO WE NEED THESE ELEMENTS:
- RECORDS SHOP vinyl element
- NYC MTA bus element
- GALLERY element
- SKETCHBOOK feel

THE QUESTION IS HOW DO WE REACH THE SECOND PAGE?
- idea: hotwheels car, you unwrap it, and it has a hot wheels bus in it.

P.S. I think how Sim's views is it like his representation of his art identity.


06:12 PM 01/24/2025 

## Deployment to Vercel

This project is configured for deployment to Vercel.

### Deployment Steps

1. Create a Vercel account if you don't have one already.
2. Install the Vercel CLI: `npm install -g vercel`
3. Run `vercel login` to authenticate with your Vercel account.
4. Configure your Supabase project (see [docs/SUPABASE_SETUP.md](docs/SUPABASE_SETUP.md)).
5. Set up the following environment variables in Vercel:

```
PREVIEW_SECRET=your-preview-secret-here
JWT_SECRET=your-jwt-secret-here
PAYLOAD_SECRET=your-payload-secret-key-here
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_PUBLIC_KEY=your-supabase-public-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
SUPABASE_DATABASE_URL=postgresql://postgres:password@your-project.supabase.co:5432/postgres
```

6. Deploy with: `vercel --prod`

## Development

### Running Locally

1. Install dependencies: `bun install`
2. Start the development server: `bun dev`
3. Access the site at `http://localhost:3000`

### Environment Variables

Copy `.env.example` to `.env` and configure the variables:

```
# Server Configuration
PORT=3000
NODE_ENV=development

# Preview Mode
PREVIEW_SECRET=your-preview-secret-here

# Authentication
JWT_SECRET=your-jwt-secret-here

# Payload CMS
PAYLOAD_SECRET=your-payload-secret-key-here

# Supabase Configuration
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_PUBLIC_KEY=your-supabase-public-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
SUPABASE_DATABASE_URL=postgresql://postgres:password@your-project.supabase.co:5432/postgres

# Frontend Configuration
FRONTEND_URL=http://localhost:3000
```

### Accessing the CMS

The Payload CMS admin panel is available at `/admin`. 

## Admin Panel & Content Management

The website uses Payload CMS for content management. The admin panel is available at:

- **Main Admin Panel**: [http://localhost:3000/admin](http://localhost:3000/admin)

### Running the servers

To run the website and admin server together, use:

```
bun run start-all
```

This will start:
- The main website at http://localhost:8889
- The admin panel at http://localhost:3000/admin

### Admin Login

To access the admin panel:
1. Visit http://localhost:3000/admin
2. Create a new account on first login
3. Use this account to log in for future sessions

### Adding Content

1. **Editorial Content**: 
   - In the admin panel, go to "Editorials"
   - Click "Create New"
   - Fill out the required fields (title, slug, featured image, etc.)
   - Upload images to the Media collection first or directly in the Editorial form
   - Set the status to "Published" when ready
   - Save the content

2. **Media Management**:
   - Go to "Media" collection to upload and manage all media files
   - Add metadata like alt text and captions
   - Uploaded media will be accessible in the Editorial content editor

The content you create in the admin panel will be automatically displayed on the website.
