#!/usr/bin/env node
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Get directory of current file
const __dirname = dirname(fileURLToPath(import.meta.url));

// Add this utility function to check if a port is in use
async function isPortInUse(port) {
  return new Promise((resolve) => {
    const server = Bun.serve({
      port,
      fetch() { return new Response("Port check"); },
      error() { resolve(true); },
    });
    
    if (server) {
      server.stop();
      resolve(false);
    } else {
      resolve(true);
    }
  });
}

// Modify your server startup to use available ports
async function startServers() {
  console.log('🚀 Starting MLSC Website servers...');
  
  // Check and find available ports
  let mainPort = parseInt(process.env.EDITORIAL_PORT || 8889);
  
  while (await isPortInUse(mainPort)) {
    console.log(`Port ${mainPort} is in use, trying ${mainPort + 1}...`);
    mainPort++;
  }
  
  // Start only the main server for now
  // ... modify your server startup code to use these ports ...
  
  console.log('💻 Access your sites at:');
  console.log(`📄 Main website:  http://localhost:${mainPort}`);
  console.log(`📄 Editorial page: http://localhost:${mainPort}/editorial`);
  console.log('Press Ctrl+C to stop all servers');
}

// Start the main server
const mainServer = spawn('bun', ['server.js'], {
  cwd: __dirname,
  stdio: 'pipe'
});

mainServer.stdout.on('data', (data) => {
  console.log(`[Main] ${data.toString().trim()}`);
});

mainServer.stderr.on('data', (data) => {
  console.error(`[Main Error] ${data.toString().trim()}`);
});

// We're skipping the admin server for now
// const adminServer = spawn('bun', ['src/admin-server.js'], {
//   cwd: __dirname,
//   stdio: 'pipe'
// });

// Handle shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down servers...');
  
  mainServer.kill('SIGTERM');
  // adminServer.kill('SIGTERM');
  
  // Give servers a moment to clean up
  setTimeout(() => {
    process.exit(0);
  }, 500);
});

// Log exit codes
mainServer.on('exit', (code) => {
  console.log(`Main server exited with code ${code}`);
  
  // Kill admin server if main server exits unexpectedly
  if (code !== 0 && !process.exitCode) {
    console.log('🛑 Shutting down servers due to main server failure...');
    // adminServer.kill('SIGTERM');
    process.exit(1);
  }
});

// adminServer.on('exit', (code) => {
//   console.log(`Admin server exited with code ${code}`);
//   
//   // Kill main server if admin server exits unexpectedly
//   if (code !== 0 && !process.exitCode) {
//     console.log('🛑 Shutting down servers due to admin server failure...');
//     mainServer.kill('SIGTERM');
//     process.exit(1);
//   }
// }); 