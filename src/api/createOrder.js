const createOrder = () => {
  const token = localStorage.getItem('CLEENG_AUTH_TOKEN') || '';
  const url = ENVIRONMENT_CONFIGURATION.USE_API_MOCK
    ? `https://www.mocky.io/v2/5d9ddf64320000c532329a60?mocky-delay=100ms`
    : `${ENVIRONMENT_CONFIGURATION.GB_API_URL}/orders/`;

  return fetch(url, {
    method: 'POST',
    body: JSON.stringify({}),
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(res => res.json());
};

export default createOrder;
