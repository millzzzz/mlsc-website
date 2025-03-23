import React, { useState, useEffect, useRef } from 'react';
import './MasonryGrid.css';

// Define types for editorial content
export type EditorialImage = {
  url: string;
  alt?: string;
  width: number;
  height: number;
};

export type GalleryImage = {
  image: EditorialImage;
  aspectRatio: 'portrait' | 'landscape' | 'square';
};

export type Editorial = {
  id: string;
  title: string;
  slug: string;
  author: string;
  publishedDate: string;
  category: string;
  summary?: string;
  content?: string;
  featuredImage: EditorialImage;
  galleryImages?: GalleryImage[];
};

type MasonryGridProps = {
  items: Editorial[];
  selectedCategory: string;
};

// MasonryGrid component that arranges items in a masonry layout
const MasonryGrid: React.FC<MasonryGridProps> = ({ items, selectedCategory }): React.ReactElement => {
  const [filteredItems, setFilteredItems] = useState<Editorial[]>([]);

  // Filter items based on selected category
  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredItems(items);
    } else {
      setFilteredItems(items.filter(item => item.category === selectedCategory));
    }
  }, [items, selectedCategory]);

  return (
    <div className="masonry-container">
      {filteredItems.map((item) => {
        // Determine which image to display
        const displayImage = item.galleryImages && item.galleryImages.length > 0 
          ? item.galleryImages[0].image 
          : item.featuredImage;
        
        // Get aspect ratio from gallery or default to square
        const aspectRatio = item.galleryImages && item.galleryImages.length > 0 
          ? item.galleryImages[0].aspectRatio 
          : 'square';
          
        return (
          <div 
            key={item.id} 
            className={`masonry-item ${aspectRatio}`}
            data-category={item.category}
          >
            <a href={`/editorial/${item.slug}`} className="editorial-link">
              <div className="editorial-card">
                <div className="editorial-image">
                  <img 
                    src={displayImage.url} 
                    alt={displayImage.alt || item.title} 
                    loading="lazy" 
                  />
                </div>
              </div>
            </a>
          </div>
        );
      })}
    </div>
  );
};

export default MasonryGrid; 