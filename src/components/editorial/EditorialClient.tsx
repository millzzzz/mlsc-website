import React from 'react';
import { createRoot } from 'react-dom/client';
import EditorialPage from './EditorialPage';
import { Editorial } from './MasonryGrid';

// Add global interface augmentation for window
declare global {
  interface Window {
    renderEditorialPage: (posts: Editorial[], isPreviewMode: boolean) => void;
  }
}

// Hydration function for client-side rendering
export function hydrateEditorialPage(elementId: string, posts: Editorial[], isPreviewMode: boolean = false): void {
  // Find the container element
  const container = document.getElementById(elementId);
  if (!container) {
    console.error(`Container with ID '${elementId}' not found`);
    return;
  }

  try {
    // Create a root and render the EditorialPage component
    const root = createRoot(container);
    root.render(
      <EditorialPage posts={posts} isPreviewMode={isPreviewMode} />
    );
    console.log('Editorial page rendered successfully');
  } catch (error) {
    console.error('Error rendering editorial page:', error);
    
    // Fallback to simpler rendering if React fails
    fallbackRender(container, posts);
  }
}

// Fallback rendering function if React component fails
function fallbackRender(container: HTMLElement, posts: Editorial[]): void {
  let html = '<div class="editorial-page">';
  
  // Header
  html += '<div class="editorial-header"><h1>Editorial</h1></div>';
  
  // Navigation
  html += `
    <nav class="editorial-nav">
      <a href="/" class="nav-link">HOME</a>
      <a href="/sketchbooks" class="nav-link">SKETCHBOOKS</a>
      <a href="/paintings" class="nav-link">PAINTINGS</a>
      <a href="/editorial" class="nav-link active">EDITORIAL</a>
      <a href="/shop" class="nav-link">SHOP</a>
      <a href="/pdf" class="nav-link">PDF</a>
    </nav>
  `;
  
  // Categories
  html += '<div class="categories">';
  html += '<button class="category-button active" data-category="all">All</button>';
  html += '<button class="category-button" data-category="music-visual-art">Music & Visual Art</button>';
  html += '<button class="category-button" data-category="urban-transit">Urban Transit</button>';
  html += '<button class="category-button" data-category="sketchbooks">Sketchbooks</button>';
  html += '<button class="category-button" data-category="design-principles">Design Principles</button>';
  html += '</div>';
  
  // Masonry Grid
  html += '<div class="masonry-container">';
  
  posts.forEach(post => {
    const displayImage = post.galleryImages && post.galleryImages.length > 0 
      ? post.galleryImages[0].image 
      : post.featuredImage;
    
    const aspectRatio = post.galleryImages && post.galleryImages.length > 0 
      ? post.galleryImages[0].aspectRatio 
      : 'square';
    
    html += `
      <div class="masonry-item ${aspectRatio}" data-category="${post.category}">
        <a href="/editorial/${post.slug}" class="editorial-link">
          <div class="editorial-card">
            <div class="editorial-image">
              <img src="${displayImage.url}" alt="${displayImage.alt || post.title}" loading="lazy" />
            </div>
          </div>
        </a>
      </div>
    `;
  });
  
  html += '</div>';
  
  // Footer
  html += `
    <footer class="editorial-footer">
      <p>© 2025 MLSC Studio. All rights reserved.</p>
    </footer>
  `;
  
  html += '</div>';
  container.innerHTML = html;
  
  // Add event listeners for category filtering
  setTimeout(() => {
    const buttons = container.querySelectorAll('.category-button');
    const items = container.querySelectorAll('.masonry-item');
    
    buttons.forEach(button => {
      button.addEventListener('click', function() {
        // Remove active class from all buttons
        buttons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        const category = (button as HTMLElement).dataset.category || 'all';
        
        // Show/hide grid items based on category
        items.forEach(item => {
          if (category === 'all' || (item as HTMLElement).dataset.category === category) {
            (item as HTMLElement).style.display = 'block';
          } else {
            (item as HTMLElement).style.display = 'none';
          }
        });
      });
    });
  }, 100);
}

// Function to be called from the page's script tag
window.renderEditorialPage = (posts: Editorial[], isPreviewMode: boolean = false): void => {
  hydrateEditorialPage('editorial-app', posts, isPreviewMode);
}; 