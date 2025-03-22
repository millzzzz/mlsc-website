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
        <script src="/static/js/editorial.js" defer></script>
        <style>
          /* Base styles */
          body {
            font-family: 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 1200px;
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
          
          /* Masonry Grid Styles - inspired by olaoluslawn.com/works */
          .categories {
            display: flex;
            gap: 15px;
            margin-bottom: 30px;
            flex-wrap: wrap;
          }
          
          .category-button {
            padding: 8px 16px;
            background: #f5f5f5;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
            transition: all 0.2s ease;
          }
          
          .category-button:hover, .category-button.active {
            background: #333;
            color: white;
          }
          
          .masonry-grid {
            display: grid;
            grid-template-columns: repeat(1, 1fr);
            gap: 20px;
            margin-top: 40px;
          }
          
          @media (min-width: 640px) {
            .masonry-grid {
              grid-template-columns: repeat(2, 1fr);
            }
          }
          
          @media (min-width: 1024px) {
            .masonry-grid {
              grid-template-columns: repeat(3, 1fr);
            }
          }
          
          .grid-item {
            break-inside: avoid;
            margin-bottom: 20px;
            position: relative;
            overflow: hidden;
            border-radius: 4px;
            transition: transform 0.3s ease;
          }
          
          .grid-item:hover {
            transform: translateY(-5px);
          }
          
          .grid-item.square {
            aspect-ratio: 1/1;
          }
          
          .grid-item.portrait {
            aspect-ratio: 3/4;
          }
          
          .grid-item.landscape {
            aspect-ratio: 4/3;
          }
          
          .grid-item.wide {
            aspect-ratio: 16/9;
            grid-column: span 1;
          }
          
          @media (min-width: 640px) {
            .grid-item.wide {
              grid-column: span 2;
            }
          }
          
          .grid-item img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.5s ease;
          }
          
          .grid-item:hover img {
            transform: scale(1.05);
          }
          
          .grid-item-overlay {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            background: rgba(0, 0, 0, 0.7);
            color: white;
            padding: 15px;
            opacity: 0;
            transition: opacity 0.3s ease;
          }
          
          .grid-item:hover .grid-item-overlay {
            opacity: 1;
          }
          
          .grid-item-overlay h3 {
            margin: 0 0 5px 0;
            font-size: 18px;
          }
          
          .grid-item-overlay p {
            margin: 0;
            font-size: 14px;
            opacity: 0.8;
          }
          
          .grid-item a {
            display: block;
            height: 100%;
            color: inherit;
            text-decoration: none;
          }
          
          /* Article Preview Section */
          .articles-preview {
            margin-top: 60px;
          }
          
          .article-card {
            display: flex;
            margin-bottom: 30px;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          
          .article-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 15px rgba(0,0,0,0.1);
          }
          
          .article-image {
            width: 30%;
            min-height: 200px;
          }
          
          .article-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          
          .article-content {
            width: 70%;
            padding: 20px;
            background: white;
          }
          
          .article-content h3 {
            margin-top: 0;
            margin-bottom: 10px;
          }
          
          .article-meta {
            display: flex;
            color: #777;
            font-size: 14px;
            margin-bottom: 15px;
          }
          
          .article-meta span {
            margin-right: 15px;
          }
          
          .article-summary {
            margin-bottom: 15px;
            line-height: 1.6;
          }
          
          .read-more {
            display: inline-block;
            padding: 8px 16px;
            background: #333;
            color: white;
            text-decoration: none;
            border-radius: 4px;
            font-size: 14px;
            transition: background 0.3s ease;
          }
          
          .read-more:hover {
            background: #555;
          }
          
          /* Loading state */
          .loading {
            text-align: center;
            padding: 50px 20px;
            font-size: 18px;
            color: #777;
          }
          
          /* Error state */
          .error {
            text-align: center;
            padding: 50px 20px;
            color: #e74c3c;
            background: #fdf0f0;
            border-radius: 4px;
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
          <h2>Art Essays & Visual Stories</h2>
          <p>Explore our collection of essays, visual stories, and insights on art, design, and creative processes.</p>
          
          <div class="categories">
            <button class="category-button active" data-category="all">All</button>
            <button class="category-button" data-category="music-visual-art">Music & Visual Art</button>
            <button class="category-button" data-category="urban-transit">Urban Transit</button>
            <button class="category-button" data-category="sketchbooks">Sketchbooks</button>
            <button class="category-button" data-category="design-principles">Design Principles</button>
          </div>
          
          <div id="editorial-grid" class="masonry-grid">
            <!-- Grid items will be loaded from the API -->
            <div class="grid-item portrait">
              <a href="/editorial/the-intersection-of-music-and-visual-art">
                <img src="/static/mlsc-icon.svg" alt="The Intersection of Music and Visual Art" loading="lazy" />
                <div class="grid-item-overlay">
                  <h3>The Intersection of Music and Visual Art</h3>
                  <p>Music & Visual Art · June 15, 2023</p>
                </div>
              </a>
            </div>
            
            <div class="grid-item landscape">
              <a href="/editorial/urban-transit-as-artistic-inspiration">
                <img src="/static/mlsc-icon.svg" alt="Urban Transit as Artistic Inspiration" loading="lazy" />
                <div class="grid-item-overlay">
                  <h3>Urban Transit as Artistic Inspiration</h3>
                  <p>Urban Transit · May 3, 2023</p>
                </div>
              </a>
            </div>
            
            <div class="grid-item square">
              <a href="/editorial/sketchbooks-the-artists-laboratory">
                <img src="/static/mlsc-icon.svg" alt="Sketchbooks: The Artist's Laboratory" loading="lazy" />
                <div class="grid-item-overlay">
                  <h3>Sketchbooks: The Artist's Laboratory</h3>
                  <p>Sketchbooks · April 17, 2023</p>
                </div>
              </a>
            </div>
            
            <div class="grid-item wide">
              <a href="/editorial/typography-in-modern-design">
                <img src="/static/mlsc-icon.svg" alt="Typography in Modern Design" loading="lazy" />
                <div class="grid-item-overlay">
                  <h3>Typography in Modern Design</h3>
                  <p>Design Principles · March 28, 2023</p>
                </div>
              </a>
            </div>
            
            <div class="grid-item portrait">
              <a href="/editorial/color-theory-in-urban-spaces">
                <img src="/static/mlsc-icon.svg" alt="Color Theory in Urban Spaces" loading="lazy" />
                <div class="grid-item-overlay">
                  <h3>Color Theory in Urban Spaces</h3>
                  <p>Urban Transit · March 12, 2023</p>
                </div>
              </a>
            </div>
            
            <div class="grid-item square">
              <a href="/editorial/vinyl-records-design-influence">
                <img src="/static/mlsc-icon.svg" alt="The Influence of Vinyl Records on Design" loading="lazy" />
                <div class="grid-item-overlay">
                  <h3>The Influence of Vinyl Records on Design</h3>
                  <p>Music & Visual Art · February 24, 2023</p>
                </div>
              </a>
            </div>
          </div>
          
          <div class="articles-preview">
            <h2>Latest Essays</h2>
            <div class="article-card">
              <div class="article-image">
                <img src="/static/mlsc-icon.svg" alt="The Intersection of Music and Visual Art" />
              </div>
              <div class="article-content">
                <h3>The Intersection of Music and Visual Art</h3>
                <div class="article-meta">
                  <span>June 15, 2023</span>
                  <span>MLSC Studio</span>
                  <span>Music & Visual Art</span>
                </div>
                <div class="article-summary">
                  This essay explores the relationship between music—particularly vinyl records—and the visual arts. How does sound influence visual creativity?
                </div>
                <a href="/editorial/the-intersection-of-music-and-visual-art" class="read-more">Read more</a>
              </div>
            </div>
            
            <div class="article-card">
              <div class="article-image">
                <img src="/static/mlsc-icon.svg" alt="Urban Transit as Artistic Inspiration" />
              </div>
              <div class="article-content">
                <h3>Urban Transit as Artistic Inspiration</h3>
                <div class="article-meta">
                  <span>May 3, 2023</span>
                  <span>MLSC Studio</span>
                  <span>Urban Transit</span>
                </div>
                <div class="article-summary">
                  The patterns, maps, and rhythms of city transit systems have inspired countless artists. This piece examines why transit is such a powerful creative muse.
                </div>
                <a href="/editorial/urban-transit-as-artistic-inspiration" class="read-more">Read more</a>
              </div>
            </div>
            
            <div class="article-card">
              <div class="article-image">
                <img src="/static/mlsc-icon.svg" alt="Sketchbooks: The Artist's Laboratory" />
              </div>
              <div class="article-content">
                <h3>Sketchbooks: The Artist's Laboratory</h3>
                <div class="article-meta">
                  <span>April 17, 2023</span>
                  <span>MLSC Studio</span>
                  <span>Sketchbooks</span>
                </div>
                <div class="article-summary">
                  A look at how sketchbooks function as experimental spaces for artists to develop ideas before bringing them to larger work.
                </div>
                <a href="/editorial/sketchbooks-the-artists-laboratory" class="read-more">Read more</a>
              </div>
            </div>
          </div>
        </div>
        
        <script>
          // Filtering functionality for categories
          document.addEventListener('DOMContentLoaded', function() {
            const categoryButtons = document.querySelectorAll('.category-button');
            const gridItems = document.querySelectorAll('.grid-item');
            
            categoryButtons.forEach(button => {
              button.addEventListener('click', () => {
                // Update active state
                categoryButtons.forEach(b => b.classList.remove('active'));
                button.classList.add('active');
                
                const category = button.dataset.category;
                
                if (category === 'all') {
                  // Show all items
                  gridItems.forEach(item => {
                    item.style.display = 'block';
                  });
                } else {
                  // Filter items
                  gridItems.forEach(item => {
                    const itemCategory = item.querySelector('.grid-item-overlay p').textContent.split(' · ')[0].toLowerCase();
                    
                    if (itemCategory.includes(category)) {
                      item.style.display = 'block';
                    } else {
                      item.style.display = 'none';
                    }
                  });
                }
              });
            });
            
            // Future API integration will go here
            // This will fetch editorial content from the CMS
            // and dynamically populate the grid and article cards
          });
        </script>
        
        <footer>
          <p>&copy; ${new Date().getFullYear()} MLSC Studio. All rights reserved.</p>
        </footer>
      </body>
    </html>
  `);
});

// Editorial single post page
publicRoutes.get('/editorial/:slug', (c) => {
  const isPreviewMode = c.get('isPreviewMode') || false;
  const slug = c.req.param('slug');
  
  return c.html(html`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Editorial Post - MLSC Studio</title>
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
          }
          
          .back-link {
            display: inline-block;
            margin-bottom: 20px;
            color: #555;
            text-decoration: none;
            font-size: 14px;
          }
          
          .back-link:hover {
            text-decoration: underline;
          }
          
          .article-header {
            margin-bottom: 30px;
          }
          
          .article-header h1 {
            font-size: 2.5rem;
            margin-bottom: 10px;
            line-height: 1.2;
          }
          
          .article-meta {
            color: #777;
            font-size: 0.9rem;
            margin-bottom: 20px;
            display: flex;
            flex-wrap: wrap;
            gap: 15px;
          }
          
          .article-featured-image {
            width: 100%;
            margin-bottom: 30px;
          }
          
          .article-featured-image img {
            width: 100%;
            height: auto;
            border-radius: 8px;
          }
          
          .article-content {
            font-size: 1.1rem;
            line-height: 1.7;
          }
          
          .article-content p {
            margin-bottom: 20px;
          }
          
          .article-content h2 {
            margin-top: 40px;
            margin-bottom: 20px;
          }
          
          .article-content img {
            max-width: 100%;
            height: auto;
            margin: 30px 0;
            border-radius: 4px;
          }
          
          .article-content blockquote {
            border-left: 4px solid #ddd;
            padding-left: 20px;
            margin: 30px 0;
            font-style: italic;
            color: #555;
          }
          
          .article-gallery {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
            margin: 40px 0;
          }
          
          @media (min-width: 640px) {
            .article-gallery {
              grid-template-columns: repeat(3, 1fr);
            }
          }
          
          .gallery-item {
            position: relative;
            overflow: hidden;
            border-radius: 4px;
          }
          
          .gallery-item img {
            width: 100%;
            height: auto;
            transition: transform 0.3s ease;
          }
          
          .gallery-item:hover img {
            transform: scale(1.05);
          }
          
          /* Navigation */
          nav ul {
            display: flex;
            list-style: none;
            padding: 0;
            gap: 20px;
            margin-bottom: 30px;
            flex-wrap: wrap;
          }
          
          nav a {
            text-decoration: none;
            color: #555;
            font-size: 0.9rem;
            transition: color 0.3s ease;
          }
          
          nav a:hover {
            color: #000;
          }
          
          footer {
            margin-top: 60px;
            padding-top: 20px;
            border-top: 1px solid #eee;
            color: #777;
            font-size: 0.9rem;
          }
        </style>
      </head>
      <body>
        ${isPreviewMode ? PreviewBanner() : ''}
        <header>
          <a href="/editorial" class="back-link">← Back to Editorial</a>
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
        
        <article>
          <div class="article-header">
            <h1>The Intersection of Music and Visual Art</h1>
            <div class="article-meta">
              <span>Published: June 15, 2023</span>
              <span>Author: MLSC Studio</span>
              <span>Category: Music & Visual Art</span>
            </div>
          </div>
          
          <div class="article-featured-image">
            <img src="/static/mlsc-icon.svg" alt="The Intersection of Music and Visual Art" />
          </div>
          
          <div class="article-content">
            <p>This essay explores the relationship between music—particularly vinyl records—and the visual arts. How does sound influence visual creativity?</p>
            
            <p>The connection between music and visual art has been a subject of fascination for artists and scholars alike. Throughout history, these two creative expressions have informed and inspired one another, creating a rich tapestry of cross-disciplinary influence.</p>
            
            <h2>Rhythm and Composition</h2>
            
            <p>Just as musical compositions rely on rhythm, tempo, and harmony, visual artwork employs similar principles through spatial relationships, color harmony, and visual rhythm. The structured patterns found in both mediums create an invisible bridge between what we hear and what we see.</p>
            
            <div class="article-gallery">
              <div class="gallery-item">
                <img src="/static/mlsc-icon.svg" alt="Gallery image 1" />
              </div>
              <div class="gallery-item">
                <img src="/static/mlsc-icon.svg" alt="Gallery image 2" />
              </div>
              <div class="gallery-item">
                <img src="/static/mlsc-icon.svg" alt="Gallery image 3" />
              </div>
            </div>
            
            <h2>Album Art as a Canvas</h2>
            
            <p>The vinyl record introduced a new canvas for visual artists—the album cover. This 12×12 inch square became an iconic format that has produced some of the most recognizable imagery in popular culture. From the psychedelic swirls of 1960s rock albums to the minimalist designs of electronic music, album covers have both reflected and defined visual trends.</p>
            
            <blockquote>
              "The album cover is where music becomes tangible, where sound takes physical form." — Artist statement, MLSC Studio
            </blockquote>
            
            <p>As we continue to explore this fertile intersection, new technologies open up possibilities for even more immersive experiences that blend sound and vision. Interactive installations, music visualization software, and virtual reality create environments where these two sensory experiences become inseparable.</p>
          </div>
        </article>
        
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
          :root {
            --bg-color: #fff;
            --text-color: #000;
            --accent-color: #FF5722;
            --border-color: #eaeaea;
            --hover-color: #fafafa;
            --card-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
            --transition: all 0.2s ease;
            --radius: 8px;
            --gray-100: #f5f5f5;
            --gray-200: #eaeaea;
            --gray-300: #e1e1e1;
            --gray-400: #ccc;
            --gray-500: #999;
            --gray-600: #666;
            --gray-700: #444;
            --gray-800: #333;
            --gray-900: #111;
          }
          
          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }
          
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 
                        Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            line-height: 1.6;
            color: var(--text-color);
            background: var(--bg-color);
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 24px;
          }
          
          /* Custom font definition */
          @font-face {
            font-family: 'MLSCNavigationFont';
            src: url('/static/fonts/AkidoNoSymbols-Regular.ttf') format('truetype');
            font-weight: normal;
            font-style: normal;
            font-display: swap;
          }
          
          /* Header */
          header {
            margin: 24px 0 40px;
            padding-bottom: 16px;
            border-bottom: 1px solid var(--border-color);
          }
          
          h1 {
            font-size: 2.5rem;
            font-weight: 800;
            letter-spacing: -0.05em;
            margin-bottom: 8px;
          }
          
          /* Navigation */
          nav {
            margin: 20px 0;
          }
          
          nav ul {
            display: flex;
            list-style: none;
            padding: 0;
            gap: 20px;
            flex-wrap: wrap;
          }
          
          nav a {
            text-decoration: none;
            color: var(--gray-700);
            font-weight: 500;
            font-size: 14px;
            transition: var(--transition);
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          
          nav a:hover {
            color: var(--text-color);
          }
          
          nav a.active {
            color: var(--accent-color);
            font-weight: 600;
          }
          
          /* Shop Header Section */
          .shop-header {
            margin-bottom: 48px;
          }
          
          .shop-header h2 {
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 12px;
            letter-spacing: -0.03em;
          }
          
          .shop-header p {
            font-size: 1.1rem;
            color: var(--gray-600);
            max-width: 650px;
            margin-bottom: 24px;
          }
          
          /* Shop Controls */
          .shop-controls {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 32px;
            gap: 16px;
            flex-wrap: wrap;
          }
          
          /* Filter section */
          .filter-section {
            display: flex;
            gap: 12px;
            flex-wrap: wrap;
          }
          
          .filter-button {
            display: inline-flex;
            align-items: center;
            background: var(--bg-color);
            border: 1px solid var(--border-color);
            padding: 8px 16px;
            border-radius: var(--radius);
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            transition: var(--transition);
          }
          
          .filter-button:hover {
            background: var(--hover-color);
          }
          
          .filter-button.active {
            background: var(--gray-100);
            border-color: var(--gray-300);
          }
          
          /* Search box */
          .search-box {
            position: relative;
            flex-grow: 1;
            max-width: 300px;
          }
          
          .search-box input {
            width: 100%;
            padding: 10px 16px;
            border: 1px solid var(--border-color);
            border-radius: var(--radius);
            font-size: 14px;
            transition: var(--transition);
          }
          
          .search-box input:focus {
            outline: none;
            border-color: var(--gray-400);
            box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.05);
          }
          
          /* Product Grid */
          .products {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 32px;
            margin-bottom: 64px;
          }
          
          /* Product Card */
          .product {
            display: flex;
            flex-direction: column;
            border-radius: var(--radius);
            overflow: hidden;
            transition: var(--transition);
            border: 1px solid var(--border-color);
            background: var(--bg-color);
          }
          
          .product:hover {
            transform: translateY(-4px);
            box-shadow: var(--card-shadow);
          }
          
          .product-image {
            position: relative;
            aspect-ratio: 1 / 1;
            background-color: var(--gray-100);
            overflow: hidden;
          }
          
          .product-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.5s ease;
          }
          
          .product:hover .product-image img {
            transform: scale(1.05);
          }
          
          .product-badge {
            position: absolute;
            top: 12px;
            right: 12px;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            font-size: 12px;
            font-weight: 500;
            padding: 4px 8px;
            border-radius: 4px;
          }
          
          .product-details {
            padding: 16px;
            flex-grow: 1;
            display: flex;
            flex-direction: column;
          }
          
          .product-category {
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            font-weight: 500;
            color: var(--gray-500);
            margin-bottom: 4px;
          }
          
          .product h3 {
            font-size: 18px;
            margin-bottom: 8px;
            font-weight: 600;
          }
          
          .product-description {
            font-size: 14px;
            color: var(--gray-600);
            margin-bottom: 16px;
            flex-grow: 1;
          }
          
          .product-price {
            font-size: 18px;
            font-weight: 700;
            margin-bottom: 16px;
            color: var(--gray-900);
          }
          
          .product-actions {
            display: flex;
            gap: 8px;
          }
          
          .btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            background: var(--text-color);
            color: var(--bg-color);
            border: none;
            padding: 10px 16px;
            border-radius: 6px;
            font-size: 14px;
            font-weight: 500;
            text-decoration: none;
            transition: var(--transition);
            cursor: pointer;
            width: 100%;
          }
          
          .btn:hover {
            opacity: 0.9;
          }
          
          .btn-secondary {
            background: var(--bg-color);
            color: var(--text-color);
            border: 1px solid var(--border-color);
          }
          
          .btn-secondary:hover {
            background: var(--hover-color);
          }
          
          /* No results */
          .no-results {
            text-align: center;
            padding: 48px 24px;
            grid-column: 1 / -1;
          }
          
          .no-results h3 {
            font-size: 1.5rem;
            margin-bottom: 12px;
            color: var(--gray-800);
          }
          
          .no-results p {
            color: var(--gray-600);
            max-width: 500px;
            margin: 0 auto;
          }
          
          /* Footer */
          footer {
            margin-top: 64px;
            padding: 24px 0;
            border-top: 1px solid var(--border-color);
            font-size: 14px;
            color: var(--gray-600);
            text-align: center;
          }
          
          /* Responsive */
          @media (max-width: 768px) {
            .shop-controls {
              flex-direction: column;
              align-items: flex-start;
            }
            
            .search-box {
              max-width: 100%;
              width: 100%;
            }
            
            .products {
              grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
              gap: 24px;
            }
          }
          
          @media (max-width: 480px) {
            .products {
              grid-template-columns: 1fr;
            }
          }
        </style>
      </head>
      <body>
        ${isPreviewMode ? PreviewBanner() : ''}
        <header>
          <h1>MLSC Studio Shop</h1>
          <nav>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/sketchbooks">Sketchbooks</a></li>
              <li><a href="/paintings">Paintings</a></li>
              <li><a href="/editorial">Editorial</a></li>
              <li><a href="/shop" class="active">Shop</a></li>
              <li><a href="/pdf">PDF</a></li>
            </ul>
          </nav>
        </header>
        
        <div class="shop-header">
          <h2>Art Prints & Merchandise</h2>
          <p>Purchase original prints, books, and merchandise from MLSC Studio. Each item is carefully crafted to showcase our signature aesthetic and artistic vision.</p>
          
          <div class="shop-controls">
            <div class="filter-section">
              <button class="filter-button active">All</button>
              <button class="filter-button">Prints</button>
              <button class="filter-button">Books</button>
              <button class="filter-button">Accessories</button>
            </div>
            
            <div class="search-box">
              <input type="text" placeholder="Search products..." />
            </div>
          </div>
        </div>
          
          <div class="products">
            <div class="product">
            <div class="product-image">
              <img src="/static/mlsc-icon.svg" alt="Transit Map Print" />
              <div class="product-badge">Limited Edition</div>
            </div>
            <div class="product-details">
              <div class="product-category">Prints</div>
              <h3>Transit Map Print</h3>
              <p class="product-description">Limited edition print of NYC-inspired transit map with custom typography and detailed station markers.</p>
              <div class="product-price">$45.00</div>
              <div class="product-actions">
                <button class="btn">Add to Cart</button>
              </div>
            </div>
            </div>
            
            <div class="product">
            <div class="product-image">
              <img src="/static/mlsc-icon.svg" alt="Vinyl Record Journal" />
            </div>
            <div class="product-details">
              <div class="product-category">Books</div>
              <h3>Vinyl Record Journal</h3>
              <p class="product-description">Hardcover journal with vinyl-inspired design, featuring high-quality paper and lay-flat binding.</p>
              <div class="product-price">$28.00</div>
              <div class="product-actions">
                <button class="btn">Add to Cart</button>
              </div>
            </div>
            </div>
            
            <div class="product">
            <div class="product-image">
              <img src="/static/mlsc-icon.svg" alt="Urban Sketches Book" />
            </div>
            <div class="product-details">
              <div class="product-category">Books</div>
              <h3>Urban Sketches Book</h3>
              <p class="product-description">Collection of city sketches and drawings capturing the essence of urban life and architecture.</p>
              <div class="product-price">$35.00</div>
              <div class="product-actions">
                <button class="btn">Add to Cart</button>
              </div>
            </div>
            </div>
            
            <div class="product">
            <div class="product-image">
              <img src="/static/mlsc-icon.svg" alt="MLSC Studio Tote Bag" />
              <div class="product-badge">New</div>
            </div>
            <div class="product-details">
              <div class="product-category">Accessories</div>
              <h3>MLSC Studio Tote Bag</h3>
              <p class="product-description">Premium canvas tote with studio logo and original design. Perfect for everyday use.</p>
              <div class="product-price">$22.00</div>
              <div class="product-actions">
                <button class="btn">Add to Cart</button>
            </div>
          </div>
        </div>
          
          <div class="product">
            <div class="product-image">
              <img src="/static/mlsc-icon.svg" alt="MLSC Art Print Set" />
              <div class="product-badge">Best Seller</div>
            </div>
            <div class="product-details">
              <div class="product-category">Prints</div>
              <h3>MLSC Art Print Set</h3>
              <p class="product-description">Set of three complementary art prints showcasing our signature style and aesthetic.</p>
              <div class="product-price">$65.00</div>
              <div class="product-actions">
                <button class="btn">Add to Cart</button>
              </div>
            </div>
          </div>
          
          <div class="product">
            <div class="product-image">
              <img src="/static/mlsc-icon.svg" alt="Typography Poster" />
            </div>
            <div class="product-details">
              <div class="product-category">Prints</div>
              <h3>Typography Poster</h3>
              <p class="product-description">Minimalist typography poster featuring custom lettering and modern design principles.</p>
              <div class="product-price">$32.00</div>
              <div class="product-actions">
                <button class="btn">Add to Cart</button>
              </div>
            </div>
          </div>
        </div>
        
        <script>
          // Simple client-side filtering functionality
          document.addEventListener('DOMContentLoaded', function() {
            const filterButtons = document.querySelectorAll('.filter-button');
            const products = document.querySelectorAll('.product');
            const searchInput = document.querySelector('.search-box input');
            
            // Filter buttons click handler
            filterButtons.forEach(button => {
              button.addEventListener('click', () => {
                // Update active state
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                const filter = button.textContent.toLowerCase();
                
                // Filter products
                products.forEach(product => {
                  const category = product.querySelector('.product-category').textContent.toLowerCase();
                  
                  if (filter === 'all' || category.includes(filter)) {
                    product.style.display = 'flex';
                  } else {
                    product.style.display = 'none';
                  }
                });
              });
            });
            
            // Search functionality
            searchInput.addEventListener('input', () => {
              const searchTerm = searchInput.value.toLowerCase();
              
              products.forEach(product => {
                const title = product.querySelector('h3').textContent.toLowerCase();
                const description = product.querySelector('.product-description').textContent.toLowerCase();
                const category = product.querySelector('.product-category').textContent.toLowerCase();
                
                if (
                  title.includes(searchTerm) || 
                  description.includes(searchTerm) || 
                  category.includes(searchTerm)
                ) {
                  product.style.display = 'flex';
                } else {
                  product.style.display = 'none';
                }
              });
            });
          });
        </script>
        
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
