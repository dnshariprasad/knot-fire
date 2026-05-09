/**
 * Checks if a string is a valid URL
 */
export const isUrl = (str: string): boolean => {
  try {
    new URL(str);
    return true;
  } catch {
    return false;
  }
};

/**
 * Validates if a string looks like a URL for metadata fetching
 */
export const isValidForMetadata = (url: string): boolean => {
  return url.startsWith('http') && isUrl(url);
};
