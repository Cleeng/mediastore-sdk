const token = localStorage.getItem('CLEENG_AUTH_TOKEN') || '';

const getPaymentMethods = async () => {
  return fetch(`${ENVIRONMENT_CONFIGURATION.GB_API_URL}/payment-methods`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(res => res.json());
};

export default getPaymentMethods;
