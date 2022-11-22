import fetchWithJWT from 'util/fetchHelper';
import getApiURL from 'util/environmentHelper';

const updateAdyenPaymentDetails = async (paymentMethodId, paymentMethod) => {
  const API_URL = getApiURL();
  const url = `${API_URL}/connectors/adyen/payment-details`;

  try {
    const res = await fetchWithJWT(url, {
      method: 'POST',
      body: JSON.stringify({
        paymentMethod,
        paymentMethodId,
        returnUrl: 'https://cleeng.com'
      })
    });
    return res.json();
  } catch (e) {
    return e;
  }
};

export default updateAdyenPaymentDetails;
