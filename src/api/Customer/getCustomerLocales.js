const getCustomerLocales = () => {
  return fetch(`${ENVIRONMENT_CONFIGURATION.GB_API_URL}/locales`, {}).then(
    res => res.json()
  );
};

export default getCustomerLocales;
