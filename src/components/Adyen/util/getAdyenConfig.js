import { getData } from 'util/appConfigHelper';

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

export const getGooglePayEnv = () =>
  getAdyenEnv() === 'test' ? 'TEST' : 'PRODUCTION';
