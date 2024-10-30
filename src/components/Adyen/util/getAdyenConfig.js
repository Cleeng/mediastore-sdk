import { getData } from 'util/appConfigHelper';

const CLIENT_KEY_LIVE = 'live_BQDOFBYTGZB3XKF62GBYSLPUJ4YW2TPL';
const CLIENT_KEY_TEST = 'test_I4OFGUUCEVB5TI222AS3N2Y2LY6PJM3K';

const getAdyenRegion = (region) => {
  if (region === 'US') {
    return 'live-us';
  }

  return 'live';
};

export const getAdyenEnv = (region) =>
  getData('CLEENG_ENVIRONMENT') !== 'production'
    ? 'test'
    : getAdyenRegion(region);

export const getAdyenClientKey = () =>
  getAdyenEnv() === 'test' ? CLIENT_KEY_TEST : CLIENT_KEY_LIVE;

export const getGooglePayEnv = () =>
  getAdyenEnv() === 'test' ? 'TEST' : 'PRODUCTION';
