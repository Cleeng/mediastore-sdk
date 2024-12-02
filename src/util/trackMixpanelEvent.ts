/* eslint-disable camelcase */
import mixpanel from 'mixpanel-browser';
import { UAParser } from 'ua-parser-js';

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
} & {
  [key: string]: unknown; // Other optional and unknown fields
};

const getUserAgentData = () => {
  const { getBrowser, getDevice, getOS } = new UAParser(
    window.navigator.userAgent
  );

  const browser = getBrowser();
  const os = getOS();
  const device = getDevice();

  return {
    browser: browser.name,
    browserVersion: browser.version,
    system: os.name,
    systemVersion: os.version,
    deviceModel: device.model,
    deviceType: device.type,
    deviceVendor: device.vendor
  };
};

const trackMixpanelEvent = (eventName: string, eventData: EventData) => {
  if (environment === 'production' || environment === 'staging') {
    console.log(eventName, {
      ...eventData,
      ...getUserAgentData(),
      version
    });

    mixpanel.track(eventName, {
      ...eventData,
      ...getUserAgentData(),
      version
    });
  }
};

export default trackMixpanelEvent;
