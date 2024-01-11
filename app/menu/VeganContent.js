// about/menu/VeganContent.js
'use client';
import React, { useState, useEffect } from 'react';
import MenuCard from './MenuCard';
import SortPosts from '../components/SortPosts';
import { fetchACFImage } from '../lib/utils';


const VeganContent = ({ posts, postType, categoryTitle }) => {
  const [filteredPosts, setFilteredPosts] = useState([]);

  const [categories, setCategories] = useState([]); // New state for categories
  const [selectedCategory, setSelectedCategory] = useState('Vegan');

  const fetchImages = async (postsToProcess) => {

    const veganPosts = postsToProcess.filter(post => post.acf.menu_category?.includes('Vegan'));
    return await Promise.all(veganPosts.map(async post => {
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
  };

  useEffect(() => {
    if (posts) {
      fetchImages(posts).then(setFilteredPosts);
    }
  }, [posts]);
  
  useEffect(() => {
    // Set these as your categories
    setCategories(postType.map(postType => ({ type: postType })));
  }, [posts, postType]);


  useEffect(() => {
  // Filter posts based on selected post type and check for "vegan" category
  const filtered = selectedCategory === 'All'
    ? posts.filter(post => post.acf.menu_category?.includes('Vegan'))
    : posts.filter(post => post.type === selectedCategory && post.acf.menu_category?.includes('Vegan'));

  // Fetch images for filtered posts
  fetchImages(filtered).then(setFilteredPosts);
}, [selectedCategory, posts]);


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

export default VeganContent;
