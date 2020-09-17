import { getData, setData } from 'util/appConfigHelper';

const isConfigSetted = (urlParam, configName) => {
  switch (new URLSearchParams(window.location.search).get(urlParam)) {
    case 'true':
      setData(configName, 'true');
      return true;
    case 'false':
      setData(configName, 'false');
      return false;
    default:
      return getData(configName) === 'true';
  }
};

export const isHosted = () => isConfigSetted('hosted', 'CLEENG_HOSTED');
export const isHeaderOff = () =>
  isConfigSetted('headerOff', 'CLEENG_HEADER_OFF');
