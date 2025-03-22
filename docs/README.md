# MLSC Studio Website Documentation

Welcome to the documentation for the MLSC Studio Website. This directory contains comprehensive information about the project's architecture, development roadmap, and troubleshooting guides.

<!-- 
This README serves as the entry point to all project documentation. It provides an overview of available documentation and guidance on how to use it effectively.

Developers: When adding new documentation, please update this index to ensure discoverability.
-->

## Documentation Index

| Document | Description |
|----------|-------------|
| [PROJECT.md](PROJECT.md) | Comprehensive project overview, architecture, and technical details |
| [ROADMAP.md](ROADMAP.md) | Development roadmap with planned features and milestones |
| [TROUBLESHOOTING.md](TROUBLESHOOTING.md) | Solutions for common development and deployment issues |
| [DEVELOPMENT_LOG.md](DEVELOPMENT_LOG.md) | Record of development progress, decisions, and next steps |
| [CONTRIBUTING.md](CONTRIBUTING.md) | Guidelines for contributors to the project |
| [CMS_INTEGRATION.md](CMS_INTEGRATION.md) | Details on Payload CMS integration for content management |
| [IMPLEMENTATION_REASONING.md](IMPLEMENTATION_REASONING.md) | Detailed reasoning behind architectural and implementation decisions |
| [SUPABASE_SETUP.md](SUPABASE_SETUP.md) | Guide for setting up Supabase for the CMS and image storage |

## Development Quick Links

- **Repository**: [GitHub Repository URL]
- **Production Site**: [Production URL]
- **Development Site**: [Development URL]
- **Issue Tracker**: [Issue Tracker URL]

## Getting Started

For new developers joining the project, we recommend reading the documents in this order:

1. [DEVELOPMENT_LOG.md](DEVELOPMENT_LOG.md) - Latest project status and decisions
2. [PROJECT.md](PROJECT.md) - Understand the overall project
3. [IMPLEMENTATION_REASONING.md](IMPLEMENTATION_REASONING.md) - Understand the design decisions
4. [ROADMAP.md](ROADMAP.md) - See where we're headed
5. [CMS_INTEGRATION.md](CMS_INTEGRATION.md) - Content management workflow
6. [SUPABASE_SETUP.md](SUPABASE_SETUP.md) - Database and storage setup
7. [TROUBLESHOOTING.md](TROUBLESHOOTING.md) - Prepare for common issues

## Running the Project

The project includes helper scripts to make development easier:

```bash
# Start development server with Bun
./scripts/start.sh dev

# Use Node.js fallback server if Bun isn't working
./scripts/start.sh node

# See all available commands
./scripts/start.sh help
```

## Contributing to Documentation

When updating documentation:

1. Keep information accurate and up-to-date
2. Use Markdown formatting consistently
3. Include code examples when relevant
4. Link to external resources when appropriate

## Documentation TODO

- [ ] Add deployment guide
- [ ] Create component documentation
- [ ] Add database schema documentation (when implemented)
- [ ] Create API documentation (when implemented)
- [ ] Complete CMS user guide for clients

---

Last updated: May 2024