# MLSC Studio Website - Development Log

<!-- 
This development log serves as a chronological record of the project's evolution, key decisions, and lessons learned. It provides context for why certain approaches were taken and helps new team members understand the project history.

Developers: Update this log when making significant changes or decisions. Each entry should include the date, what was done, why it was done that way, and any lessons learned.
-->

## Project Creation Summary

**Date**: May 2024  
**Status**: v0.1.0 (Alpha)

This document serves as a record of the MLSC Studio website development progress, decisions made, and the path forward.

<!-- 
The version numbering follows semantic versioning (MAJOR.MINOR.PATCH):
- MAJOR: Breaking changes (0 during initial development)
- MINOR: New features in a backward-compatible manner
- PATCH: Backward-compatible bug fixes

The Alpha designation indicates this is pre-release software with core functionality still under development.
-->

## Initial Development Summary

We've successfully established the foundation for the MLSC Studio website with these key accomplishments:

1. **Core Architecture Implemented**
   - Created a dual-view system with preview/production modes
   - Set up Bun + Hono.js framework with TypeScript
   - Implemented cookie-based preview mode authentication

2. **Basic Routes Created**
   - Public routes for general visitors
   - Enhanced preview routes for team members
   - Admin dashboard in preview mode

3. **Development Tools**
   - Shell script helper for running in different modes
   - Node.js fallback server for reliable development
   - Comprehensive documentation

4. **Deployment Configuration**
   - Vercel configuration for easy deployment
   - Environment variable support

## Technical Decisions

<!-- 
This section documents the reasoning behind key technical decisions. Understanding why certain approaches were chosen helps maintain architectural consistency and informs future decisions.
-->

### Dual-View Architecture

We chose a dual-view approach rather than a traditional admin login system because:

1. **Simplicity**: No complex authentication system needed
2. **Team-Friendly**: Easy for non-technical team members to access
3. **Design Freedom**: Allows for completely different UIs between public and preview versions
4. **Development Visibility**: Makes it easy to see work in progress without affecting public site

<!-- 
Implementation note: The dual-view system works by checking for a preview cookie that's set when accessing the site with a special URL parameter. This approach provides security through obscurity while avoiding the complexity of a full authentication system.

Technical details:
- Preview mode is activated via URL parameter: /?preview=SECRET_KEY
- A secure HTTP-only cookie maintains the preview state
- All routes check this cookie to determine which view to render
- Preview mode includes a banner with an exit link
-->

### Technology Stack Rationale

<!-- 
This table explains why specific technologies were chosen for this project. These decisions balance performance, developer experience, and project requirements.

When considering new technologies, evaluate them against these same criteria to maintain consistency.
-->

| Technology | Rationale |
|------------|-----------|
| **Bun** | Fast runtime with modern features; all-in-one solution (runtime, bundler, package manager) |
| **Hono.js** | Lightweight framework that works well with Bun; excellent TypeScript support |
| **TypeScript** | Type safety for better code maintenance and fewer runtime errors |
| **Pure CSS** | Avoiding framework overhead; keeping it lightweight and custom |

<!-- 
Technology selection considerations:
- Bun: Selected for its performance and integrated tooling, though we maintain Node.js compatibility for broader development support
- Hono.js: Chosen over Express/Koa for its modern API design and excellent TypeScript integration
- TypeScript: Mandatory for all new code to ensure type safety and better IDE support
- CSS: Custom CSS approach chosen to maintain full control over styling and minimize bundle size

Alternatives considered:
- Next.js: Too opinionated for our specific dual-view architecture needs
- Tailwind CSS: Avoided to maintain cleaner HTML and custom design aesthetic
- MongoDB: Will likely choose PostgreSQL or SQLite for structured data needs in future phases
-->

### Development Challenges

<!-- 
This section documents significant technical challenges encountered during development and how they were resolved. This information helps prevent similar issues in the future and provides context for certain implementation decisions.
-->

1. **Bun Development Server Issues**
   - Challenge: `bun dev` command not working correctly in some environments
   - Solution: Created a Node.js fallback server and helper script
   
   <!-- 
   Technical details: The Bun development server occasionally fails to properly reload on file changes and has port binding issues on some systems. The Node.js fallback server (server.js) provides a more stable alternative during development.
   
   Implementation: The start.sh script detects the preferred runtime and launches the appropriate server. The Node.js server uses a slightly different port (3001) to avoid conflicts.
   -->

2. **TypeScript Import Resolution**
   - Challenge: Import paths and module resolution issues
   - Solution: Configured proper paths in tsconfig.json and documented fixes
   
   <!-- 
   Technical details: TypeScript's default module resolution doesn't always work well with Bun's expectations, particularly for path aliases. We configured tsconfig.json with explicit path mappings and set "moduleResolution": "NodeNext" to resolve these issues.
   
   VSCode-specific fix: Some developers needed to add "typescript.preferences.importModuleSpecifier": "relative" to their VSCode settings.
   -->

## Current Project State

### Implemented Features

- [x] Basic project structure
- [x] Preview/production mode toggle
- [x] Simple public website
- [x] Enhanced preview mode with admin panel
- [x] Comprehensive documentation
- [x] Development helper tools

### Pending Issues

- [ ] Development server reliability improvements
- [ ] Fix template string interpolation in server.js console.log statements
- [ ] Add automated tests
- [ ] Complete the initial styles for public site

## Next Steps (Immediate)

1. **Fix Known Issues**
   - Address Bun development server problems
   - Fix the template string interpolation in server.js
   - Create proper error pages

2. **Improve Public UI**
   - Refine public site design
   - Implement responsive layouts
   - Add basic image optimization

3. **Enhance Preview Mode**
   - Expand admin dashboard functionality
   - Add mock data for future features
   - Implement preview analytics

## Mid-term Goals (Next 1-2 Months)

See [ROADMAP.md](ROADMAP.md) for the complete development roadmap.

1. **Begin Database Integration**
   - Evaluate database options (PostgreSQL vs SQLite)
   - Create initial schemas
   - Implement basic CRUD operations

2. **Develop Content Management**
   - Create content editor interface
   - Implement media upload system
   - Build publishing workflow

## Usage Instructions

### Development

```bash
# Clone and setup
git clone [repository-url]
cd mlsc-website
bun install
cp .env.example .env  # Then edit as needed

# Run with Bun (if working correctly)
./scripts/start.sh dev

# Or use Node.js fallback
./scripts/start.sh node
```

### Preview Mode Access

Access the preview mode by visiting:
```
http://localhost:3000/?preview=your-secret-key
```

Exit preview mode by clicking the "Exit Preview" banner link or visiting `/api/exit-preview`.

## Documentation Overview

We've created extensive documentation to support ongoing development:

1. **[PROJECT.md](PROJECT.md)** - Comprehensive overview of project architecture
2. **[ROADMAP.md](ROADMAP.md)** - Long-term development plan
3. **[TROUBLESHOOTING.md](TROUBLESHOOTING.md)** - Solutions for common issues
4. **[CONTRIBUTING.md](../CONTRIBUTING.md)** - Guidelines for contributors
5. **[README.md](../README.md)** - Project overview and quick start

## Lessons Learned

1. **Bun Compatibility**: While Bun offers excellent performance, it's still evolving and may have compatibility issues. Having a Node.js fallback is valuable.

2. **Simple Authentication**: For small teams, complex authentication is often unnecessary. The URL parameter + cookie approach offers a good balance of security and convenience.

3. **Documentation First**: Comprehensive documentation from the start makes ongoing development much easier, especially for a project with multiple phases.

## Development Team

- Lead Developer: [Your Name/Team]
- Stakeholder: MLSC Studio

---

*This log will be updated as development progresses to maintain a clear record of the project's evolution.*