const getCustomerLocales = () => {
  return fetch(`${ENVIRONMENT_CONFIGURATION.API_URL}/locales`, {}).then(res =>
    res.json()
  );
};

export default getCustomerLocales;
