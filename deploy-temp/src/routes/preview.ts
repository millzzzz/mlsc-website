import { Hono } from 'hono';
import { html } from 'hono/html';
import { PreviewBanner } from '../components/PreviewBanner';

// Preview app routes - what team members will see
const previewRoutes = new Hono();

// Using the shared PreviewBanner component

// Preview home page - development version
previewRoutes.get('/', (c) => {
  return c.html(html`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>[DEV] MLSC Studio</title>
        <style>
          body {
            font-family: 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 30px auto 0;
            padding: 20px;
            background-color: #fafafa;
          }
          header {
            margin-bottom: 40px;
            border-bottom: 1px solid #ddd;
            padding-bottom: 20px;
          }
          h1 {
            font-size: 2.5rem;
            margin-bottom: 10px;
            color: #2196f3;
          }
        </style>
      </head>
      <body>
        ${PreviewBanner()}
        
        <header>
          <h1>MLSC Studio (Development)</h1>
          <p>Preview build - Not for public release</p>
        </header>
        
        <nav>
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/admin">Admin</a>
        </nav>
        
        <div class="content-section">
          <h2>Records Shop</h2>
          <p>Explore our vinyl collection and latest releases.</p>
          <div class="dev-note">
            <p class="todo">TODO:</p>
            <ul>
              <li>Add product listings with images</li>
              <li>Implement shopping cart functionality</li>
              <li>Connect to payment processor</li>
            </ul>
          </div>
        </div>
        
        <div class="content-section">
          <h2>NYC MTA</h2>
          <p>Transit-inspired artwork and designs.</p>
          <div class="dev-note">
            <p class="todo">TODO:</p>
            <ul>
              <li>Add subway line inspired visual elements</li>
              <li>Create bus route interactive map</li>
            </ul>
          </div>
        </div>
        
        <div class="content-section">
          <h2>Gallery</h2>
          <p>Current and upcoming exhibitions.</p>
          <div class="dev-note">
            <p class="todo">TODO:</p>
            <ul>
              <li>Implement lightbox for image viewing</li>
              <li>Add exhibition calendar</li>
            </ul>
          </div>
        </div>
        
        <footer>
          <p>&copy; ${new Date().getFullYear()} MLSC Studio (Dev Build)</p>
          <p>Last updated: ${new Date().toLocaleString()}</p>
        </footer>
      </body>
    </html>
  `);
});

// Admin panel (only in preview mode)
previewRoutes.get('/admin', (c) => {
  return c.html(html`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Admin - MLSC Studio</title>
        <style>
          body {
            font-family: 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 1000px;
            margin: 30px auto 0;
            padding: 20px;
            background-color: #f5f5f5;
          }
          header {
            margin-bottom: 30px;
            padding-bottom: 15px;
            border-bottom: 1px solid #ddd;
          }
          h1 {
            color: #2196f3;
          }
          .dashboard {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 20px;
            margin-bottom: 40px;
          }
          .card {
            background: white;
            border-radius: 5px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            padding: 20px;
          }
          .card h3 {
            margin-top: 0;
            color: #333;
            border-bottom: 1px solid #eee;
            padding-bottom: 10px;
          }
          .btn {
            display: inline-block;
            background: #2196f3;
            color: white;
            padding: 8px 16px;
            border-radius: 4px;
            text-decoration: none;
            margin-top: 10px;
          }
          .status {
            display: inline-block;
            padding: 3px 8px;
            border-radius: 3px;
            font-size: 0.8rem;
            font-weight: bold;
            margin-bottom: 10px;
          }
          .status.draft {
            background: #ffecb3;
            color: #ff8f00;
          }
          .status.review {
            background: #e3f2fd;
            color: #1976d2;
          }
          .status.live {
            background: #e8f5e9;
            color: #388e3c;
          }
          nav {
            margin-bottom: 30px;
          }
          nav a {
            margin-right: 15px;
            color: #2196f3;
            text-decoration: none;
          }
          nav a:hover {
            text-decoration: underline;
          }
        </style>
      </head>
      <body>
        ${PreviewBanner()}
        
        <header>
          <h1>MLSC Studio Admin</h1>
          <p>Site management dashboard</p>
        </header>
        
        <nav>
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/admin">Admin</a>
        </nav>
        
        <div class="dashboard">
          <div class="card">
            <h3>Site Status</h3>
            <p><span class="status draft">Development</span></p>
            <p>Current build: <strong>0.1.0</strong></p>
            <p>Last deployment: <strong>${new Date().toLocaleString()}</strong></p>
            <a href="#" class="btn">Deploy to Production</a>
          </div>
          
          <div class="card">
            <h3>Content</h3>
            <p>Pages: <strong>2</strong></p>
            <p>Products: <strong>0</strong></p>
            <p>Gallery items: <strong>0</strong></p>
            <a href="#" class="btn">Manage Content</a>
          </div>
          
          <div class="card">
            <h3>To-Do List</h3>
            <ul>
              <li>Complete homepage design</li>
              <li>Set up product database</li>
              <li>Add gallery section</li>
              <li>Create about page content</li>
            </ul>
          </div>
        </div>
        
        <div class="card">
          <h3>Project Notes</h3>
          <p>This is a private section for team members to keep track of project progress.</p>
          <textarea style="width: 100%; height: 100px; margin-top: 10px; padding: 10px; border: 1px solid #ddd; border-radius: 4px;" placeholder="Add notes here..."></textarea>
          <button class="btn" style="margin-top: 10px; cursor: pointer; border: none;">Save Notes</button>
        </div>
      </body>
    </html>
  `);
});

// Override the about page for preview
previewRoutes.get('/about', (c) => {
  return c.html(html`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>[DEV] About - MLSC Studio</title>
        <style>
          body {
            font-family: 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 30px auto 0;
            padding: 20px;
            background-color: #fafafa;
          }
          header {
            margin-bottom: 40px;
            border-bottom: 1px solid #ddd;
            padding-bottom: 20px;
          }
          h1 {
            font-size: 2.5rem;
            margin-bottom: 10px;
            color: #2196f3;
          }
          .content-section {
            margin-bottom: 40px;
            padding: 20px;
            border: 1px dashed #ccc;
            border-radius: 5px;
          }
          .dev-note {
            background-color: #e3f2fd;
            padding: 15px;
            margin-top: 10px;
            border-radius: 5px;
            font-style: italic;
          }
          nav {
            margin-bottom: 30px;
          }
          nav a {
            margin-right: 15px;
            color: #2196f3;
            text-decoration: none;
          }
          nav a:hover {
            text-decoration: underline;
          }
          footer {
            margin-top: 60px;
            padding-top: 20px;
            border-top: 1px solid #ddd;
            font-size: 0.8rem;
            color: #777;
          }
        </style>
      </head>
      <body>
        ${PreviewBanner()}
        
        <header>
          <h1>About MLSC Studio (Development)</h1>
          <p>Preview build - Not for public release</p>
        </header>
        
        <nav>
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/admin">Admin</a>
        </nav>
        
        <div class="content-section">
          <h2>Our Story</h2>
          <p>MLSC Studio was founded with a vision to create art that blends various influences including vinyl records, urban transit, and sketchbook aesthetics.</p>
          <div class="dev-note">
            <p>Need to expand this section with more detailed history and artist bio.</p>
          </div>
        </div>
        
        <div class="content-section">
          <h2>Contact Information</h2>
          <div class="dev-note">
            <p>Add contact form and studio location details here.</p>
          </div>
        </div>
        
        <footer>
          <p>&copy; ${new Date().getFullYear()} MLSC Studio (Dev Build)</p>
          <p>Last updated: ${new Date().toLocaleString()}</p>
        </footer>
      </body>
    </html>
  `);
});

export { previewRoutes };