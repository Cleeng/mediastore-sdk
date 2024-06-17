import { getData } from 'util/appConfigHelper';
import fetchWithJWT from 'util/fetchHelper';
import getApiURL from 'util/environmentHelper';
import generateReturnUrl from 'util/returnUrlHelper';
import store from 'appRedux/store';

const submitPayment = async (paymentMethod, browserInfo, billingAddress) => {
  const API_URL = getApiURL();

  const orderId = parseInt(getData('CLEENG_ORDER_ID') || '0', 10);
  const url = `${API_URL}/connectors/adyen/initial-payment`;

  const {
    publisherConfig: { enable3DSRedirectFlow }
  } = store.getState();

  try {
    const res = await fetchWithJWT(url, {
      method: 'POST',
      body: JSON.stringify({
        orderId,
        paymentMethod,
        browserInfo,
        billingAddress,
        origin: window.location.origin,
        returnUrl: generateReturnUrl({ queryParams: { orderId } }),
        enable3DSRedirectFlow
      })
    });
    return res.json();
  } catch (e) {
    return e;
  }
};

export default submitPayment;
