export const isRTL = () => {
  if (typeof window === 'object') {
    return document.dir === 'rtl';
  }
  return false;
};
