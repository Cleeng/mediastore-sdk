import { getData } from 'util/appConfigHelper';
import fetchWithJWT from 'util/fetchHelper';
import getApiURL from 'util/environmentHelper';
import jwtDecode from 'jwt-decode';

const listCustomerTransactions = async (
  limit = 50,
  offset = 0
): Promise<{ items: unknown }> => {
  const API_URL = getApiURL();
  const { customerId } = jwtDecode<{ customerId: number }>(
    getData('CLEENG_AUTH_TOKEN')
  );

  const url = `${API_URL}/customers/${customerId}/transactions?limit=${limit}&offset=${offset}`;
  return fetchWithJWT(url, {
    method: 'GET'
  })
    .then(async (res) => {
      const { responseData, errors } = await res.json();
      if (!res.ok) {
        throw new Error(errors[0]);
      }
      return responseData;
    })
    .catch((err) => {
      throw new Error(err);
    });
};

export default listCustomerTransactions;
