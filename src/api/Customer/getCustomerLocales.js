const getCustomerLocales = () => {
  return fetch(
    `https://mediastoreapi-sandbox.cleeng.com/locales`,
    {}
  ).then(res => res.json());
};

export default getCustomerLocales;
