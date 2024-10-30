import { getData } from 'util/appConfigHelper';

const CLIENT_KEY_LIVE = 'live_BQDOFBYTGZB3XKF62GBYSLPUJ4YW2TPL';
const CLIENT_KEY_TEST = 'test_I4OFGUUCEVB5TI222AS3N2Y2LY6PJM3K';

const ADYEN_REGIONS = {
  EU: 'live',
  US: 'live-us',
  AU: 'live-au',
  APSE: 'live-apse',
  IN: 'live-in'
};

export const getAdyenEnv = (region) =>
  getData('CLEENG_ENVIRONMENT') !== 'production'
    ? 'test'
    : ADYEN_REGIONS[region] ?? 'live';

export const getAdyenClientKey = () =>
  getAdyenEnv() === 'test' ? CLIENT_KEY_TEST : CLIENT_KEY_LIVE;

export const getGooglePayEnv = () =>
  getAdyenEnv() === 'test' ? 'TEST' : 'PRODUCTION';
