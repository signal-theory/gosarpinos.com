// about/menu/PostContent.js
'use client';
import React, { useState, useEffect, useCallback } from 'react';
import MenuCard from './MenuCard';
import { fetchACFImage } from '../lib/utils';

// This component is used to include the SortPosts component that sorts by post type
const PostContent = ({ posts, menuSlug, postTypeSlug, filterPostsBy }) => {

  const [loading, setLoading] = useState(true);
  const [filteredPosts, setFilteredPosts] = useState([]);

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



  return (
    <>
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="responsive-equal-height-container">
          {filteredPosts.map((post, index) => {
            return (
              <MenuCard
                key={index}
                post={post}
                postTypeSlug={postTypeSlug}
                menuSlug={menuSlug}
                hoverImage={post.hoverImage ? post.hoverImage.sourceUrl : '/default-menu-hover.jpg'}
                hoverAlt={post.hoverImage ? post.hoverImage.altText : ''}
                featuredImage={post.mainImage ? post.mainImage.sourceUrl : '/default-menu-image.jpg'}
                featuredAlt={post.mainImage ? post.mainImage.altText : ''}
              />
            )
          })}
        </div>
      )}
    </>
  );
};

export default PostContent;
