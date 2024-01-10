// about/menu/MenuContent.js
'use client';
import React, { useState, useEffect } from 'react';
import MenuCard from './MenuCard';
import CategoryMenu from '../components/CategoryMenu';
import { fetchACFImage } from '../lib/utils';


const MenuContent = ({ posts, postType }) => {

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categories, setCategories] = useState([]); // New state for categories
  const [filteredPosts, setFilteredPosts] = useState(posts || []);


  // Function to fetch images for posts
  const fetchImagesForPosts = async (postsToProcess) => {
    return await Promise.all(postsToProcess.map(async post => {
      const mainImage = post.acf.main_image ? await fetchACFImage(post.acf.main_image).catch(() => null) : null;
      const hoverImage = post.acf.hover_image ? await fetchACFImage(post.acf.hover_image).catch(() => null) : null;
      return { ...post, mainImage, hoverImage };
    }));
  };

  useEffect(() => {
    const fetchImages = async () => {
    const postsWithImages = await Promise.all(posts.map(async post => {
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

    setFilteredPosts(postsWithImages);
  };

    if (posts) {
      fetchImages();
    }
  }, [posts]);


  useEffect(() => {
    // Extract unique categories from posts
    const uniqueCategories = Array.from(new Set(posts.flatMap(post => post.acf.menu_category || [])));
    setCategories(uniqueCategories.map(category => ({ name: category, id: category })));
  }, [posts]);

  useEffect(() => {
    // Filter posts based on selected category
    const filtered = selectedCategory === 'All'
      ? posts
      : posts.filter(post => post.acf.menu_category?.includes(selectedCategory));

    // Fetch images for filtered posts
    fetchImagesForPosts(filtered).then(setFilteredPosts);
  }, [selectedCategory, posts]);


  return (
    <>
      <CategoryMenu
        selectionTitle="Sort Specialty Pizzas"
        selectedCategory={selectedCategory}
        categories={categories}
        onCategorySelect={setSelectedCategory}
      />

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

export default MenuContent;