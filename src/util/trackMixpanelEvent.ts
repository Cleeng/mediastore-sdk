/* eslint-disable camelcase */
import mixpanel from 'mixpanel-browser';

import { getData } from './appConfigHelper';
import { version } from '../../package.json';

const environment = getData('CLEENG_ENVIRONMENT');

const PROD_TOKEN = 'b0295127740fa6adee7c1e57995a2073';
const STG_TOKEN = '58fd0d2785acbde61a6c117a642c0360';

const MIXPANEL_TOKEN = environment === 'production' ? PROD_TOKEN : STG_TOKEN;

mixpanel.init(MIXPANEL_TOKEN);

type EventData = {
  distinct_id: string;
  publisherId: string;
  offerId: string;
  offerTitle: string;
  offerPrice: number;
  offerCurrency: string;
  version: string;
};

const trackMixpanelEvent = (eventName: string, eventData: EventData) => {
  if (environment === 'production' || environment === 'staging') {
    mixpanel.track(eventName, {
      ...eventData,
      version
    });
  }
};

export default trackMixpanelEvent;
