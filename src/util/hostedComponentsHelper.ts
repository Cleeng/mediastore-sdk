import { HOSTED_COMPONENTS_DOMAIN } from 'scripts/constants';

export const isHostedMSSDK =
  window.location.origin === HOSTED_COMPONENTS_DOMAIN;

export const handleTopNavigate = (URL: string) => {
  if (window.top) {
    window.top.location.href = URL;
  }
};
