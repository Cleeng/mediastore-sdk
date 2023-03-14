import { getData } from 'util/appConfigHelper';
import fetchWithJWT from 'util/fetchHelper';
import getApiURL from 'util/environmentHelper';
import jwtDecode from 'jwt-decode';
import { PaymentGateway } from 'redux/publisherConfigSlice';

type GeneralCustomerOffer = {
  offerId: string;
  status: string;
  startedAt: number;
  expiresAt: number;
  offerType: string;
  totalPrice: number;
  offerTitle: string;
};

type CustomerOffer =
  | (GeneralCustomerOffer & {
      externalPaymentId: string;
      inTrial: boolean;
      nextPaymentAt: number;
      nextPaymentCurrency: string;
      nextPaymentPrice: number;
      paymentGateway: PaymentGateway;
      paymentMethod: string;
      pendingSwitchId: unknown;
      period: string;
      subscriptionId?: number;
    })
  | (GeneralCustomerOffer & { customerCurrency: string });

const getCustomerOffers = async (): Promise<{ items: CustomerOffer[] }> => {
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
