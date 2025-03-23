// Export the client-side rendering function
import { hydrateEditorialPage } from './components/editorial/EditorialClient';

// Add to window object for direct access from HTML
if (typeof window !== 'undefined') {
  window.renderEditorialPage = hydrateEditorialPage.bind(null, 'editorial-app');
}

export { hydrateEditorialPage }; 