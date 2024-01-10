// about/blog/BlogContent.js
'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import BlogCard from './BlogCard';
import CategoryMenu from '../../components/CategoryMenu';

const BlogContent = ({ initialPosts }) => {

  const [selectedCategory, setSelectedCategory] = useState('All');
  // Initialize filteredPosts with initialPosts or an empty array if initialPosts is undefined
  const [filteredPosts, setFilteredPosts] = useState(initialPosts || []);

  const categoryMapping = {
    'All': null, // Assuming 'All' means no specific category filter
    'Blog': 8,
    'News': 14,
    'Featured': 15,
    'Recipes': 17,
    // ... other categories
  };

  useEffect(() => {
    const categoryId = categoryMapping[selectedCategory]; // Get category ID

    if (selectedCategory === 'All' || !categoryId) {
      setFilteredPosts(initialPosts);
    } else {
      const filtered = initialPosts.filter(post => post.categories.includes(categoryId));
      setFilteredPosts(filtered);
    }
  }, [selectedCategory, initialPosts]);


  return (
    <>
      <CategoryMenu
        selectionTitle="Sort by:"
        selectedCategory={selectedCategory}
        availableTerms={Object.keys(categoryMapping)}
        onCategorySelect={setSelectedCategory}
      />

      <div className="responsive-equal-height-container">
        {filteredPosts.map((post, index) => {
          const featuredImageUrl = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/default-image.jpg';

          return(
            <Link key={index} href={`/about/blog/${post.slug}`}
              style={{display: 'flex'}}>
              <BlogCard 
                post={post}
                featuredImage={featuredImageUrl} />
            </Link>
          )
        })}

      </div>
    </>
  );
};

export default BlogContent;
