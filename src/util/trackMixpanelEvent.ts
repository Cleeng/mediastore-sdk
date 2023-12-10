/* eslint-disable camelcase */
import mixpanel from 'mixpanel-browser';

mixpanel.init('58fd0d2785acbde61a6c117a642c0360');

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
