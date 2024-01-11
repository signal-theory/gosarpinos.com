// about/menu/PostContent.js
'use client';
import React, { useState, useEffect, useCallback } from 'react';
import MenuCard from './MenuCard';
import SortPosts from '../components/SortPosts';
import { fetchACFImage } from '../lib/utils';

// This component is used to include the SortPosts component that sorts by post type
const PostContent = ({ posts, postType, categoryTitle, filterPostsBy }) => {
  const [filteredPosts, setFilteredPosts] = useState([]);

  const [categories, setCategories] = useState([]); // New state for categories
  const [selectedCategory, setSelectedCategory] = useState(filterPostsBy || 'All');

  const fetchImages =  useCallback(async (postsToProcess) => {
    let filterPosts = postsToProcess;
    if (filterPostsBy === 'Vegan' || filterPostsBy === 'Gluten Free') {
      filterPosts = postsToProcess.filter(post => post.acf.menu_category?.includes(filterPostsBy));
    }
    return await Promise.all(filterPosts.map(async post => {
      const mainImage = post.acf.main_image ? await fetchACFImage(post.acf.main_image).catch(e => {
        console.error(`Error fetching main image: ${e}`);
        return null;
      }) : null;
      const hoverImage = post.acf.hover_image ? await fetchACFImage(post.acf.hover_image).catch(e => {
        console.error(`Error fetching hover image: ${e}`);
        return null;
      }) : null;
      
      return { ...post, mainImage, hoverImage };
    }));
  }, [filterPostsBy]);

  useEffect(() => {
    if (posts) {
      fetchImages(posts).then(setFilteredPosts);
    }
  }, [posts, fetchImages]);
  
  useEffect(() => {
    // Set these as your categories
    setCategories(postType.map(postType => ({ type: postType })));
  }, [posts, postType]);


  useEffect(() => {
  // Filter posts based on selected post type and check for "vegan" category
  const filtered = selectedCategory === 'All'
    ? posts.filter(post => post.acf.menu_category?.includes(filterPostsBy))
    : posts.filter(post => post.type === selectedCategory && post.acf.menu_category?.includes(filterPostsBy));

  // Fetch images for filtered posts
  fetchImages(filtered).then(setFilteredPosts);
}, [selectedCategory, posts, fetchImages, filterPostsBy]);


  return (
    <>
      {categories.length > 0 && <SortPosts
        selectionTitle={categoryTitle}
        selectedPostType={selectedCategory}
        postTypes={postType}
        onPostTypeSelect={setSelectedCategory}
      />}

      <div className="responsive-equal-height-container">
        {filteredPosts.map((post, index) => {
          return (
              <MenuCard 
                key={index}
                post={post}
                postType={postType}
                hoverImage={post.hoverImage ? post.hoverImage.sourceUrl : null}
                hoverAlt={post.hoverImage ? post.hoverImage.altText : ''}
                featuredImage={post.mainImage ? post.mainImage.sourceUrl : null}
                featuredAlt={post.mainImage ? post.mainImage.altText : ''}
              />
          )
        })}
      </div>
    </>
  );
};

export default PostContent;
