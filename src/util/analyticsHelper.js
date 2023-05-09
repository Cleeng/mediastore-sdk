// eslint-disable-next-line import/no-extraneous-dependencies
import mixpanel from 'mixpanel-browser';

import jwtDecode from 'jwt-decode';
import { getData } from 'util/appConfigHelper';
import { version } from '../../package.json'; // import alias ?

const collectMixpanelData = componentName => {
  const projectToken = '2708ff6e8bd2fd0b04aad2432a4c1924';
  const { publisherId } = jwtDecode(getData('CLEENG_AUTH_TOKEN')); // what if user is not logged?

  mixpanel.init(projectToken);
  mixpanel.track(`${componentName} render`, {
    'Publisher ID': publisherId,
    'MSSDK Version': version,
    'Component Name': componentName
  });
};

export default collectMixpanelData;
