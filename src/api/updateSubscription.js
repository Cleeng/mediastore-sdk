import jwtDecode from 'jwt-decode';

const updateSubscription = params => {
  const token = localStorage.getItem('CLEENG_AUTH_TOKEN') || '';
  const decoded = jwtDecode(token);
  const { customerId } = decoded;

  const url = `${ENVIRONMENT_CONFIGURATION.GB_API_URL}/customers/${customerId}/subscriptions`;

  return fetch(url, {
    method: 'PATCH',
    body: JSON.stringify({ ...params }),
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  }).then(res => res.json());
};

export default updateSubscription;
