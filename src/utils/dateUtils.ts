export const formatRelativeTime = (timestamp: number | string | Date): string => {
  const date = new Date(timestamp);
  const now = new Date();
  
  // Reset hours to compare dates only for daily relative time
  const dDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const dNow = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  
  const diffTime = dDate.getTime() - dNow.getTime();
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === -1) return 'Yesterday';
  if (diffDays === 1) return 'Tomorrow';
  
  if (Math.abs(diffDays) < 7) {
    return diffDays > 0 ? `In ${diffDays}d` : `${Math.abs(diffDays)}d ago`;
  }
  
  if (Math.abs(diffDays) < 30) {
    const weeks = Math.round(Math.abs(diffDays) / 7);
    return diffDays > 0 ? `In ${weeks}w` : `${weeks}w ago`;
  }

  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
};
