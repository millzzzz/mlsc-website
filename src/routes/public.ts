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
publicRoutes.get('/editorial', async (c) => {
  const isPreviewMode = c.get('isPreviewMode') || false;
  
  // Mock editorial posts instead of fetching from CMS
  const posts = [
    {
      id: '1',
      title: 'Example Editorial Post 1',
      slug: 'example-post-1',
      author: 'John Doe',
      publishedDate: new Date().toISOString(),
      category: 'design-principles',
      displayType: 'gallery',
      featuredImage: {
        url: '/static/mlsc-logo.png',
        alt: 'Placeholder Image 1',
        width: 800,
        height: 600
      },
      summary: 'This is a sample editorial post for testing purposes.',
      galleryImages: [
        {
          image: {
            url: '/static/mlsc-logo.png',
            alt: 'Gallery Image 1',
            width: 800,
            height: 600
          },
          aspectRatio: 'landscape'
        }
      ]
    },
    {
      id: '2',
      title: 'Example Editorial Post 2',
      slug: 'example-post-2',
      author: 'Jane Smith',
      publishedDate: new Date().toISOString(),
      category: 'music-visual-art',
      displayType: 'gallery',
      featuredImage: {
        url: '/static/mlsc-logo.png',
        alt: 'Placeholder Image 2',
        width: 600,
        height: 800
      },
      summary: 'Another sample editorial post for testing.',
      galleryImages: [
        {
          image: {
            url: '/static/mlsc-logo.png',
            alt: 'Gallery Image 2',
            width: 600,
            height: 800
          },
          aspectRatio: 'portrait'
        }
      ]
    },
    {
      id: '3',
      title: 'Example Editorial Post 3',
      slug: 'example-post-3',
      author: 'Alex Johnson',
      publishedDate: new Date().toISOString(),
      category: 'sketchbooks',
      displayType: 'gallery',
      featuredImage: {
        url: '/static/mlsc-logo.png',
        alt: 'Placeholder Image 3',
        width: 800,
        height: 800
      },
      summary: 'A third sample editorial post for testing.',
      galleryImages: [
        {
          image: {
            url: '/static/mlsc-logo.png',
            alt: 'Gallery Image 3',
            width: 800,
            height: 800
          },
          aspectRatio: 'square'
        }
      ]
    }
  ];
  
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
          
          footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #eee;
            font-size: 0.8rem;
            color: #777;
            text-align: center;
          }
          
          /* Simple masonry grid */
          .masonry-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            grid-gap: 20px;
            grid-auto-flow: dense;
          }
          
          .grid-item {
            position: relative;
            overflow: hidden;
            background-color: #f8f8f8;
            border-radius: 4px;
            transition: transform 0.3s ease;
          }
          
          .grid-item:hover {
            transform: translateY(-5px);
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
          }
          
          .grid-item img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
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
            background: rgba(255, 255, 255, 0.9);
            padding: 15px;
            transform: translateY(100%);
            transition: transform 0.3s ease;
          }
          
          .grid-item:hover .grid-item-overlay {
            transform: translateY(0);
          }
          
          .grid-item-overlay h3 {
            margin: 0 0 5px;
            font-size: 18px;
          }
          
          .grid-item-overlay p {
            margin: 0;
            font-size: 14px;
            color: #666;
          }
          
          .grid-item.portrait {
            grid-row: span 2;
          }
          
          .grid-item.landscape {
            grid-column: span 1;
          }
          
          .grid-item.square {
            aspect-ratio: 1/1;
          }
          
          .grid-item.wide {
            grid-column: span 2;
          }
          
          @media (max-width: 768px) {
            .masonry-grid {
              grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            }
            
            .grid-item.wide {
              grid-column: span 1;
            }
          }
          
          @media (max-width: 480px) {
            .masonry-grid {
              grid-template-columns: 1fr;
            }
          }
        </style>
        <!-- Import React and our styles -->
        <link rel="stylesheet" href="/public/scripts/editorial.css">
        <script src="https://unpkg.com/react@18/umd/react.production.min.js" crossorigin></script>
        <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js" crossorigin></script>
        <script src="https://unpkg.com/react-masonry-css@1.0.16/dist/react-masonry-css.min.js" crossorigin></script>
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
        
        <!-- React app container -->
        <div id="editorial-app">
          <!-- Fallback content if React fails to load -->
          <div class="masonry-grid">
            <div class="grid-item square" data-category="design-principles">
              <a href="#">
                <img src="/static/mlsc-logo.png" alt="Artwork 1" loading="lazy" />
                <div class="grid-item-overlay">
                  <h3>Artwork 1</h3>
                  <p>Design Principles</p>
                </div>
              </a>
            </div>
            <div class="grid-item portrait" data-category="music-visual-art">
              <a href="#">
                <img src="/static/mlsc-logo.png" alt="Artwork 2" loading="lazy" />
                <div class="grid-item-overlay">
                  <h3>Artwork 2</h3>
                  <p>Music Visual Art</p>
                </div>
              </a>
            </div>
            <div class="grid-item landscape" data-category="sketchbooks">
              <a href="#">
                <img src="/static/mlsc-logo.png" alt="Artwork 3" loading="lazy" />
                <div class="grid-item-overlay">
                  <h3>Artwork 3</h3>
                  <p>Sketchbooks</p>
                </div>
              </a>
            </div>
            <div class="grid-item wide" data-category="urban-transit">
              <a href="#">
                <img src="/static/mlsc-logo.png" alt="Artwork 4" loading="lazy" />
                <div class="grid-item-overlay">
                  <h3>Artwork 4</h3>
                  <p>Urban Transit</p>
                </div>
              </a>
            </div>
            <div class="grid-item square" data-category="music-visual-art">
              <a href="#">
                <img src="/static/mlsc-logo.png" alt="Artwork 5" loading="lazy" />
                <div class="grid-item-overlay">
                  <h3>Artwork 5</h3>
                  <p>Music Visual Art</p>
                </div>
              </a>
            </div>
            <div class="grid-item portrait" data-category="design-principles">
              <a href="#">
                <img src="/static/mlsc-logo.png" alt="Artwork 6" loading="lazy" />
                <div class="grid-item-overlay">
                  <h3>Artwork 6</h3>
                  <p>Design Principles</p>
                </div>
              </a>
            </div>
            <div class="grid-item landscape" data-category="urban-transit">
              <a href="#">
                <img src="/static/mlsc-logo.png" alt="Artwork 7" loading="lazy" />
                <div class="grid-item-overlay">
                  <h3>Artwork 7</h3>
                  <p>Urban Transit</p>
                </div>
              </a>
            </div>
            <div class="grid-item wide" data-category="sketchbooks">
              <a href="#">
                <img src="/static/mlsc-logo.png" alt="Artwork 8" loading="lazy" />
                <div class="grid-item-overlay">
                  <h3>Artwork 8</h3>
                  <p>Sketchbooks</p>
                </div>
              </a>
            </div>
            <div class="grid-item square" data-category="urban-transit">
              <a href="#">
                <img src="/static/mlsc-logo.png" alt="Artwork 9" loading="lazy" />
                <div class="grid-item-overlay">
                  <h3>Artwork 9</h3>
                  <p>Urban Transit</p>
                </div>
              </a>
            </div>
            <div class="grid-item portrait" data-category="sketchbooks">
              <a href="#">
                <img src="/static/mlsc-logo.png" alt="Artwork 10" loading="lazy" />
                <div class="grid-item-overlay">
                  <h3>Artwork 10</h3>
                  <p>Sketchbooks</p>
                </div>
              </a>
            </div>
            <div class="grid-item landscape" data-category="music-visual-art">
              <a href="#">
                <img src="/static/mlsc-logo.png" alt="Artwork 11" loading="lazy" />
                <div class="grid-item-overlay">
                  <h3>Artwork 11</h3>
                  <p>Music Visual Art</p>
                </div>
              </a>
            </div>
            <div class="grid-item wide" data-category="design-principles">
              <a href="#">
                <img src="/static/mlsc-logo.png" alt="Artwork 12" loading="lazy" />
                <div class="grid-item-overlay">
                  <h3>Artwork 12</h3>
                  <p>Design Principles</p>
                </div>
              </a>
            </div>
          </div>
        </div>
        
        <!-- Load editorial data and render the React app -->
        <script>
          const posts = ${JSON.stringify(posts)};
          const isPreviewMode = ${isPreviewMode};
          
          // Simple masonry grid fallback if React fails to load
          document.addEventListener('DOMContentLoaded', function() {
            // Check if React loaded correctly
            if (typeof React === 'undefined' || typeof ReactDOM === 'undefined') {
              console.error('React or ReactDOM failed to load');
              
              // Create a simple grid fallback
              const container = document.getElementById('editorial-app');
              let gridHTML = '<div class="masonry-grid">';
              
              posts.forEach(post => {
                const displayImage = post.galleryImages && post.galleryImages.length > 0 
                  ? post.galleryImages[0].image 
                  : post.featuredImage;
                
                const aspectRatio = post.galleryImages && post.galleryImages.length > 0 
                  ? post.galleryImages[0].aspectRatio 
                  : 'square';
                
                gridHTML += \`
                  <div class="grid-item \${aspectRatio}" data-category="\${post.category}">
                    <a href="/editorial/\${post.slug}">
                      <img src="\${displayImage.url}" alt="\${displayImage.alt || post.title}" loading="lazy" />
                      <div class="grid-item-overlay">
                        <h3>\${post.title}</h3>
                        <p>\${post.category.replace(/-/g, ' ').replace(/\\b\\w/g, function(l) { return l.toUpperCase(); })}</p>
                      </div>
                    </a>
                  </div>
                \`;
              });
              
              gridHTML += '</div>';
              container.innerHTML = gridHTML;
            } else {
              // If React is available, load our component script
              const script = document.createElement('script');
              script.src = '/public/scripts/editorial.js';
              script.onload = function() {
                // Call the render function once the script is loaded
                if (typeof window.renderEditorialPage === 'function') {
                  window.renderEditorialPage(posts, isPreviewMode);
                } else {
                  console.error('renderEditorialPage function not found');
                }
              };
              document.body.appendChild(script);
            }
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
publicRoutes.get('/editorial/:slug', async (c) => {
  const isPreviewMode = c.get('isPreviewMode') || false;
  const slug = c.req.param('slug');
  
  // Mock post data based on slug
  const mockPosts: Record<string, any> = {
    'example-post-1': {
      id: '1',
      title: 'Example Editorial Post 1',
      slug: 'example-post-1',
      author: 'John Doe',
      publishedDate: new Date().toISOString(),
      category: 'design-principles',
      displayType: 'gallery',
      featuredImage: {
        url: '/static/mlsc-logo.png',
        alt: 'Placeholder Image 1',
        width: 800,
        height: 600
      },
      summary: 'This is a sample editorial post for testing purposes.',
      content: '<p>This is the full content of the editorial post. It can include rich text formatting.</p>',
      galleryImages: [
        {
          image: {
            url: '/static/mlsc-logo.png',
            alt: 'Gallery Image 1',
            width: 800,
            height: 600
          },
          aspectRatio: 'landscape'
        }
      ]
    },
    'example-post-2': {
      id: '2',
      title: 'Example Editorial Post 2',
      slug: 'example-post-2',
      author: 'Jane Smith',
      publishedDate: new Date().toISOString(),
      category: 'music-visual-art',
      displayType: 'gallery',
      featuredImage: {
        url: '/static/mlsc-logo.png',
        alt: 'Placeholder Image 2',
        width: 600,
        height: 800
      },
      summary: 'Another sample editorial post for testing.',
      content: '<p>This is the full content of the second editorial post.</p>',
      galleryImages: [
        {
          image: {
            url: '/static/mlsc-logo.png',
            alt: 'Gallery Image 2',
            width: 600,
            height: 800
          },
          aspectRatio: 'portrait'
        }
      ]
    },
    'example-post-3': {
      id: '3',
      title: 'Example Editorial Post 3',
      slug: 'example-post-3',
      author: 'Alex Johnson',
      publishedDate: new Date().toISOString(),
      category: 'sketchbooks',
      displayType: 'gallery',
      featuredImage: {
        url: '/static/mlsc-logo.png',
        alt: 'Placeholder Image 3',
        width: 800,
        height: 800
      },
      summary: 'A third sample editorial post for testing.',
      content: '<p>This is the full content of the third editorial post.</p>',
      galleryImages: [
        {
          image: {
            url: '/static/mlsc-logo.png',
            alt: 'Gallery Image 3',
            width: 800,
            height: 800
          },
          aspectRatio: 'square'
        }
      ]
    }
  };
  
  // Get the post data for the requested slug
  const post = mockPosts[slug];
  
  // If post not found, return 404
  if (!post) {
    return c.html(html`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Not Found - MLSC Studio</title>
          <style>
            body {
              font-family: 'Helvetica Neue', Arial, sans-serif;
              max-width: 800px;
              margin: 0 auto;
              padding: 40px 20px;
              text-align: center;
            }
            h1 {
              font-size: 2rem;
            }
            a {
              color: #333;
              text-decoration: none;
              border-bottom: 1px solid #333;
              padding-bottom: 2px;
            }
          </style>
        </head>
        <body>
          <h1>Editorial Post Not Found</h1>
          <p>Sorry, we couldn't find the editorial post you're looking for.</p>
          <p><a href="/editorial">Return to Editorial</a></p>
        </body>
      </html>
    `, 404);
  }
  
  // Format the date
  const formattedDate = new Date(post.publishedDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  // Sort gallery images by priority if they exist
  const galleryImages = post.galleryImages ? 
    [...post.galleryImages].sort((a, b) => a.priority - b.priority) : 
    [];
  
  return c.html(html`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${post.title} - MLSC Studio</title>
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
          }
          
          .back-link {
            display: inline-flex;
            align-items: center;
            margin-bottom: 20px;
            color: #555;
            text-decoration: none;
            font-size: 14px;
            transition: color 0.2s ease;
          }
          
          .back-link:hover {
            color: #000;
          }
          
          .back-link svg {
            width: 16px;
            height: 16px;
            margin-right: 8px;
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
            display: block;
          }
          
          /* Gallery grid styling */
          .gallery-grid {
            display: grid;
            grid-template-columns: repeat(1, 1fr);
            grid-gap: 20px;
            margin: 40px 0;
          }
          
          @media (min-width: 640px) {
            .gallery-grid {
              grid-template-columns: repeat(2, 1fr);
            }
          }
          
          @media (min-width: 1024px) {
            .gallery-grid {
              grid-template-columns: repeat(3, 1fr);
            }
          }
          
          .gallery-item {
            break-inside: avoid;
            position: relative;
          }
          
          .gallery-item img {
            width: 100%;
            height: auto;
            display: block;
            transition: transform 0.3s ease;
          }
          
          .gallery-item:hover img {
            transform: scale(1.02);
          }
          
          .gallery-item.portrait {
            grid-row: span 2;
          }
          
          .gallery-item.landscape {
            grid-column: span 1;
          }
          
          .gallery-item.square {
            aspect-ratio: 1/1;
          }
          
          .gallery-item.wide {
            grid-column: span 2;
          }
          
          .gallery-item.full-width {
            grid-column: 1 / -1;
          }
          
          .caption {
            margin-top: 8px;
            font-size: 0.85rem;
            color: #555;
            font-style: italic;
          }
          
          /* Article content styling */
          .article-content {
            max-width: 800px;
            margin: 0 auto;
            font-size: 1.1rem;
            line-height: 1.7;
          }
          
          .article-content p {
            margin-bottom: 1.5rem;
          }
          
          .article-content h2 {
            margin-top: 2.5rem;
            margin-bottom: 1rem;
            font-size: 1.8rem;
          }
          
          .article-content h3 {
            margin-top: 2rem;
            margin-bottom: 0.8rem;
            font-size: 1.5rem;
          }
          
          .article-content a {
            color: #333;
            text-decoration: underline;
            text-decoration-thickness: 1px;
            text-underline-offset: 2px;
          }
          
          .article-content a:hover {
            text-decoration-thickness: 2px;
          }
          
          .article-content ul, .article-content ol {
            margin-bottom: 1.5rem;
            padding-left: 1.5rem;
          }
          
          .article-content li {
            margin-bottom: 0.5rem;
          }
          
          .article-content blockquote {
            margin: 2rem 0;
            padding: 1rem 1.5rem;
            border-left: 4px solid #333;
            background-color: #f8f8f8;
            font-style: italic;
          }
          
          .article-content blockquote p:last-child {
            margin-bottom: 0;
          }
          
          .article-content blockquote {
            margin: 2rem 0;
            padding: 1rem 1.5rem;
            border-left: 4px solid #333;
            background-color: #f8f8f8;
            font-style: italic;
          }
          
          .article-content blockquote p:last-child {
            margin-bottom: 0;
          }
          
          footer {
            margin-top: 60px;
            padding-top: 20px;
            border-top: 1px solid #eee;
            text-align: center;
            font-size: 0.9rem;
            color: #777;
          }
        </style>
      </head>
      <body>
        ${isPreviewMode ? PreviewBanner() : ''}
        <header>
          <a href="/editorial" class="back-link">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
            Back to Editorial
          </a>
          
          <div class="article-header">
            <h1>${post.title}</h1>
            <div class="article-meta">
              <span>${formattedDate}</span>
              <span>${post.author}</span>
              <span>${post.category}</span>
            </div>
          </div>
          
          <div class="article-featured-image">
            <img src="${post.featuredImage.url}" alt="${post.featuredImage.alt}" />
            ${post.featuredImage.caption ? html`<div class="caption">${post.featuredImage.caption}</div>` : ''}
          </div>
        </header>
        
        <!-- Gallery grid for images -->
        ${galleryImages.length > 0 ? html`
          <div class="gallery-grid">
            ${galleryImages.map(item => html`
              <div class="gallery-item ${item.aspectRatio}">
                <img src="${item.image.url}" alt="${item.image.alt}" loading="lazy" />
                ${item.caption ? html`<div class="caption">${item.caption}</div>` : ''}
              </div>
            `).join('')}
          </div>
        ` : ''}
        
        <!-- Article content for 'article' type posts -->
        ${post.displayType === 'article' && post.content ? html`
          <div class="article-content">
            <!-- This would typically use a rich text renderer -->
            ${typeof post.content === 'string' ? post.content : JSON.stringify(post.content)}
          </div>
        ` : ''}
        
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
            background-color: #333;
            color: white;
            border-color: #333;
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

// Helper function to generate dummy posts for visualization
function generateDummyPosts() {
  const categories = ['music-visual-art', 'urban-transit', 'sketchbooks', 'design-principles'];
  const aspectRatios = ['square', 'portrait', 'landscape', 'wide', 'full-width'] as const;
  
  return Array.from({ length: 12 }, (_, i) => ({
    id: `dummy-${i}`,
    title: `Sample Post ${i + 1}`,
    slug: `sample-post-${i + 1}`,
    author: 'MLSC Studio',
    publishedDate: new Date().toISOString(),
    category: categories[i % categories.length],
    displayType: i % 3 === 0 ? 'article' : 'gallery' as 'gallery' | 'article',
    featuredImage: {
      url: `/static/placeholder-${(i % 5) + 1}.jpg`,
      alt: `Placeholder image ${i + 1}`,
      caption: 'Sample image',
    },
    summary: 'This is a placeholder post to demonstrate the editorial grid layout.',
    content: null,
    galleryImages: Array.from({ length: 3 }, (_, j) => ({
      image: {
        url: `/static/placeholder-${((i + j) % 5) + 1}.jpg`,
        alt: `Gallery image ${j + 1}`,
      },
      caption: `Image ${j + 1}`,
      aspectRatio: aspectRatios[(i + j) % aspectRatios.length],
      priority: j,
    })),
  }));
}

export { publicRoutes };
