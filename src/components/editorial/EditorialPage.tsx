import React, { useState, useEffect } from 'react';
import MasonryGrid, { Editorial } from './MasonryGrid';
import './EditorialPage.css';

type EditorialPageProps = {
  posts: Editorial[];
  isPreviewMode?: boolean;
};

const EditorialPage: React.FC<EditorialPageProps> = ({ posts, isPreviewMode = false }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [categories, setCategories] = useState<string[]>([]);

  // Extract unique categories from posts
  useEffect(() => {
    if (posts && posts.length > 0) {
      const uniqueCategories = Array.from(new Set(posts.map(post => post.category)));
      setCategories(uniqueCategories);
    }
  }, [posts]);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  // Format category for display
  const formatCategoryName = (category: string) => {
    return category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <div className={`editorial-page ${isPreviewMode ? 'preview-mode' : ''}`}>
      <div className="editorial-header">
        <h1>Editorial</h1>
      </div>

      <nav className="editorial-nav">
        <a href="/" className="nav-link">HOME</a>
        <a href="/sketchbooks" className="nav-link">SKETCHBOOKS</a>
        <a href="/paintings" className="nav-link">PAINTINGS</a>
        <a href="/editorial" className="nav-link active">EDITORIAL</a>
        <a href="/shop" className="nav-link">SHOP</a>
        <a href="/pdf" className="nav-link">PDF</a>
      </nav>

      <div className="categories">
        <button
          className={`category-button ${selectedCategory === 'all' ? 'active' : ''}`}
          onClick={() => handleCategorySelect('all')}
        >
          All
        </button>
        
        {categories.map((category) => (
          <button
            key={category}
            className={`category-button ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => handleCategorySelect(category)}
          >
            {formatCategoryName(category)}
          </button>
        ))}
      </div>

      {posts && posts.length > 0 ? (
        <MasonryGrid 
          items={posts} 
          selectedCategory={selectedCategory} 
        />
      ) : (
        <div className="no-editorials">
          <p>No editorial content found.</p>
        </div>
      )}

      <footer className="editorial-footer">
        <p>© 2025 MLSC Studio. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default EditorialPage; 