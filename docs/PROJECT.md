# MLSC Studio Website - Project Documentation

## Project Overview

The MLSC Studio Website is an artist's portfolio and e-commerce platform designed with a dual-view architecture: a clean production version for public visitors and a feature-rich development version for team members.

<!-- 
This documentation provides a comprehensive overview of the project architecture, technology choices, and implementation details. It's intended for developers working on the project and should be kept up-to-date as the project evolves.
-->

<!-- 
NOTE: The dual-view architecture is a key differentiator for this project. It allows us to maintain a clean public-facing site while providing rich development tools for the team without requiring complex user authentication systems.
-->

## Mission Statement

Create a beautiful, minimal website that showcases the artist's work across different mediums (vinyl records, NYC MTA-inspired art, and gallery items) while maintaining a distinct separation between public content and team-only content.

## Technology Stack

### Core Technologies
- **Runtime**: [Bun](https://bun.sh/) - A fast JavaScript runtime with built-in bundler and package manager
- **Framework**: [Hono.js](https://hono.dev/) - A small, simple, and ultrafast web framework for the Edge
- **Language**: [TypeScript](https://www.typescriptlang.org/) - For type safety and better developer experience

### Supporting Tools
- **Environment Management**: dotenv via Bun's built-in support
- **Authentication**: Cookie-based preview mode (no login required)
- **Deployment**: [Vercel](https://vercel.com/)
- **CSS**: Pure CSS with no frameworks (keeping it minimal)

## Project Structure

```
mlsc-website/
├── .env                  # Environment variables for development
├── .env.example          # Example environment variables for documentation
├── .gitignore            # Git ignore file
├── README.md             # Project README
├── docs/                 # Documentation directory
│   └── PROJECT.md        # This project documentation file
├── package.json          # Package configuration
├── public/               # Static assets directory
│   └── static/           # Images, fonts, and other static files
├── src/                  # Source code
│   ├── index.ts          # Main entry point and server configuration
│   ├── middleware/       # Shared middleware
│   │   └── error-handler.ts  # Error handling middleware
│   └── routes/           # Application routes
│       ├── preview.ts    # Routes for team members (preview mode)
│       └── public.ts     # Routes for public visitors
├── tsconfig.json         # TypeScript configuration
└── vercel.json           # Vercel deployment configuration
```

## Dual-View Architecture

The website employs a unique "preview mode" architecture that serves different content based on user type:

### Public Mode (Production View)
- Clean, minimal interface
- Only shows finalized content
- Focus on the art and products
- No admin or development features

### Preview Mode (Development View)
- Accessible only with a secret URL parameter
- Shows development notes and TODOs
- Includes an admin dashboard
- Allows team members to see work-in-progress features
- Contains a prominent banner indicating preview mode

## Authentication System

The preview mode uses a simple but effective authentication system:

1. Team members access preview mode via: `/?preview=SECRET_KEY`
2. The SECRET_KEY is stored in environment variables (PREVIEW_SECRET)
3. Once authenticated, a secure HTTP-only cookie maintains the preview state
4. Users can exit preview mode via the banner link or `/api/exit-preview` endpoint

This approach avoids the complexity of user accounts while still providing secure access control.

## Current Development Status

- [x] Basic project structure set up
- [x] Preview mode implementation
- [x] Public routes
- [x] Preview routes with admin panel
- [x] Vercel deployment configuration
- [ ] Fix Bun development server issues
- [ ] Implement database integration for content
- [ ] Add proper asset management
- [ ] Create e-commerce functionality
- [ ] Add interactive gallery features

## Known Issues

1. **Bun Development Server**: `bun run dev` command not working correctly
   - **Temporary solution**: Use `node server.js` if creating a Node.js fallback server
   - **Investigation needed**: Check port conflicts or Bun version compatibility

2. **Import Resolution**: TypeScript showing import errors in VSCode
   - **Fix**: Ensure proper tsconfig.json path mappings and VSCode settings

## Next Development Phases

### Phase 1: Core Functionality (Current)
- Basic site structure and preview mode
- Simple static pages for public and preview modes

### Phase 2: Content Management
- Add database integration (likely PostgreSQL or SQLite)
- Create content management features in admin panel
- Implement media uploads and optimization

### Phase 3: E-commerce Features
- Develop shopping cart functionality
- Integrate payment processing (Stripe)
- Create order management in admin panel

### Phase 4: Interactive Elements
- Build gallery with lightbox and filtering
- Create interactive NYC MTA-inspired map
- Implement vinyl record catalog with audio previews

## Deployment Instructions

### Vercel Deployment
1. Connect GitHub repository to Vercel
2. Set environment variables:
   - `PREVIEW_SECRET`: Secret key for preview mode
   - `NODE_ENV`: 'production' for production builds
3. Deploy and ensure all routes are working correctly

### Local Development
1. Clone the repository
2. Install dependencies: `bun install`
3. Create `.env` file based on `.env.example`
4. Start development server: `bun dev` (Note: Troubleshoot if not working)
5. Access preview mode: `http://localhost:3000/?preview=your-secret-key`

## Reference Materials

- [Bun Documentation](https://bun.sh/docs)
- [Hono.js Documentation](https://hono.dev/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

## Project Contacts

- **Project Lead**: [Your Name/Team]
- **Artist**: MLSC Studio
- **Developer Notes Last Updated**: [Current Date]

## Troubleshooting Common Issues

### "Cannot find module" Errors
- Check tsconfig.json paths
- Ensure all dependencies are installed
- Verify file paths are correct (case-sensitive)

### Preview Mode Not Working
- Confirm environment variables are set correctly
- Check cookie settings, especially in production
- Verify preview secret is being passed correctly

### Deployment Failures
- Examine Vercel build logs
- Check for environment variable misconfigurations
- Verify Node.js version compatibility