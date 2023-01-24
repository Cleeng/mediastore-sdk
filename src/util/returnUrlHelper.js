const generateReturnUrl = queryParams => {
  // TODO: handle return URL passed in adyen configuration object
  const queryParamsString = Object.keys(queryParams)
    .map(key => `${key}=${queryParams[key]}`)
    .join('&');
  return `${window.location.href}${
    window.location.search ? '&' : '?'
  }${queryParamsString}`;
};

export default generateReturnUrl;
