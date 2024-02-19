// about/menu/MenuContent.js
'use client';
import React, { useState, useEffect, useCallback } from 'react';
import MenuCard from './MenuCard';
import SortCategories from '../components/SortCategories';
import { fetchACFImage } from '../lib/utils';

// This component is used to include the SortCategories component that sorts post by category
const MenuContent = ({ posts, postTypeSlug, categoryTitle, filterPostsBy }) => {

  const [loading, setLoading] = useState(true);
  const [filteredPosts, setFilteredPosts] = useState(posts || []);
  const [categories, setCategories] = useState([]); // New state for categories
  const [selectedCategory, setSelectedCategory] = useState('All');
  useEffect(() => {
    // Extract unique categories from posts
    const uniqueCategories = Array.from(new Set(posts.flatMap(post => post.acf.menu_category || [])));
    setCategories(uniqueCategories.map(category => ({ name: category, id: category })));

    // If 'Specialty' category exists, set it as the selected category
    if (uniqueCategories.includes('Specialty')) {
      setSelectedCategory('Specialty');
    }
  }, [posts]);

  const fetchImages = useCallback(async (postsToProcess) => {
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
    setLoading(true);
    if (posts) {
      const shuffledPosts = [...posts].sort(() => Math.random() - 0.5);
      fetchImages(shuffledPosts).then(posts => {
        setFilteredPosts(posts);
        setLoading(false);
      });
    }
  }, [posts, fetchImages]);

  useEffect(() => {
    // Extract unique categories from posts
    const uniqueCategories = Array.from(new Set(posts.flatMap(post => post.acf.menu_category || [])));
    setCategories(uniqueCategories.map(category => ({ name: category, id: category })));
  }, [posts]);

  useEffect(() => {
    setLoading(true);
    // Filter posts based on selected category
    const filtered = selectedCategory === `All`
      ? posts
      : posts.filter(post => post.acf.menu_category?.includes(selectedCategory));

    // Fetch images for filtered posts
    fetchImages(filtered).then(posts => {
      setFilteredPosts(posts);
      setLoading(false);
    });
  }, [selectedCategory, posts, fetchImages, postTypeSlug]);

  return (
    <>
      {categories.length > 0 && <SortCategories
        selectionTitle={categoryTitle}
        postType={postTypeSlug}
        selectedCategory={selectedCategory}
        categories={categories}
        onCategorySelect={setSelectedCategory}
      />}

      <div className="responsive-equal-height-container fade-in">
        {filteredPosts.map((post, index) => {
          return (
            <MenuCard
              key={index}
              post={post}
              postTypeSlug={postTypeSlug}
              hoverImage={post.hoverImage ? post.hoverImage.sourceUrl : '/default-menu-hover.jpg'}
              hoverAlt={post.hoverImage ? post.hoverImage.altText : ''}
              featuredImage={post.mainImage ? post.mainImage.sourceUrl : '/default-menu-image.jpg'}
              featuredAlt={post.mainImage ? post.mainImage.altText : ''}
            />
          )
        })}
      </div>
    </>
  );
};

export default MenuContent;
