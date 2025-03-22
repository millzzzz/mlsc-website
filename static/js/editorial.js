// Editorial page API integration

// Constants
const API_URL = window.location.origin; // Same origin as the website

// DOM elements
let editorialGrid;
let articlesPreview;
let categoryButtons;
let loadingIndicator;
let errorMessage;

// Initialize when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Get DOM elements
  editorialGrid = document.getElementById('editorial-grid');
  articlesPreview = document.querySelector('.articles-preview');
  categoryButtons = document.querySelectorAll('.category-button');
  
  // Add loading indicator
  loadingIndicator = document.createElement('div');
  loadingIndicator.className = 'loading';
  loadingIndicator.textContent = 'Loading editorial content...';
  editorialGrid.appendChild(loadingIndicator);
  
  // Set up error message
  errorMessage = document.createElement('div');
  errorMessage.className = 'error';
  errorMessage.style.display = 'none';
  errorMessage.textContent = 'Failed to load editorial content. Please try again later.';
  editorialGrid.appendChild(errorMessage);
  
  // Set up category filtering
  setupCategoryFiltering();
  
  // Fetch editorial content
  fetchEditorialPosts();
});

// Fetch editorial posts from the API
async function fetchEditorialPosts() {
  try {
    const response = await fetch(`${API_URL}/api/editorial?where[status][equals]=published&depth=2`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch editorial posts: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Remove loading indicator
    loadingIndicator.remove();
    
    // Render the grid items
    renderEditorialGrid(data.docs);
    
    // Render the article previews
    renderArticleCards(data.docs.slice(0, 3)); // Show only the 3 most recent
  } catch (error) {
    console.error('Error fetching editorial posts:', error);
    loadingIndicator.remove();
    errorMessage.style.display = 'block';
  }
}

// Render the editorial grid items
function renderEditorialGrid(posts) {
  // Clear the existing content (except loading/error)
  Array.from(editorialGrid.children).forEach(child => {
    if (!child.classList.contains('loading') && !child.classList.contains('error')) {
      child.remove();
    }
  });
  
  // No posts found
  if (posts.length === 0) {
    const noResults = document.createElement('div');
    noResults.className = 'no-results';
    noResults.textContent = 'No editorial content found.';
    editorialGrid.appendChild(noResults);
    return;
  }
  
  // Create grid items for each post
  posts.forEach((post, index) => {
    // Determine aspect ratio class (cycle through options for variety)
    const aspectRatios = ['square', 'portrait', 'landscape', 'wide'];
    let aspectRatio;
    
    if (post.additionalImages && post.additionalImages.length > 0) {
      // Use the first additional image's aspect ratio
      aspectRatio = post.additionalImages[0].aspectRatio;
    } else {
      // Fallback to the cycle
      aspectRatio = aspectRatios[index % aspectRatios.length];
    }
    
    // Create the grid item
    const gridItem = document.createElement('div');
    gridItem.className = `grid-item ${aspectRatio}`;
    gridItem.dataset.category = post.category;
    
    // Create the link and image
    const link = document.createElement('a');
    link.href = `/editorial/${post.slug}`;
    
    const img = document.createElement('img');
    img.src = post.featuredImage?.url || '/static/mlsc-icon.svg';
    img.alt = post.title;
    img.loading = 'lazy';
    link.appendChild(img);
    
    // Create the overlay
    const overlay = document.createElement('div');
    overlay.className = 'grid-item-overlay';
    
    const title = document.createElement('h3');
    title.textContent = post.title;
    overlay.appendChild(title);
    
    // Format the date
    const date = new Date(post.publishedDate);
    const formattedDate = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    // Get the category display name
    const categoryMap = {
      'music-visual-art': 'Music & Visual Art',
      'urban-transit': 'Urban Transit',
      'sketchbooks': 'Sketchbooks',
      'design-principles': 'Design Principles'
    };
    
    const categoryLabel = categoryMap[post.category] || post.category;
    
    const meta = document.createElement('p');
    meta.textContent = `${categoryLabel} · ${formattedDate}`;
    overlay.appendChild(meta);
    
    link.appendChild(overlay);
    gridItem.appendChild(link);
    
    // Add to the grid
    editorialGrid.appendChild(gridItem);
  });
}

// Render the article cards
function renderArticleCards(posts) {
  // Clear the existing content
  while (articlesPreview.children.length > 1) { // Keep the heading
    articlesPreview.removeChild(articlesPreview.lastChild);
  }
  
  // Create article cards for each post
  posts.forEach(post => {
    // Create the article card
    const card = document.createElement('div');
    card.className = 'article-card';
    
    // Image section
    const imageSection = document.createElement('div');
    imageSection.className = 'article-image';
    
    const img = document.createElement('img');
    img.src = post.featuredImage?.url || '/static/mlsc-icon.svg';
    img.alt = post.title;
    imageSection.appendChild(img);
    
    // Content section
    const contentSection = document.createElement('div');
    contentSection.className = 'article-content';
    
    const title = document.createElement('h3');
    title.textContent = post.title;
    contentSection.appendChild(title);
    
    // Format the date
    const date = new Date(post.publishedDate);
    const formattedDate = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    // Get the category display name
    const categoryMap = {
      'music-visual-art': 'Music & Visual Art',
      'urban-transit': 'Urban Transit',
      'sketchbooks': 'Sketchbooks',
      'design-principles': 'Design Principles'
    };
    
    const categoryLabel = categoryMap[post.category] || post.category;
    
    const meta = document.createElement('div');
    meta.className = 'article-meta';
    meta.innerHTML = `
      <span>${formattedDate}</span>
      <span>${post.author}</span>
      <span>${categoryLabel}</span>
    `;
    contentSection.appendChild(meta);
    
    const summary = document.createElement('div');
    summary.className = 'article-summary';
    summary.textContent = post.summary;
    contentSection.appendChild(summary);
    
    const readMore = document.createElement('a');
    readMore.className = 'read-more';
    readMore.href = `/editorial/${post.slug}`;
    readMore.textContent = 'Read more';
    contentSection.appendChild(readMore);
    
    // Add to card
    card.appendChild(imageSection);
    card.appendChild(contentSection);
    
    // Add to the preview section
    articlesPreview.appendChild(card);
  });
}

// Set up category filtering functionality
function setupCategoryFiltering() {
  categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Update active state
      categoryButtons.forEach(b => b.classList.remove('active'));
      button.classList.add('active');
      
      const category = button.dataset.category;
      const gridItems = document.querySelectorAll('.grid-item');
      
      if (category === 'all') {
        // Show all items
        gridItems.forEach(item => {
          item.style.display = 'block';
        });
      } else {
        // Filter items by category
        gridItems.forEach(item => {
          const itemCategory = item.dataset.category || '';
          
          if (itemCategory === category) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      }
    });
  });
} 