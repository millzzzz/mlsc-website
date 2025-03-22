import payload from 'payload';

// Type definitions for editorial posts
export type EditorialPost = {
  id: string;
  title: string;
  slug: string;
  author: string;
  publishedDate: string;
  category: string;
  displayType: 'gallery' | 'article';
  featuredImage: {
    url: string;
    alt: string;
    caption?: string;
  };
  summary?: string;
  content?: any; // Rich text content
  galleryImages?: Array<{
    image: {
      url: string;
      alt: string;
    };
    caption?: string;
    aspectRatio: 'square' | 'portrait' | 'landscape' | 'wide' | 'full-width';
    priority: number;
  }>;
};

// Get all editorial posts
export const getEditorialPosts = async (): Promise<EditorialPost[]> => {
  try {
    const response = await payload.find({
      collection: 'editorials',
      where: {
        status: {
          equals: 'published',
        },
      },
      sort: '-publishedDate',
      depth: 2, // To resolve relationships like media
    });

    // Transform the response to match our expected format
    return response.docs.map(transformEditorialPost);
  } catch (error) {
    console.error('Error fetching editorial posts:', error);
    return [];
  }
};

// Get a single editorial post by slug
export const getEditorialPostBySlug = async (slug: string): Promise<EditorialPost | null> => {
  try {
    const response = await payload.find({
      collection: 'editorials',
      where: {
        slug: {
          equals: slug,
        },
        status: {
          equals: 'published',
        },
      },
      depth: 2,
    });

    if (response.docs.length === 0) {
      return null;
    }

    return transformEditorialPost(response.docs[0]);
  } catch (error) {
    console.error(`Error fetching editorial post with slug ${slug}:`, error);
    return null;
  }
};

// Get editorial posts by category
export const getEditorialPostsByCategory = async (category: string): Promise<EditorialPost[]> => {
  try {
    const response = await payload.find({
      collection: 'editorials',
      where: {
        category: {
          equals: category,
        },
        status: {
          equals: 'published',
        },
      },
      sort: '-publishedDate',
      depth: 2,
    });

    return response.docs.map(transformEditorialPost);
  } catch (error) {
    console.error(`Error fetching editorial posts for category ${category}:`, error);
    return [];
  }
};

// Helper function to transform Payload response to our expected format
function transformEditorialPost(doc: any): EditorialPost {
  return {
    id: doc.id,
    title: doc.title,
    slug: doc.slug,
    author: doc.author,
    publishedDate: doc.publishedDate,
    category: doc.category,
    displayType: doc.displayType || 'gallery',
    featuredImage: {
      url: doc.featuredImage?.url || '/static/placeholder.jpg',
      alt: doc.featuredImage?.alt || doc.title,
      caption: doc.featuredImage?.caption,
    },
    summary: doc.summary,
    content: doc.content,
    galleryImages: doc.galleryImages?.map((item: any) => ({
      image: {
        url: item.image?.url || '/static/placeholder.jpg',
        alt: item.image?.alt || 'Gallery image',
      },
      caption: item.caption,
      aspectRatio: item.aspectRatio || 'square',
      priority: item.priority || 0,
    })),
  };
}