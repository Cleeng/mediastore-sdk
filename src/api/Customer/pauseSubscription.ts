import fetchWithJWT from 'util/fetchHelper';
import getApiURL from 'util/environmentHelper';

const pauseSubscription = async (
  subscriptionId: number,
  resumesAfterBillingCycles: number
) => {
  const API_URL = getApiURL();

  const url = `${API_URL}/subscriptions/${subscriptionId}/pause`;

  const res = await fetchWithJWT(url, {
    method: 'POST',
    body: JSON.stringify({
      pauseDate: 'anniversary-date',
      resumesAfterBillingCycles
    })
  });

  const { responseData, errors } = await res.json();

  if (!res.ok) {
    throw new Error(errors[0]);
  }

  return responseData;
};

export default pauseSubscription;
