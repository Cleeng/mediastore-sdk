import fetchWithJWT from 'util/fetchHelper';
import getApiURL from 'util/environmentHelper';
import generateReturnUrl from 'util/returnUrlHelper';
import store from 'appRedux/store';

const updateAdyenPaymentDetails = async (
  paymentMethod,
  browserInfo,
  billingAddress
) => {
  const API_URL = getApiURL();
  const url = `${API_URL}/connectors/adyen/payment-details`;
  const {
    paymentMethods: { selectedPaymentMethod }
  } = store.getState();
  const paymentMethodId = selectedPaymentMethod.id;
  try {
    const res = await fetchWithJWT(url, {
      method: 'POST',
      body: JSON.stringify({
        paymentMethod,
        paymentMethodId,
        browserInfo,
        billingAddress,
        origin: window.location.origin,
        returnUrl: generateReturnUrl({
          queryParams: { paymentMethodId },
          isMyAccount: true
        })
      })
    });
    return res.json();
  } catch (e) {
    return e;
  }
};

export default updateAdyenPaymentDetails;
