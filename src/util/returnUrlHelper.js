import store from 'redux/store';

const generateReturnUrl = ({ queryParams, isMyAccount }) => {
  const {
    publisherConfig: { adyenConfiguration }
  } = store.getState();
  let queryParamsString;

  if (isMyAccount && adyenConfiguration?.myaccountReturnUrl) {
    if (queryParams) {
      queryParamsString = Object.keys(queryParams).map(
        key => `${key}=${queryParams[key]}`
      );
    }
    return `${adyenConfiguration.myaccountReturnUrl}?${queryParamsString}`;
  }

  if (!isMyAccount && adyenConfiguration?.checkoutReturnUrl) {
    queryParamsString = Object.keys(queryParams)
      .map(key => `${key}=${queryParams[key]}`)
      .join('&');

    return `${adyenConfiguration.checkoutReturnUrl}${
      window.location.search ? '&' : '?'
    }${queryParamsString}`;
  }

  if (!queryParams) {
    return window.location.href;
  }

  queryParamsString = Object.keys(queryParams)
    .map(key => `${key}=${queryParams[key]}`)
    .join('&');
  return `${window.location.href}${
    window.location.search ? '&' : '?'
  }${queryParamsString}`;
};

export default generateReturnUrl;
