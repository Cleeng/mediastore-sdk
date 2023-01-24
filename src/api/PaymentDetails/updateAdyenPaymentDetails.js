import fetchWithJWT from 'util/fetchHelper';
import getApiURL from 'util/environmentHelper';
import generateReturnUrl from 'util/returnUrlHelper';

const updateAdyenPaymentDetails = async (
  paymentMethodId,
  paymentMethod,
  browserInfo,
  billingAddress
) => {
  const API_URL = getApiURL();
  const url = `${API_URL}/connectors/adyen/payment-details`;

  try {
    const res = await fetchWithJWT(url, {
      method: 'POST',
      body: JSON.stringify({
        paymentMethod,
        paymentMethodId,
        browserInfo,
        billingAddress,
        returnUrl: generateReturnUrl({ paymentMethodId })
      })
    });
    return res.json();
  } catch (e) {
    return e;
  }
};

export default updateAdyenPaymentDetails;
