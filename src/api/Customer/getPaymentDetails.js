import jwtDecode from 'jwt-decode';
import { getData } from 'util/appConfigHelper';

const getPaymentDetails = async () => {
  const token = getData('CLEENG_AUTH_TOKEN') || '';
  const decoded = jwtDecode(token);
  const { customerId } = decoded;

  const url = `https://mediastoreapi-sandbox.cleeng.com/customers/${customerId}/payment_details`;
  return fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(res => {
    return res.json();
  });
};

export default getPaymentDetails;
