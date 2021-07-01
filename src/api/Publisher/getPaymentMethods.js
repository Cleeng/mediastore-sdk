import fetchWithJWT from 'util/fetchHelper';

const getPaymentMethods = () => {
  return fetchWithJWT(
    `https://mediastoreapi-sandbox.cleeng.com/payment-methods`,
    {
      method: 'GET'
    }
  ).then(res => res.json());
};

export default getPaymentMethods;
