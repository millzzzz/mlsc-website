import { Hono } from 'hono';
import { html } from 'hono/html';
import { PreviewBanner } from '../components/PreviewBanner';

// Public app routes - what general visitors will see
const publicRoutes = new Hono();

// Public home page
publicRoutes.get('/', (c) => {
  const isPreviewMode = c.get('isPreviewMode') || false;
  return c.html(html`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>MLSC Studio</title>
        <style>
          /* Base styles - Mobile First */
          body {
            font-family: 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            width: 100%;
            max-width: 100%;
            margin: 0 auto;
            padding: 15px;
            box-sizing: border-box;
            opacity: 0;
            animation: fadeIn 0.8s ease-in-out forwards;
            display: flex;
            flex-direction: column;
            min-height: 100vh;
            justify-content: space-between;
          }
          
          /* Animation keyframes */
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          
          @keyframes slideUp {
            from { transform: translateY(20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
          
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
          }
          
          @keyframes logoSpin {
            from { transform: rotateY(0deg); }
            to { transform: rotateY(360deg); }
          }
          
          /* Layout elements */
          header {
            margin-bottom: 30px;
            padding-bottom: 15px;
            animation: slideUp 0.6s ease-out forwards;
            animation-delay: 0.2s;
            opacity: 0;
            width: 100%;
            text-align: center;
            flex: 0 0 auto;
            padding-top: 5vh;
          }
          
          h1 {
            font-size: 2rem;
            margin-bottom: 10px;
          }
          
          .content-section {
            margin-bottom: 30px;
            animation: slideUp 0.6s ease-out forwards;
            animation-delay: 0.4s;
            opacity: 0;
          }
          
          /* Main navigation */
          nav {
            text-align: center;
            margin: 40px 0;
            width: 100%;
            flex: 1 0 auto;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          
          nav div {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;
            font-size: 1.2rem;
            font-weight: bold;
            color: #4d4d26;
            gap: 20px;
          }
          
          nav a {
            display: block;
            margin-bottom: 15px;
            text-decoration: none;
            color: inherit;
            transition: all 0.2s ease-in-out;
            position: relative;
            width: 100%;
            text-align: center;
          }
          
          nav a:hover {
            transform: translateY(-2px);
            color: #000 !important;
          }
          
          nav a::after {
            content: '';
            position: absolute;
            width: 0;
            height: 2px;
            bottom: -2px;
            left: 50%;
            background-color: #4d4d26;
            transition: all 0.3s ease;
          }
          
          nav a:hover::after {
            width: 100%;
            left: 0;
          }
          
          /* Footer styling */
          footer {
            margin-top: 40px;
            padding-top: 20px;
            padding-bottom: 5vh;
            border-top: 1px solid #eee;
            font-size: 0.8rem;
            color: #777;
            animation: slideUp 0.6s ease-out forwards;
            animation-delay: 0.6s;
            opacity: 0;
            text-align: center;
            width: 100%;
            flex: 0 0 auto;
          }
          
          /* Logo styling and animation */
          .logo-container {
            transition: transform 0.3s ease;
            width: 100%;
            max-width: 250px;
            margin: 0 auto 40px;
            height: 25vh;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          
          .logo-container img {
            width: auto;
            height: auto;
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
            transition: all 0.3s ease;
            src: "/static/mlsc-logo.svg";
          }
          
          .logo-container:hover img {
            animation: pulse 1.5s ease-in-out;
            transform: translateY(-2px);
          }
          
          /* Footer icon animation */
          .footer-icon {
            transition: transform 0.3s ease;
            width: 50px;
            height: 50px;
            margin-bottom: 15px;
          }
          
          .footer-icon:hover {
            transform: rotate(10deg);
          }
          
          /* Desktop styles */
          @media (min-width: 768px) {
            body {
              max-width: 800px;
              padding: 20px;
            }
            
            header {
              margin-bottom: 40px;
              padding-bottom: 20px;
              padding-top: 8vh;
            }
            
            .logo-container {
              max-width: 300px;
              height: 30vh;
            }
            
            nav div {
              flex-direction: column;
              justify-content: center;
              gap: 25px;
            }
            
            nav a {
              margin: 0;
              width: auto;
            }
            
            footer {
              margin-top: 60px;
            }
            
            .footer-icon {
              width: 60px;
              height: 60px;
              margin-bottom: 20px;
            }
          }
          
          /* Large desktop styles */
          @media (min-width: 1200px) {
            body {
              max-width: 1000px;
            }
          }
        </style>
      </head>
      <body>
        ${isPreviewMode ? PreviewBanner() : ''}
        <header>
          <div class="logo-container">
            <img src="/static/mlsc-logo.png" alt="MLSC Studio" />
          </div>
        </header>
        
        <nav>
          <div>
            <a href="/sketchbooks">SKETCHBOOKS</a>
            <a href="/paintings">PAINTINGS</a>
            <a href="/editorial">EDITORIAL</a>
            <a href="/shop">SHOP</a>
            <a href="/pdf">PDF</a>
          </div>
        </nav>
        
        <footer>
          <img src="/static/mlsc-icon.svg" alt="MLSC Icon" class="footer-icon" onerror="this.onerror=null; this.src='/static/mlsc-logo.png';" />
          <p>&copy; ${new Date().getFullYear()} MLSC Studio. All rights reserved.</p>
        </footer>
      </body>
    </html>
  `);
});

// Additional public routes
publicRoutes.get('/about', (c) => {
  const isPreviewMode = c.get('isPreviewMode') || false;
  return c.html(html`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>About - MLSC Studio</title>
        <style>
          body {
            font-family: 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
          }
          header {
            margin-bottom: 40px;
            border-bottom: 1px solid #eee;
            padding-bottom: 20px;
          }
          h1 {
            font-size: 2.5rem;
            margin-bottom: 10px;
          }
        </style>
      </head>
      <body>
        ${isPreviewMode ? PreviewBanner() : ''}
        <header>
          <h1>About MLSC Studio</h1>
          <p><a href="/">Back to Home</a></p>
        </header>
        
        <div class="content-section">
          <h2>Our Story</h2>
          <p>MLSC Studio was founded with a vision to create art that blends various influences including vinyl records, urban transit, and sketchbook aesthetics.</p>
        </div>
        
        <footer>
          <p>&copy; ${new Date().getFullYear()} MLSC Studio. All rights reserved.</p>
        </footer>
      </body>
    </html>
  `);
});

export { publicRoutes };
