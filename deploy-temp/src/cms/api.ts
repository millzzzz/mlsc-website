// API utilities for fetching content from Payload CMS

// Typescript interfaces for our content types
export interface MediaType {
  id: string;
  alt: string;
  caption?: string;
  url: string;
  width: number;
  height: number;
  filename: string;
  mimeType: string;
  filesize: number;
  createdAt: string;
  updatedAt: string;
}

export interface EditorialImage {
  image: MediaType;
  aspectRatio: 'square' | 'portrait' | 'landscape' | 'wide';
}

export interface EditorialPost {
  id: string;
  title: string;
  author: string;
  publishedDate: string;
  category: string;
  featuredImage: MediaType;
  additionalImages?: EditorialImage[];
  summary: string;
  content: any; // Rich text content
  slug: string;
  status: 'draft' | 'published';
  createdAt: string;
  updatedAt: string;
}

// API base URL
const API_URL = process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000';

// Fetch all published editorial posts
export async function getEditorialPosts(): Promise<EditorialPost[]> {
  try {
    const response = await fetch(`${API_URL}/api/editorial?where[status][equals]=published&depth=2`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch editorial posts: ${response.status}`);
    }
    
    const data = await response.json();
    return data.docs;
  } catch (error) {
    console.error('Error fetching editorial posts:', error);
    return [];
  }
}

// Fetch a single editorial post by slug
export async function getEditorialPostBySlug(slug: string): Promise<EditorialPost | null> {
  try {
    const response = await fetch(
      `${API_URL}/api/editorial?where[slug][equals]=${slug}&where[status][equals]=published&depth=2`
    );
    
    if (!response.ok) {
      throw new Error(`Failed to fetch editorial post: ${response.status}`);
    }
    
    const data = await response.json();
    return data.docs.length > 0 ? data.docs[0] : null;
  } catch (error) {
    console.error(`Error fetching editorial post with slug '${slug}':`, error);
    return null;
  }
}

// Fetch all published editorial posts for a specific category
export async function getEditorialPostsByCategory(category: string): Promise<EditorialPost[]> {
  try {
    const response = await fetch(
      `${API_URL}/api/editorial?where[category][equals]=${category}&where[status][equals]=published&depth=2`
    );
    
    if (!response.ok) {
      throw new Error(`Failed to fetch editorial posts for category '${category}': ${response.status}`);
    }
    
    const data = await response.json();
    return data.docs;
  } catch (error) {
    console.error(`Error fetching editorial posts for category '${category}':`, error);
    return [];
  }
} 