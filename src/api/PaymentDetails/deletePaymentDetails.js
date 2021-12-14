import fetchWithJWT from 'util/fetchHelper';
import getApiURL from 'util/environmentHelper';

const deletePaymentDetails = async paymentDetailsId => {
  const API_URL = getApiURL();
  const url = `${API_URL}/payment_details/${paymentDetailsId}`;

  const res = await fetchWithJWT(url, {
    method: 'DELETE'
  });
  return res.json();
};

export default deletePaymentDetails;
