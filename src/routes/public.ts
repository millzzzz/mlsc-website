import { Hono } from 'hono';
import { html } from 'hono/html';
import { PreviewBanner } from '../components/PreviewBanner';

// Define types for variables
type Variables = {
  isPreviewMode: boolean;
};

// Public app routes - what general visitors will see
const publicRoutes = new Hono<{ Variables: Variables }>();

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
          
          /* Custom font definition */
          @font-face {
            font-family: 'MLSCNavigationFont';
            src: url('/static/fonts/AkidoNoSymbols-Regular.ttf') format('truetype');
            font-weight: normal;
            font-style: normal;
            font-display: swap;
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
            transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
            position: relative;
            width: 100%;
            text-align: center;
            font-family: 'MLSCNavigationFont', Arial, sans-serif;
            letter-spacing: 3px;
            font-weight: 400;
            font-size: 1.4rem;
            color: #46462c;
            text-transform: uppercase;
            padding: 0.5rem 0;
          }
          
          nav a:hover {
            transform: translateY(-2px) scale(1.05);
            color: #000 !important;
            opacity: 0.9;
          }
          
          nav a::after {
            content: none; /* Removing underline animation */
          }
          
          nav a:hover::after {
            content: none; /* Removing underline animation */
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
        
        <!-- <footer>
          <img src="/static/mlsc-icon.svg" alt="MLSC Icon" class="footer-icon" onerror="this.onerror=null; this.src='/static/mlsc-logo.png';" />
          <p>&copy; ${new Date().getFullYear()} MLSC Studio. All rights reserved.</p>
        </footer> -->
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
          /* Base styles */
          body {
            font-family: 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
          }
          
          /* Custom font definition */
          @font-face {
            font-family: 'MLSCNavigationFont';
            src: url('/static/fonts/AkidoNoSymbols-Regular.ttf') format('truetype');
            font-weight: normal;
            font-style: normal;
            font-display: swap;
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
          
          /* Navigation styling */
          nav {
            margin: 20px 0 40px;
          }
          
          nav ul {
            display: flex;
            justify-content: center;
            list-style: none;
            padding: 0;
            gap: 25px;
            flex-wrap: wrap;
          }
          
          nav a {
            text-decoration: none;
            color: #46462c;
            font-family: 'MLSCNavigationFont', Arial, sans-serif;
            letter-spacing: 3px;
            font-weight: 400;
            font-size: 1.2rem;
            text-transform: uppercase;
            transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
            position: relative;
            padding: 0.5rem 0;
          }
          
          nav a:hover {
            color: #000;
            transform: translateY(-2px) scale(1.05);
            opacity: 0.9;
          }
        </style>
      </head>
      <body>
        ${isPreviewMode ? PreviewBanner() : ''}
        <header>
          <h1>About MLSC Studio</h1>
          <nav>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/sketchbooks">Sketchbooks</a></li>
              <li><a href="/paintings">Paintings</a></li>
              <li><a href="/editorial">Editorial</a></li>
              <li><a href="/shop">Shop</a></li>
              <li><a href="/pdf">PDF</a></li>
            </ul>
          </nav>
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

// Sketchbooks page
publicRoutes.get('/sketchbooks', (c) => {
  const isPreviewMode = c.get('isPreviewMode') || false;
  return c.html(html`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Sketchbooks - MLSC Studio</title>
        <style>
          /* Base styles */
          body {
            font-family: 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
          }
          
          /* Custom font definition */
          @font-face {
            font-family: 'MLSCNavigationFont';
            src: url('/static/fonts/AkidoNoSymbols-Regular.ttf') format('truetype');
            font-weight: normal;
            font-style: normal;
            font-display: swap;
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
          .gallery {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 20px;
            margin: 40px 0;
          }
          .gallery-item {
            border: 1px solid #eee;
            padding: 15px;
            border-radius: 5px;
            transition: transform 0.3s ease;
          }
          .gallery-item:hover {
            transform: translateY(-5px);
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
          }
          .gallery-item img {
            width: 100%;
            height: auto;
            object-fit: cover;
          }
          
          /* Navigation styling */
          nav {
            margin: 20px 0 40px;
          }
          
          nav ul {
            display: flex;
            justify-content: center;
            list-style: none;
            padding: 0;
            gap: 25px;
            flex-wrap: wrap;
          }
          
          nav a {
            text-decoration: none;
            color: #46462c;
            font-family: 'MLSCNavigationFont', Arial, sans-serif;
            letter-spacing: 3px;
            font-weight: 400;
            font-size: 1.2rem;
            text-transform: uppercase;
            transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
            position: relative;
            padding: 0.5rem 0;
          }
          
          nav a:hover {
            color: #000;
            transform: translateY(-2px) scale(1.05);
            opacity: 0.9;
          }
          
          nav a::after {
            content: none; /* Removing underline animation */
          }
          
          nav a:hover::after {
            content: none; /* Removing underline animation */
          }
        </style>
      </head>
      <body>
        ${isPreviewMode ? PreviewBanner() : ''}
        <header>
          <h1>Sketchbooks</h1>
          <nav>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/sketchbooks">Sketchbooks</a></li>
              <li><a href="/paintings">Paintings</a></li>
              <li><a href="/editorial">Editorial</a></li>
              <li><a href="/shop">Shop</a></li>
              <li><a href="/pdf">PDF</a></li>
            </ul>
          </nav>
        </header>
        
        <div class="content-section">
          <h2>Artist Sketchbooks</h2>
          <p>Explore our collection of sketchbooks featuring original drawings, concepts, and artistic experimentation.</p>
          
          <div class="gallery">
            <div class="gallery-item">
              <img src="/static/mlsc-icon.svg" alt="Sketchbook 1" />
              <h3>Urban Sketches Vol. 1</h3>
              <p>City life and architecture studies</p>
            </div>
            <div class="gallery-item">
              <img src="/static/mlsc-icon.svg" alt="Sketchbook 2" />
              <h3>Transit Systems</h3>
              <p>Subway and bus route inspirations</p>
            </div>
            <div class="gallery-item">
              <img src="/static/mlsc-icon.svg" alt="Sketchbook 3" />
              <h3>Character Studies</h3>
              <p>People and expressions</p>
            </div>
          </div>
        </div>
        
        <footer>
          <p>&copy; ${new Date().getFullYear()} MLSC Studio. All rights reserved.</p>
        </footer>
      </body>
    </html>
  `);
});

// Paintings page
publicRoutes.get('/paintings', (c) => {
  const isPreviewMode = c.get('isPreviewMode') || false;
  return c.html(html`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Paintings - MLSC Studio</title>
        <style>
          /* Base styles */
          body {
            font-family: 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
          }
          
          /* Custom font definition */
          @font-face {
            font-family: 'MLSCNavigationFont';
            src: url('/static/fonts/AkidoNoSymbols-Regular.ttf') format('truetype');
            font-weight: normal;
            font-style: normal;
            font-display: swap;
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
          .artwork {
            margin: 40px 0;
          }
          .artwork img {
            width: 100%;
            height: auto;
            margin-bottom: 15px;
            border-radius: 5px;
          }
          .artwork-info {
            padding: 15px;
            background: #f9f9f9;
            border-radius: 5px;
          }
          
          /* Navigation styling */
          nav {
            margin: 20px 0 40px;
          }
          
          nav ul {
            display: flex;
            justify-content: center;
            list-style: none;
            padding: 0;
            gap: 25px;
            flex-wrap: wrap;
          }
          
          nav a {
            text-decoration: none;
            color: #46462c;
            font-family: 'MLSCNavigationFont', Arial, sans-serif;
            letter-spacing: 3px;
            font-weight: 400;
            font-size: 1.2rem;
            text-transform: uppercase;
            transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
            position: relative;
            padding: 0.5rem 0;
          }
          
          nav a:hover {
            color: #000;
            transform: translateY(-2px) scale(1.05);
            opacity: 0.9;
          }
          
          nav a::after {
            content: none; /* Removing underline animation */
          }
          
          nav a:hover::after {
            content: none; /* Removing underline animation */
          }
        </style>
      </head>
      <body>
        ${isPreviewMode ? PreviewBanner() : ''}
        <header>
          <h1>Paintings</h1>
          <nav>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/sketchbooks">Sketchbooks</a></li>
              <li><a href="/paintings">Paintings</a></li>
              <li><a href="/editorial">Editorial</a></li>
              <li><a href="/shop">Shop</a></li>
              <li><a href="/pdf">PDF</a></li>
            </ul>
          </nav>
        </header>
        
        <div class="content-section">
          <h2>Original Artwork</h2>
          <p>View our collection of original paintings and mixed media pieces.</p>
          
          <div class="artwork">
            <img src="/static/mlsc-icon.svg" alt="Painting 1" />
            <div class="artwork-info">
              <h3>Urban Transit Series #1</h3>
              <p>Acrylic on canvas, 24" x 36"</p>
              <p>This piece explores the interconnectedness of urban transit systems and human movement through cities.</p>
            </div>
          </div>
          
          <div class="artwork">
            <img src="/static/mlsc-icon.svg" alt="Painting 2" />
            <div class="artwork-info">
              <h3>Vinyl Inspiration</h3>
              <p>Mixed media, 18" x 18"</p>
              <p>An exploration of music, rhythm, and visual pattern inspired by vinyl record aesthetics.</p>
            </div>
          </div>
        </div>
        
        <footer>
          <p>&copy; ${new Date().getFullYear()} MLSC Studio. All rights reserved.</p>
        </footer>
      </body>
    </html>
  `);
});

// Editorial page
publicRoutes.get('/editorial', (c) => {
  const isPreviewMode = c.get('isPreviewMode') || false;
  return c.html(html`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Editorial - MLSC Studio</title>
        <style>
          /* Base styles */
          body {
            font-family: 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
          }
          
          /* Custom font definition */
          @font-face {
            font-family: 'MLSCNavigationFont';
            src: url('/static/fonts/AkidoNoSymbols-Regular.ttf') format('truetype');
            font-weight: normal;
            font-style: normal;
            font-display: swap;
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
          .article {
            margin-bottom: 40px;
            padding-bottom: 20px;
            border-bottom: 1px solid #eee;
          }
          .article:last-child {
            border-bottom: none;
          }
          .article h3 {
            margin-bottom: 5px;
          }
          .article .meta {
            color: #777;
            font-size: 0.9rem;
            margin-bottom: 15px;
          }
          
          /* Navigation styling */
          nav {
            margin: 20px 0 40px;
          }
          
          nav ul {
            display: flex;
            justify-content: center;
            list-style: none;
            padding: 0;
            gap: 25px;
            flex-wrap: wrap;
          }
          
          nav a {
            text-decoration: none;
            color: #46462c;
            font-family: 'MLSCNavigationFont', Arial, sans-serif;
            letter-spacing: 3px;
            font-weight: 400;
            font-size: 1.2rem;
            text-transform: uppercase;
            transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
            position: relative;
            padding: 0.5rem 0;
          }
          
          nav a:hover {
            color: #000;
            transform: translateY(-2px) scale(1.05);
            opacity: 0.9;
          }
        </style>
      </head>
      <body>
        ${isPreviewMode ? PreviewBanner() : ''}
        <header>
          <h1>Editorial</h1>
          <nav>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/sketchbooks">Sketchbooks</a></li>
              <li><a href="/paintings">Paintings</a></li>
              <li><a href="/editorial">Editorial</a></li>
              <li><a href="/shop">Shop</a></li>
              <li><a href="/pdf">PDF</a></li>
            </ul>
          </nav>
        </header>
        
        <div class="content-section">
          <h2>Art Essays & Thoughts</h2>
          <p>Read our thoughts on art, design, and creative processes.</p>
          
          <div class="article">
            <h3>The Intersection of Music and Visual Art</h3>
            <div class="meta">Published: June 15, 2023 | Author: MLSC Studio</div>
            <p>This essay explores the relationship between music—particularly vinyl records—and the visual arts. How does sound influence visual creativity?</p>
            <a href="#">Read more →</a>
          </div>
          
          <div class="article">
            <h3>Urban Transit as Artistic Inspiration</h3>
            <div class="meta">Published: May 3, 2023 | Author: MLSC Studio</div>
            <p>The patterns, maps, and rhythms of city transit systems have inspired countless artists. This piece examines why transit is such a powerful creative muse.</p>
            <a href="#">Read more →</a>
          </div>
          
          <div class="article">
            <h3>Sketchbooks: The Artist's Laboratory</h3>
            <div class="meta">Published: April 17, 2023 | Author: MLSC Studio</div>
            <p>A look at how sketchbooks function as experimental spaces for artists to develop ideas before bringing them to larger work.</p>
            <a href="#">Read more →</a>
          </div>
        </div>
        
        <footer>
          <p>&copy; ${new Date().getFullYear()} MLSC Studio. All rights reserved.</p>
        </footer>
      </body>
    </html>
  `);
});

// Shop page
publicRoutes.get('/shop', (c) => {
  const isPreviewMode = c.get('isPreviewMode') || false;
  return c.html(html`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Shop - MLSC Studio</title>
        <style>
          /* Base styles */
          body {
            font-family: 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
          }
          
          /* Custom font definition */
          @font-face {
            font-family: 'MLSCNavigationFont';
            src: url('/static/fonts/AkidoNoSymbols-Regular.ttf') format('truetype');
            font-weight: normal;
            font-style: normal;
            font-display: swap;
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
          .products {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 30px;
            margin: 40px 0;
          }
          .product {
            border: 1px solid #eee;
            border-radius: 5px;
            padding: 15px;
            transition: all 0.3s ease;
          }
          .product:hover {
            transform: translateY(-5px);
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
          }
          .product img {
            width: 100%;
            height: auto;
            border-radius: 3px;
            margin-bottom: 10px;
          }
          .price {
            font-weight: bold;
            color: #4a4a4a;
            margin: 5px 0;
          }
          .btn {
            display: inline-block;
            background: #4d4d26;
            color: white;
            padding: 8px 15px;
            border-radius: 4px;
            text-decoration: none;
            font-size: 0.9rem;
            transition: background 0.3s ease;
          }
          .btn:hover {
            background: #333;
          }
          
          /* Navigation styling */
          nav {
            margin: 20px 0 40px;
          }
          
          nav ul {
            display: flex;
            justify-content: center;
            list-style: none;
            padding: 0;
            gap: 25px;
            flex-wrap: wrap;
          }
          
          nav a {
            text-decoration: none;
            color: #46462c;
            font-family: 'MLSCNavigationFont', Arial, sans-serif;
            letter-spacing: 3px;
            font-weight: 400;
            font-size: 1.2rem;
            text-transform: uppercase;
            transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
            position: relative;
            padding: 0.5rem 0;
          }
          
          nav a:hover {
            color: #000;
            transform: translateY(-2px) scale(1.05);
            opacity: 0.9;
          }
        </style>
      </head>
      <body>
        ${isPreviewMode ? PreviewBanner() : ''}
        <header>
          <h1>Shop</h1>
          <nav>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/sketchbooks">Sketchbooks</a></li>
              <li><a href="/paintings">Paintings</a></li>
              <li><a href="/editorial">Editorial</a></li>
              <li><a href="/shop">Shop</a></li>
              <li><a href="/pdf">PDF</a></li>
            </ul>
          </nav>
        </header>
        
        <div class="content-section">
          <h2>Art Prints & Merchandise</h2>
          <p>Purchase original prints, books, and merchandise from MLSC Studio.</p>
          
          <div class="products">
            <div class="product">
              <img src="/static/mlsc-icon.svg" alt="Product 1" />
              <h3>Transit Map Print</h3>
              <p class="price">$45.00</p>
              <p>Limited edition print of NYC-inspired transit map</p>
              <a href="#" class="btn">Add to Cart</a>
            </div>
            
            <div class="product">
              <img src="/static/mlsc-icon.svg" alt="Product 2" />
              <h3>Vinyl Record Journal</h3>
              <p class="price">$28.00</p>
              <p>Hardcover journal with vinyl-inspired design</p>
              <a href="#" class="btn">Add to Cart</a>
            </div>
            
            <div class="product">
              <img src="/static/mlsc-icon.svg" alt="Product 3" />
              <h3>Urban Sketches Book</h3>
              <p class="price">$35.00</p>
              <p>Collection of city sketches and drawings</p>
              <a href="#" class="btn">Add to Cart</a>
            </div>
            
            <div class="product">
              <img src="/static/mlsc-icon.svg" alt="Product 4" />
              <h3>MLSC Studio Tote Bag</h3>
              <p class="price">$22.00</p>
              <p>Canvas tote with studio logo and design</p>
              <a href="#" class="btn">Add to Cart</a>
            </div>
          </div>
        </div>
        
        <footer>
          <p>&copy; ${new Date().getFullYear()} MLSC Studio. All rights reserved.</p>
        </footer>
      </body>
    </html>
  `);
});

// PDF page
publicRoutes.get('/pdf', (c) => {
  const isPreviewMode = c.get('isPreviewMode') || false;
  return c.html(html`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Portfolio - MLSC Studio</title>
        <style>
          body, html {
            margin: 0;
            padding: 0;
            height: 100%;
            width: 100%;
            overflow: hidden;
          }
          
          .pdf-fullscreen {
            width: 100%;
            height: 100vh;
            border: none;
            display: block;
          }
          
          .back-button {
            position: fixed;
            top: 15px;
            left: 15px;
            z-index: 100;
            background: rgba(255, 255, 255, 0.7);
            padding: 8px 15px;
            border-radius: 4px;
            text-decoration: none;
            color: #333;
            font-family: 'Helvetica Neue', Arial, sans-serif;
            font-weight: bold;
            backdrop-filter: blur(5px);
            transition: all 0.3s ease;
            border: 1px solid rgba(0,0,0,0.1);
          }
          
          .back-button:hover {
            background: rgba(255, 255, 255, 0.9);
          }
          
          ${isPreviewMode ? `
          .preview-banner {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 1000;
            background: rgba(255, 87, 34, 0.9);
            color: white;
            text-align: center;
            padding: 5px;
            font-family: 'Helvetica Neue', Arial, sans-serif;
            font-size: 14px;
          }
          ` : ''}
        </style>
      </head>
      <body>
        ${isPreviewMode ? `<div class="preview-banner">Preview Mode</div>` : ''}
        <a href="/" class="back-button">← Back</a>
        <iframe src="/static/Portfolio.pdf" class="pdf-fullscreen" title="MLSC Studio Portfolio"></iframe>
      </body>
    </html>
  `);
});

export { publicRoutes };
