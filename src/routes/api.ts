import { Hono } from 'hono';
import { getEditorialPosts, getEditorialPostBySlug, getEditorialPostsByCategory, getGalleryPosts } from '../cms/api';

// API routes for fetching CMS data
const apiRoutes = new Hono();

// Get all editorial posts
apiRoutes.get('/editorial', async (c) => {
  const posts = await getEditorialPosts();
  return c.json({ posts });
});

// Get editorial posts by category
apiRoutes.get('/editorial/category/:category', async (c) => {
  const category = c.req.param('category');
  const posts = await getEditorialPostsByCategory(category);
  return c.json({ posts });
});

// Get single editorial post by slug
apiRoutes.get('/editorial/:slug', async (c) => {
  const slug = c.req.param('slug');
  const post = await getEditorialPostBySlug(slug);
  
  if (!post) {
    return c.json({ error: 'Post not found' }, 404);
  }
  
  return c.json({ post });
});

// Get only gallery posts
apiRoutes.get('/gallery', async (c) => {
  const posts = await getGalleryPosts();
  return c.json({ posts });
});

export { apiRoutes }; 