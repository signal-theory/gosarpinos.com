import { POSTS_API_URL, PAGES_API_URL, CPT_API_URL, MEDIA_API_URL } from './constants';
import he from 'he';

// utils/fetchMetadata.js
export async function fetchMetadata(pageId) {
  const res = await fetch(`${PAGES_API_URL}/${pageId}`);

  if (!res.ok) {
    throw new Error('Failed to fetch metadata');
  }

  const data = await res.json();
  const yoastMetadata = data.yoast_head_json;
  const ogImage = yoastMetadata.og_image ? yoastMetadata.og_image[0].url : null;


  // Return only the title and description
  return {
    title: he.decode(yoastMetadata.title),
    description: he.decode(yoastMetadata.description),
    ogImage: ogImage
    // You can add more fields here if needed
  };
}

// utils/fetchCPTMetadataBySlug.js
export async function fetchCPTMetadataBySlug(slug, cptName) {
  const res = await fetch(`${CPT_API_URL}/${cptName}?slug=${slug}`);
  console.log('api',` ${CPT_API_URL}/${cptName}?slug=${slug}`);

  if (!res.ok) {
    throw new Error('Failed to fetch metadata');
  }

  const data = await res.json();
  const yoastMetadata = data.yoast_head_json;
  const ogImage = yoastMetadata && yoastMetadata.og_image ? yoastMetadata.og_image[0].url : null;

  return {
    title: yoastMetadata ? he.decode(yoastMetadata.title) : null,
    description: yoastMetadata ? he.decode(yoastMetadata.description) : null,
    ogImage: ogImage
  };
}
// utils fetchPostData
export async function fetchPostData() {
  try {
    // Append '_embed' to the URL to include additional data like featured images
    const response = await fetch(`${POSTS_API_URL}?_embed`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const posts = await response.json();

    // Assuming posts is an array
    return posts.map(post => {
      // Extract the featured image URL; use a default or fallback if not available
      const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/default-image.jpg';
      return {
        ...post,
        featuredImage
      };
    });

  } catch (error) {
    console.error("Error fetching posts:", error);
    return []; // Return an empty array in case of error
  }
}

// utils/fetchPostBySlug.js
export async function fetchPostBySlug(slug) {
  const response = await fetch(`${POSTS_API_URL}?slug=${slug}&_embed`);
  const posts = await response.json();
  // Assuming only one post will be returned for a given slug
  const post = posts[0] || null;

  if (post) {
    post.featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/default-image.jpg';
  }

  return post;
}

export async function fetchCategories() {
  try {
    const response = await fetch(`${CPT_API_URL}/categories`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export async function getCategoryNamesByIds(categoryIds) {
  const categories = await fetchCategories();
  const categoryMap = categories.reduce((map, category) => {
    map[category.id] = category.name;
    return map;
  }, {});

  return categoryIds.map(catId => categoryMap[catId]).filter(name => name);
}

export async function fetchRelatedPosts(categoryId) {
  // Adjust the URL and logic to fetch posts by category
  //const response = await fetch(`${POSTS_API_URL}?category=${categoryId}&_embed`);

 try {
    const url = `${POSTS_API_URL}?category=${categoryId}&_embed`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`API call failed: ${response.status}`);
    }

    const relatedPosts = await response.json();

    if (relatedPosts) {
      relatedPosts.featuredImage = relatedPosts._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/default-image.jpg';
    }

    return relatedPosts;
  } catch (error) {
    console.error("Error fetching related posts:", error);
    return [];
  }
}

// utils fetchPageData
export async function fetchPageData(pageId) {
  const res = await fetch(`${PAGES_API_URL}/${pageId}?_embed`);
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}


// utils fetchCPTData
// utils.js
export async function fetchCPTData(cptNames) {
  const data = await Promise.all(cptNames.map(async (cptName) => {
    const res = await fetch(`${CPT_API_URL}/${cptName}`, {
      headers: {
        'Accept': 'application/json'
      }
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch data for CPT: ${cptName}`);
    }
    return res.json();
  }));
  return data.flat();
}

// utils/fetchCPTBySlug.js
export async function fetchCPTBySlug(slug, cptName) {
  const response = await fetch(`${CPT_API_URL}/${cptName}?slug=${slug}&_embed`);
  const posts = await response.json();
  // Assuming only one post will be returned for a given slug
  const post = posts[0] || null;

  if (post) {
    post.featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/default-image.jpg';
  }

  return post;
}

// utils fetchACFImage
export async function fetchACFImage(imageId) {
  const res = await fetch(`${MEDIA_API_URL}/${imageId}`);
  if (!res.ok) {
    throw new Error('Failed to fetch image data');
  }
  const imageData = await res.json();
  return {
    sourceUrl: imageData.source_url,
    altText: imageData.alt_text || 'Image'
  };
}

export async function fetchMediaData(mediaId, size = 'full') {
  const res = await fetch(`${MEDIA_API_URL}/${mediaId}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch data for media ${mediaId}`);
  }
  const data = await res.json();
  const imageUrl = data.media_details.sizes[size]
    ? data.media_details.sizes[size].source_url
    : data.source_url;
  return {
    ...data,
    source_url: imageUrl
  };
}

