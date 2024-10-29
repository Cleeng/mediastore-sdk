import { getData } from 'util/appConfigHelper';
import fetchWithJWT from 'util/fetchHelper';
import getApiURL from 'util/environmentHelper';

const getAdyenPaymentMethods = async (type, isMyAccount = false) => {
  const API_URL = getApiURL();

  const orderId = parseInt(getData('CLEENG_ORDER_ID') || '0', 10);

  const url = `${API_URL}/connectors/adyen/payment-methods`;

  const res = await fetchWithJWT(url, {
    method: 'POST',
    body: isMyAccount
      ? JSON.stringify({
          filterPaymentMethodsByType: type
        })
      : JSON.stringify({
          orderId,
          filterPaymentMethodsByType: type
        })
  });

  const { responseData, errors } = await res.json();

  if (!res.ok) {
    throw new Error(errors[0]);
  }

  return responseData;
};

export default getAdyenPaymentMethods;
