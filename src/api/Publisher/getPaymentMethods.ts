import fetchWithJWT from 'util/fetchHelper';
import getApiURL from 'util/environmentHelper';

const getPaymentMethods = (): Promise<{
  responseData: {
    paymentMethods: {
      id: number;
      methodName: string;
      paymentGateway: string;
      logoUrl: string;
    }[];
    message: string;
    status: number;
  };
  errors: string;
}> => {
  const API_URL = getApiURL();

  return fetchWithJWT(`${API_URL}/payment-methods`, {
    method: 'GET'
  }).then((res) => res.json());
};

export default getPaymentMethods;
