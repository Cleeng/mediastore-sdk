import { getData } from 'util/appConfigHelper';
import fetchWithJWT from 'util/fetchHelper';
import getApiURL from 'util/environmentHelper';
import generateReturnUrl from 'util/returnUrlHelper';

const createPaymentSession = async (isMyAccount = false, type) => {
  const API_URL = getApiURL();

  const orderId = parseInt(getData('CLEENG_ORDER_ID') || '0', 10);

  const url = `${API_URL}/connectors/adyen/sessions`;

  try {
    const res = await fetchWithJWT(url, {
      method: 'POST',
      body: isMyAccount
        ? JSON.stringify({
            returnUrl: generateReturnUrl({ isMyAccount: true }),
            filterPaymentMethods: type
          })
        : JSON.stringify({
            orderId,
            filterPaymentMethods: type,
            returnUrl: generateReturnUrl({
              queryParams: { orderId }
            })
          })
    });
    return res.json();
  } catch (e) {
    return e;
  }
};

export default createPaymentSession;
