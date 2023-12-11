/* eslint-disable camelcase */
import mixpanel from 'mixpanel-browser';
import { getData } from './appConfigHelper';

// Mixpanel token for staging
const MIXPANEL_TOKEN = '58fd0d2785acbde61a6c117a642c0360';

mixpanel.init(MIXPANEL_TOKEN);

type EventData = {
  distinct_id: string;
  publisherId: string;
  offerId: string;
  offerTitle: string;
  offerPrice: number;
  offerCurrency: string;
};

const trackMixpanelEvent = (eventName: string, eventData: EventData) => {
  const environment = getData('CLEENG_ENVIRONMENT');

  if (environment === 'production' || environment === 'staging') {
    mixpanel.track(eventName, {
      ...eventData
    });
  }
};

export default trackMixpanelEvent;
