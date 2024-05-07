import fetchWithJWT from 'util/fetchHelper';
import getApiURL from 'util/environmentHelper';
import { getData } from 'util/appConfigHelper';

const updatePayPalPaymentDetails = async (paymentMethodId) => {
  const API_URL = getApiURL();
  const url = `${API_URL}/connectors/paypal/v1/payment_details/tokens`;

  const redirectUrls = {
    successUrl: getData('CLEENG_MYACCOUNT_PP_SUCCESS')
      ? `${getData('CLEENG_MYACCOUNT_PP_SUCCESS')}`
      : `${window.location.origin}/my-account/payment-info`,
    cancelUrl:
      getData('CLEENG_MYACCOUNT_PP_CANCEL') ||
      `${window.location.origin}/my-account/payment-info`,
    errorUrl:
      getData('CLEENG_MYACCOUNT_PP_ERROR') ||
      `${window.location.origin}/my-account/payment-info`
  };

  try {
    const res = await fetchWithJWT(url, {
      method: 'POST',
      body: JSON.stringify({ ...redirectUrls, paymentMethodId })
    });
    return res.json();
  } catch (e) {
    return e;
  }
};

export default updatePayPalPaymentDetails;
