import jwtDecode from 'jwt-decode';

const getCustomerConsents = async () => {
  const token = localStorage.getItem('CLEENG_AUTH_TOKEN') || '';
  const decoded = jwtDecode(token);
  const { customerId } = decoded;

  const url = `${ENVIRONMENT_CONFIGURATION.GB_API_URL}/customers/${customerId}/consents`;
  return fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(res => {
    return res.json();
  });
};

export default getCustomerConsents;
