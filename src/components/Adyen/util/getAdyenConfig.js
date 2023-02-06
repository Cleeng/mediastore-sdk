import { getData } from 'util/appConfigHelper';

const CLIENT_KEY_LIVE = 'live_BQDOFBYTGZB3XKF62GBYSLPUJ4YW2TPL';
const CLIENT_KEY_TEST = 'test_I4OFGUUCEVB5TI222AS3N2Y2LY6PJM3K';

export const getAdyenEnv = () =>
  getData('CLEENG_ENVIRONMENT') !== 'production' ? 'test' : 'live';

export const getAdyenClientKey = () =>
  getAdyenEnv() === 'test' ? CLIENT_KEY_TEST : CLIENT_KEY_LIVE;

export const getGooglePayEnv = () =>
  getAdyenEnv() === 'test' ? 'TEST' : 'PRODUCTION';
