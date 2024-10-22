export const isHostedMSSDK =
  typeof window !== 'undefined'
    ? window.location.origin === import.meta.env.VITE_HOSTED_COMPONENTS_DOMAIN
    : false;

export const handleTopNavigate = (URL: string) => {
  if (typeof window !== 'undefined' && window.top) {
    window.top.location.href = URL;
  }
};
