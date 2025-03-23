#!/usr/bin/env node

import { spawn } from 'child_process';
import chalk from 'chalk';
import { platform } from 'os';

console.log(chalk.blue('Starting MLSC Website development servers...'));

// Determine if running on Windows
const isWindows = platform() === 'win32';
const shellCmd = isWindows ? true : '/bin/bash';

// Start the main server
let mainServer = spawn('bun', ['--watch', 'server.js'], {
  stdio: 'pipe',
  shell: shellCmd
});

// Start the admin server
let adminServer = spawn('bun', ['--watch', 'src/admin-server.ts'], {
  stdio: 'pipe',
  shell: shellCmd
});

// Helper to prefix log output
const prefixLogs = (process, prefix, color) => {
  process.stdout.on('data', (data) => {
    const lines = data.toString().split('\n');
    lines.forEach(line => {
      if (line.trim()) {
        console.log(color(`[${prefix}] ${line}`));
      }
    });
  });
  
  process.stderr.on('data', (data) => {
    const lines = data.toString().split('\n');
    lines.forEach(line => {
      if (line.trim()) {
        console.error(chalk.red(`[${prefix}] ${line}`));
      }
    });
  });
};

// Prefix logs for each server
prefixLogs(mainServer, 'Main Server', chalk.green);
prefixLogs(adminServer, 'Admin Server', chalk.yellow);

// Handle process exit
const cleanup = () => {
  console.log(chalk.blue('\nShutting down servers...'));
  try {
    if (isWindows) {
      // On Windows, kill the processes by their PIDs
      spawn('taskkill', ['/pid', mainServer.pid, '/f', '/t']);
      spawn('taskkill', ['/pid', adminServer.pid, '/f', '/t']);
    } else {
      // On Unix systems
      mainServer.kill('SIGINT');
      adminServer.kill('SIGINT');
    }
  } catch (error) {
    console.error('Error shutting down servers:', error);
  }
  process.exit(0);
};

// Listen for exit signals
process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);

// Handle child process exit
mainServer.on('close', (code) => {
  console.log(chalk.red(`Main server exited with code ${code}`));
  if (code !== 0 && !mainServer.killed) {
    console.log(chalk.yellow('Attempting to restart main server...'));
    mainServer = spawn('bun', ['--watch', 'server.js'], { 
      stdio: 'pipe', 
      shell: shellCmd 
    });
    prefixLogs(mainServer, 'Main Server', chalk.green);
  }
});

adminServer.on('close', (code) => {
  console.log(chalk.red(`Admin server exited with code ${code}`));
  if (code !== 0 && !adminServer.killed) {
    console.log(chalk.yellow('Attempting to restart admin server...'));
    adminServer = spawn('bun', ['--watch', 'src/admin-server.ts'], { 
      stdio: 'pipe', 
      shell: shellCmd 
    });
    prefixLogs(adminServer, 'Admin Server', chalk.yellow);
  }
});

console.log(chalk.green('Main server running on: http://localhost:8889'));
console.log(chalk.yellow('Admin server running on: http://localhost:3000/admin'));
console.log(chalk.blue('Press Ctrl+C to stop all servers')); 