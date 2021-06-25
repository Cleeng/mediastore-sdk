const getConsents = publisherId => {
  return fetch(
    `https://mediastoreapi-sandbox.cleeng.com/publishers/${publisherId}/consents`,
    { method: 'GET' }
  ).then(res => res.json());
};
export default getConsents;
