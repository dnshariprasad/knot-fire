/**
 * Fetches metadata (title, description) for a given URL using Microlink API
 */
export const fetchUrlMetadata = async (url: string) => {
  if (!url.startsWith('http')) return null;
  
  try {
    const response = await fetch(`https://api.microlink.io?url=${encodeURIComponent(url)}`);
    const data = await response.json();
    
    if (data.status === 'success' && data.data) {
      return {
        title: data.data.title,
        description: data.data.description
      };
    }
    return null;
  } catch (err) {
    console.error('Metadata fetch failed:', err);
    return null;
  }
};
