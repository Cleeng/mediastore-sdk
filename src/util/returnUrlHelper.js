import store from 'redux/store';

const generateReturnUrl = ({ queryParams, isMyAccount }) => {
  const {
    publisherConfig: { adyenConfiguration }
  } = store.getState();

  if (isMyAccount && adyenConfiguration?.myaccountReturnUrl)
    return adyenConfiguration.myaccountReturnUrl;

  if (!isMyAccount && adyenConfiguration?.checkoutReturnUrl)
    return adyenConfiguration.checkoutReturnUrl;

  if (!queryParams) {
    return window.location.href;
  }

  const queryParamsString = Object.keys(queryParams)
    .map(key => `${key}=${queryParams[key]}`)
    .join('&');
  return `${window.location.href}${
    window.location.search ? '&' : '?'
  }${queryParamsString}`;
};

export default generateReturnUrl;
