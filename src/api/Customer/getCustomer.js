import { getData } from 'util/appConfigHelper';
import fetchWithJWT from 'util/fetchHelper';
import getApiURL from 'util/environmentHelper';
import { jwtDecode } from 'jwt-decode';

const getCustomer = () => {
  const API_URL = getApiURL();
  const { customerId } = jwtDecode(getData('CLEENG_AUTH_TOKEN'));

  const url = `${API_URL}/customers/${customerId}`;
  return fetchWithJWT(url, {
    method: 'GET',
  }).then((res) => res.json());
};

export default getCustomer;
