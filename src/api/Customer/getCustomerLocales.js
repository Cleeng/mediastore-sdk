const getCustomerLocales = () => {
  return fetch(`https://mediastore-sandbox.cleeng.com/locales`, {}).then(res =>
    res.json()
  );
};

export default getCustomerLocales;
