import { getData } from 'util/appConfigHelper';
import fetchWithJWT from 'util/fetchHelper';
import getApiURL from 'util/environmentHelper';
import jwtDecode from 'jwt-decode';

const createOrder = (offerId: string, paymentMethodId = 0): Promise<any> => {
  const API_URL = getApiURL();
  const { customerId } = jwtDecode<{ customerId: string }>(getData('CLEENG_AUTH_TOKEN'));

  const url = `${API_URL}/orders`;

  return fetchWithJWT(url, {
    method: 'POST',
    body: JSON.stringify({
      offerId,
      customerId,
      paymentMethodId
    })
  })
    .then(async res => {
      const { responseData, errors } = await res.json();
      if (!res.ok) {
        throw new Error(errors[0]);
      }
      return responseData;
    })
    .catch(err => {
      throw new Error(err);
    });
};

export default createOrder;
