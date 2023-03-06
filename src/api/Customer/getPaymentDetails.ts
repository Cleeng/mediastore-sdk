import { getData } from 'util/appConfigHelper';
import fetchWithJWT from "util/fetchHelper";
import getApiURL from 'util/environmentHelper';
// @ts-ignore
import jwtDecode from 'jwt-decode';

const getPaymentDetails = async (): Promise<{ paymentDetails: unknown }> => {
  const API_URL = getApiURL();
  const { customerId } = jwtDecode(getData('CLEENG_AUTH_TOKEN'));

  const url = `${API_URL}/customers/${customerId}/payment_details`;
  return fetchWithJWT(url, {
    method: 'GET'
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

export default getPaymentDetails;