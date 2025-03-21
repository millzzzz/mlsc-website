# MLSC Website - Troubleshooting Guide

This document helps address common issues encountered during development of the MLSC Studio website.

<!-- 
This troubleshooting guide is a living document that should be updated whenever new issues are encountered and resolved. It serves as a knowledge base for the development team and helps reduce debugging time.

Developers: When you solve a tricky problem, please add it to this guide to help others who might encounter the same issue.
-->

<!-- 
The issues in this guide are organized by category, with the most common issues listed first. Each issue includes symptoms, potential causes, and step-by-step solutions.
-->

## Development Server Issues

### Bun Development Server Not Starting

**Symptoms:**
- `bun dev` command fails with "port in use" errors
- Server starts but doesn't respond to requests
- TypeScript import errors when running the server

**Solutions:**

1. **Check for Port Conflicts**
   ```bash
   # Check if port 3000 is in use
   lsof -i :3000
   
   # Kill the process using port 3000 if you're sure it's safe to do so
   kill -9 <PID>
   ```

2. **Use a Different Port**
   ```bash
   # In .env file
   PORT=4000
   
   # Or when running
   PORT=4000 bun dev
   ```
   
   Note: The Node.js fallback server (server.js) now uses port 3001 by default to avoid conflicts with the Bun dev server.

3. **Use Node.js Fallback Server**
   ```bash
   # Create a Node.js compatible build
   bun build src/index.ts --outdir ./dist --target node
   
   # Run the fallback server
   node server.js
   ```

### TypeScript Import Errors

**Symptoms:**
- "Cannot find module" errors
- Red squiggly lines in VSCode
- Imports working at runtime but not in editor

**Solutions:**

1. **Check tsconfig.json Paths**
   Ensure the `paths` configuration matches your imports:
   ```json
   "paths": {
     "@/*": ["./src/*"]
   }
   ```

2. **Restart TypeScript Server in VSCode**
   - Open the command palette (Ctrl+Shift+P or Cmd+Shift+P)
   - Type and select "TypeScript: Restart TS Server"

3. **Explicitly Import with File Extensions**
   ```typescript
   import { something } from './file.js';  // Note .js even for .ts files
   ```

## Preview Mode Issues

### Preview Mode Not Activating

**Symptoms:**
- Visiting `/?preview=SECRET_KEY` doesn't enable preview mode
- No preview banner appears
- Admin panel not accessible

**Solutions:**

1. **Check Environment Variables**
   ```bash
   # Ensure PREVIEW_SECRET is set correctly in .env
   PREVIEW_SECRET=your-secret-key
   ```

2. **Check Cookie Settings**
   - Ensure cookies are not being blocked by the browser
   - Check that you're using the correct preview secret
   - Verify HTTP vs HTTPS issues (secure cookie flag)

3. **Clear Browser Cookies**
   - Clear cookies for your development domain
   - Try in a different browser or incognito mode

### Preview Routes Not Found

**Symptoms:**
- 404 errors when accessing preview-specific routes
- Admin panel not accessible

**Solutions:**

1. **Check Route Registration**
   - Ensure preview routes are correctly defined in `src/routes/preview.ts`
   - Verify the route mapping in `src/index.ts`

2. **Debug Route Matching**
   - Add console logs to the route handling middleware
   - Check if the isPreviewMode variable is being correctly set

## Vercel Deployment Issues

### Build Failures

**Symptoms:**
- Vercel deployment fails
- Build errors in logs

**Solutions:**

1. **Check Vercel.json Configuration**
   ```json
   {
     "version": 2,
     "builds": [
       {
         "src": "src/index.ts",
         "use": "@vercel/node"
       }
     ]
   }
   ```

2. **Set Proper Environment Variables**
   - PREVIEW_SECRET 
   - NODE_ENV=production

3. **Check Node.js Version**
   - Set the right Node.js version in package.json engines field
   ```json
   "engines": {
     "node": ">=18.0.0"
   }
   ```

## Common TypeScript Errors

### "Cannot find module" for Hono Imports

**Symptom:**
```
Cannot find module 'hono/bun' or its corresponding type declarations.
```

**Solution:**
The import may need to be adjusted based on your runtime:

```typescript
// For Bun
import { serveStatic } from 'hono/bun';

// For Node.js
import { serveStatic } from '@hono/node-server/serve-static';
```

### Type Errors with Context Variables

**Symptom:**
```
Argument of type '"isPreviewMode"' is not assignable to parameter of type 'never'.
```

**Solution:**
Define proper types for your Hono app context:

```typescript
type Variables = {
  isPreviewMode: boolean;
};

const app = new Hono<{ Variables: Variables }>();
```

## Useful Debugging Commands

```bash
# Check TypeScript types without compiling
bun typecheck

# Build the project for Node.js environment
bun build src/index.ts --outdir ./dist --target node

# Run specific file with Bun
bun run src/specific-file.ts

# Show installed dependencies
bun pm ls
```

## Getting Help

If you encounter issues not covered in this guide:

1. Check the [Bun documentation](https://bun.sh/docs)
2. Check the [Hono.js documentation](https://hono.dev/docs)
3. Look for similar issues on GitHub or Stack Overflow
4. Feel free to reach out to the project maintainers