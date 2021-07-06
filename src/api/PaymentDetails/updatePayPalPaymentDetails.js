import fetchWithJWT from 'util/fetchHelper';

const updatePayPalPaymentDetails = async paymentMethodId => {
  const url = `${ENVIRONMENT_CONFIGURATION.API_URL}/connectors/paypal/v1/payment_details/tokens`;

  const redirectUrls = {
    successUrl: `${window.location.origin}/my-account/payment-info`,
    cancelUrl: `${window.location.origin}/my-account/payment-info`,
    errorUrl: `${window.location.origin}/my-account/payment-info`
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
