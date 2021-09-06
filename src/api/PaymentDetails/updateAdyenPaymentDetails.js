import fetchWithJWT from 'util/fetchHelper';

const updateAdyenPaymentDetails = async (paymentMethodId, card) => {
  const url = `${ENVIRONMENT_CONFIGURATION.API_URL}/connectors/adyen/payment_details`;

  try {
    const res = await fetchWithJWT(url, {
      method: 'POST',
      body: JSON.stringify({ card, paymentMethodId })
    });
    return res.json();
  } catch (e) {
    return e;
  }
};

export default updateAdyenPaymentDetails;
