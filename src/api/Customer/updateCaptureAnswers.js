import { getData } from 'util/appConfigHelper';
import fetchWithJWT from 'util/fetchHelper';
import getApiURL from 'util/environmentHelper';

const updateCaptureAnswers = async anwsers => {
  const API_URL = getApiURL();
  const customerId = getData('CLEENG_CUSTOMER_ID') || '';
  const url = `${API_URL}/customers/${customerId}/capture`;

  const payload = {
    firstName: anwsers.firstName || null,
    lastName: anwsers.lastName || null,
    address: anwsers.address || null,
    address2: anwsers.address2 || null,
    city: anwsers.city || null,
    state: anwsers.state || null,
    postCode: anwsers.postCode || null,
    country: anwsers.country || null,
    email: anwsers.email || null,
    birthDate: anwsers.birthDate || null,
    companyName: anwsers.companyName || null,
    phoneNumber: anwsers.phoneNumber || null,
    customAnswers: anwsers.customAnswers || null
  };

  const resp = await fetchWithJWT(url, {
    method: 'PUT',
    body: JSON.stringify(payload)
  });

  const json = await resp.json();

  return {
    status: resp.status,
    ...json
  };
};

export default updateCaptureAnswers;
