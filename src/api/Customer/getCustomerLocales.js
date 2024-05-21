import getApiURL from 'util/environmentHelper';

const getCustomerLocales = () => {
  const API_URL = getApiURL();

  return fetch(`${API_URL}/locales`, {}).then((res) => res.json());
};

export default getCustomerLocales;
