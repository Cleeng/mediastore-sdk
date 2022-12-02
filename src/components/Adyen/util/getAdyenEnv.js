import { getData } from 'util/appConfigHelper';

const getAdyenEnv = () => {
  if (getData('CLEENG_ENVIRONMENT') !== 'production') return 'test';
  return 'live';
};

export default getAdyenEnv;
