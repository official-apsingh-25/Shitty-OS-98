// Utility to detect Mobile / Touch devices for responsive Win98 interactions

export const isTouchOrMobile = () => {
  if (typeof window === 'undefined') return false;
  return (
    window.innerWidth < 768 ||
    'ontouchstart' in window ||
    (navigator && navigator.maxTouchPoints > 0)
  );
};

