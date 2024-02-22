// about/menu/PostContent.js
'use client';
import React, { useRef, useState, useEffect, useCallback } from 'react';
import MenuCard from './MenuCard';
import { fetchACFImage } from '../lib/utils';

// This component is used to include the SortPosts component that sorts by post type
const PostContent = ({ posts, menuSlug, postTypeSlug, filterPostsBy }) => {

  const [filteredPosts, setFilteredPosts] = useState([]);

  // Add this useEffect to update filteredPosts when posts or filterPostsBy changes
  useEffect(() => {
    fetchImages(posts).then(setFilteredPosts);
  }, [posts, filterPostsBy]);

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


  // load more posts as the user scrolls
  const [visiblePosts, setVisiblePosts] = useState([]);
  const loadMoreRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setVisiblePosts((prevPosts) => {
          const nextPosts = filteredPosts.slice(0, prevPosts.length + 6);
          return nextPosts;
        });
      }
    }, { threshold: 1 });

    const currentRef = loadMoreRef.current; // Capture current ref in a variable
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) { // Use the captured ref in the cleanup function
        observer.unobserve(currentRef);
      }
    };
  }, [filteredPosts]);

  return (
    <>
      <div className="responsive-equal-height-container">
        {visiblePosts.map((post, index) => {
          return (
            <MenuCard
              key={index}
              post={post}
              postTypeSlug={postTypeSlug}
              menuSlug={menuSlug}
              hoverImage={post.hoverImage ? post.hoverImage.sourceUrl : null}
              hoverAlt={post.hoverImage ? post.hoverImage.altText : ''}
              featuredImage={post.mainImage ? post.mainImage.sourceUrl : '/default-menu-image.svg'}
              featuredAlt={post.mainImage ? post.mainImage.altText : ''}
            />
          )
        })}

        <div ref={loadMoreRef} />
      </div>
    </>
  );
};

export default PostContent;
