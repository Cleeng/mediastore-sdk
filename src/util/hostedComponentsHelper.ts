export const isHostedMSSDK =
  window.location.origin === import.meta.env.VITE_HOSTED_COMPONENTS_DOMAIN;

export const handleTopNavigate = (URL: string) => {
  if (window.top) {
    window.top.location.href = URL;
  }
};
