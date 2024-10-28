import { getData } from 'util/appConfigHelper';
import fetchWithJWT from 'util/fetchHelper';
import getApiURL from 'util/environmentHelper';
import generateReturnUrl from 'util/returnUrlHelper';

const createPaymentSession = async (
  type,
  visiblePaymentMethods,
  isMyAccount = false
) => {
  const API_URL = getApiURL();

  const orderId = parseInt(getData('CLEENG_ORDER_ID') || '0', 10);

  const url = `${API_URL}/connectors/adyen/sessions`;

  const res = await fetchWithJWT(url, {
    method: 'POST',
    body: isMyAccount
      ? JSON.stringify({
          filterPaymentMethodsByType: type,
          filterPaymentMethods: visiblePaymentMethods,
          returnUrl: generateReturnUrl({ isMyAccount: true })
        })
      : JSON.stringify({
          orderId,
          filterPaymentMethodsByType: type,
          filterPaymentMethods: visiblePaymentMethods,
          returnUrl: generateReturnUrl({
            queryParams: { orderId }
          })
        })
  });

  const { responseData, errors } = await res.json();

  if (!res.ok) {
    throw new Error(errors[0]);
  }

  return responseData;
};

export default createPaymentSession;
