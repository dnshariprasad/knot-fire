/**
 * Calculates a human-readable period string (e.g., "2y 3m", "5m", "10d")
 */
export const getPeriodString = (dateStr: string): string | null => {
  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return null;
    
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const diffYears = Math.floor(diffDays / 365);
    const remainingDays = diffDays % 365;
    const diffMonths = Math.floor(remainingDays / 30);
    
    if (diffYears > 0) return `${diffYears}y ${diffMonths}m`;
    if (diffMonths > 0) return `${diffMonths}m`;
    return `${diffDays}d`;
  } catch {
    return null;
  }
};

/**
 * Formats a date for standard display
 */
export const formatDate = (date: string | number | Date, options: Intl.DateTimeFormatOptions = {
  dateStyle: 'medium',
  timeStyle: 'short'
}): string => {
  return new Date(date).toLocaleString(undefined, options);
};
