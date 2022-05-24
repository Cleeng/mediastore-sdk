import { getData } from 'util/appConfigHelper';
import fetchWithJWT from 'util/fetchHelper';
import getApiURL from 'util/environmentHelper';
import jwtDecode from 'jwt-decode';

const createOrder = (offerId, paymentMethodId = 0) => {
  const API_URL = getApiURL();
  const { customerId } = jwtDecode(getData('CLEENG_AUTH_TOKEN'));

  const url = `${API_URL}/orders`;

  return fetchWithJWT(url, {
    method: 'POST',
    body: JSON.stringify({
      offerId,
      customerId,
      paymentMethodId
    })
  }).then(res => res.json());
};

export default createOrder;
