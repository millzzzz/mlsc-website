import React, { useEffect, useState } from 'react';
import MasonryGrid from '../components/editorial/MasonryGrid';
import '../components/editorial/EditorialPage.css';

const EditorialPage = () => {
  const [editorials, setEditorials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchEditorials = async () => {
      try {
        const response = await fetch('/api/editorial');
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        const posts = data.posts || [];
        setEditorials(posts);
        
        // Extract unique categories
        if (posts.length > 0) {
          const uniqueCategories = Array.from(new Set(posts.map(item => item.category)));
          setCategories(uniqueCategories);
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching editorials:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchEditorials();
  }, []);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  // Format category for display
  const formatCategoryName = (category) => {
    return category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  if (loading) {
    return <div className="loading-container">Loading editorials...</div>;
  }

  if (error) {
    return <div className="error-container">Error: {error}</div>;
  }

  return (
    <div className="editorial-page">
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
      
      {editorials && editorials.length > 0 ? (
        <MasonryGrid 
          items={editorials} 
          selectedCategory={selectedCategory} 
        />
      ) : (
        <div className="no-editorials">
          <p>No editorial content found. Please add content through the CMS.</p>
        </div>
      )}

      <footer className="editorial-footer">
        <p>© 2025 MLSC Studio. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default EditorialPage; 