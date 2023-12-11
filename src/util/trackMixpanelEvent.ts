/* eslint-disable camelcase */
import mixpanel from 'mixpanel-browser';

// staging
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
  mixpanel.track(eventName, {
    ...eventData
  });
};

export default trackMixpanelEvent;
