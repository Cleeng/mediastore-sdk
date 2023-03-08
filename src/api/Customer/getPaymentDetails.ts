import { getData } from 'util/appConfigHelper';
import fetchWithJWT from 'util/fetchHelper';
import getApiURL from 'util/environmentHelper';
import jwtDecode from 'jwt-decode';

type PaymentDetail = {
  active: boolean;
  bound: boolean;
  customerId: number;
  id: number;
  paymentGateway: string;
  paymentMethod: string;
  paymentMethodId: number;
  paymentMethodSpecificParams: {
    cardExpirationDate: string;
    holderName: string;
    lastCardFourDigits: string;
    merchantAccount: string;
    socialSecurityNumber: string;
    variant: string;
  };
};

const getPaymentDetails = async (): Promise<{
  paymentDetails: PaymentDetail[];
}> => {
  const API_URL = getApiURL();
  const { customerId } = jwtDecode<{ customerId: number }>(
    getData('CLEENG_AUTH_TOKEN')
  );

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
