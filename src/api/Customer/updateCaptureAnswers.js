import jwtDecode from 'jwt-decode';
import { getData } from 'util/appConfigHelper';

const updateCaptureAnswers = async anwsers => {
  const token = getData('CLEENG_AUTH_TOKEN') || '';
  const decoded = jwtDecode(token);
  const { customerId } = decoded;

  const url = `${ENVIRONMENT_CONFIGURATION.API_URL}/customers/${customerId}/capture`;

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

  const resp = await fetch(url, {
    method: 'PUT',
    body: JSON.stringify(payload),
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const json = await resp.json();

  return {
    status: resp.status,
    ...json
  };
};

export default updateCaptureAnswers;
