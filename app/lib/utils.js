import { POSTS_API_URL, CPT_API_URL, PAGES_API_URL, MEDIA_API_URL } from './constants';
import he from 'he';

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

// utils fetchACFImage
export async function fetchACFImage(pageId) {
  const res = await fetch(`${MEDIA_API_URL}/${pageId}`);
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  const imageData = await res.json();
  return {
    sourceUrl: imageData.source_url,
    altText: imageData.alt_text
  };
}

export async function fetchMediaData(mediaId, size = 'full') {
  const res = await fetch(`https://sarpinos.mysites.io/wp-json/wp/v2/media/${mediaId}`);
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

// utils/fetchMetadata.js
export async function fetchMetadata(pageId) {
  const res = await fetch(`https://sarpinos.mysites.io/wp-json/wp/v2/pages/${pageId}`);

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
