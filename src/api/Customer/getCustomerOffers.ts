import { getData } from 'util/appConfigHelper';
import fetchWithJWT from 'util/fetchHelper';
import getApiURL from 'util/environmentHelper';
import jwtDecode from 'jwt-decode';
import { PaymentGateway } from 'redux/publisherConfigSlice';

type CustomersOffer = {
  expiresAt: number;
  externalPaymentId: string;
  inTrial: boolean;
  nextPaymentAt: number;
  nextPaymentCurrency: string;
  nextPaymentPrice: number;
  offerId: string;
  offerTitle: string;
  offerType: string;
  paymentGateway: PaymentGateway;
  paymentMethod: string;
  pendingSwitchId: unknown;
  period: string;
  startedAt: number;
  status: string;
  subscriptionId: number;
  totalPrice: number;
};

const getCustomerOffers = async (): Promise<{ items: CustomersOffer[] }> => {
  const API_URL = getApiURL();
  const { customerId } = jwtDecode<{ customerId: number }>(
    getData('CLEENG_AUTH_TOKEN')
  );

  const url = `${API_URL}/customers/${customerId}/offers`;
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

export default getCustomerOffers;
