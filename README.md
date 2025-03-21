# Learning
- `bun pm cache rm` - clear bun cache
- `lsof -i :3000` - see what's running on port 3000
- `kill -9 <PID>` - kill that process

# MLSC Studio Website

A simple, elegant website for MLSC Studio built with Bun and Hono.js featuring a dual-view architecture for team and public visitors.

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
