import { POSTS_API_URL, PAGES_API_URL, CPT_API_URL, MEDIA_API_URL } from './constants';
import he from 'he';

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


// utils fetchPageData
export async function fetchPageData(pageId) {
  const res = await fetch(`${PAGES_API_URL}/${pageId}`);
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

// utils fetchCPTData
export async function fetchCPTData(cptName) {
  const res = await fetch(`${CPT_API_URL}/${cptName}`, {
    headers: {
      'Accept': 'application/json'
    }
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch data for CPT: ${cptName}`);
  }

  return res.json();
}

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

