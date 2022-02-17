import fetchWithJWT from 'util/fetchHelper';
import getApiURL from 'util/environmentHelper';
import { getData } from 'util/appConfigHelper';

const updatePayPalPaymentDetails = async (
  paymentMethodId,
  paymentDetailsToDelete = 0
) => {
  const API_URL = getApiURL();
  const url = `${API_URL}/connectors/paypal/v1/payment_details/tokens`;

  const redirectUrls = {
    successUrl: getData('CLEENG_MY_ACCOUNT_URL')
      ? `${getData('CLEENG_MY_ACCOUNT_URL')}?deletepd=${paymentDetailsToDelete}`
      : `${window.location.origin}/my-account/payment-info?deletepd=${paymentDetailsToDelete}`,
    cancelUrl:
      getData('CLEENG_MY_ACCOUNT_URL') ||
      `${window.location.origin}/my-account/payment-info`,
    errorUrl:
      getData('CLEENG_MY_ACCOUNT_URL') ||
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
