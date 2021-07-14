import fetchWithJWT from 'util/fetchHelper';

const deletePaymentDetails = async paymentDetailsId => {
  const url = `${ENVIRONMENT_CONFIGURATION.API_URL}/payment_details/${paymentDetailsId}`;

  const res = await fetchWithJWT(url, {
    method: 'DELETE'
  });
  return res.json();
};

export default deletePaymentDetails;
