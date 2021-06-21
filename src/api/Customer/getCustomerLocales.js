const getCustomerLocales = () => {
  return fetch(
    `http://sls.cleeng.com:8000/mediastore-api/locales`,
    {}
  ).then(res => res.json());
};

export default getCustomerLocales;
