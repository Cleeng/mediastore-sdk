import store from 'redux/store';

const generateReturnUrl = ({ queryParams, isMyAccount }) => {
  const {
    publisherConfig: { adyenConfiguration }
  } = store.getState();

  const { myaccountReturnUrl, checkoutReturnUrl } = adyenConfiguration ?? {};

  const formatUrl = url => {
    const paramsString = new URLSearchParams(queryParams).toString();
    return `${url}${new URL(url).search ? '&' : '?'}${paramsString}`;
  };

  if (isMyAccount && myaccountReturnUrl) return formatUrl(myaccountReturnUrl);

  if (!isMyAccount && checkoutReturnUrl) return formatUrl(checkoutReturnUrl);

  if (!queryParams) return window.location.href;

  return formatUrl(window.location.href);
};

export default generateReturnUrl;
