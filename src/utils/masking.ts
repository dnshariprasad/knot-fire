/**
 * Masks a string with bullets or dots
 * @param text The text to mask
 * @returns Masked string
 */
export const maskText = (text: string): string => {
  if (!text) return '';
  // Return a consistent length of bullets for security (don't reveal original length)
  return '••••••••••••';
};
