import { getData } from 'util/appConfigHelper';
import fetchWithJWT from 'util/fetchHelper';
import getApiURL from 'util/environmentHelper';
import jwtDecode from 'jwt-decode';
import { PaymentGateway } from 'redux/publisherConfigSlice';

type GeneralPaymentDetail = {
  id: number;
  customerId: number;
  paymentGateway: PaymentGateway;
  paymentMethodId: number;
  active: boolean;
  bound: boolean;
};

type PaymentDetailCardGooglePay = GeneralPaymentDetail & {
  paymentMethod:
    | 'card'
    | 'googlepay'
    | 'paypal'
    | 'apple'
    | 'roku'
    | 'applepay'
    | 'amazon'
    | 'android';
  paymentMethodSpecificParams: {
    holderName: string;
    cardExpirationDate: string;
    lastCardFourDigits: string;
    merchantAccount: string;
    socialSecurityNumber: string;
    variant: 'visa' | 'visacredit' | 'amex' | 'mc' | 'discover' | 'diners';
  };
};

type PaymentDetailPayPal = GeneralPaymentDetail & {
  paymentMethod: 'paypal';
  paymentMethodSpecificParams: {
    payerId: string;
    holderName: string;
  };
};

export type PaymentDetail = PaymentDetailCardGooglePay | PaymentDetailPayPal;

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
