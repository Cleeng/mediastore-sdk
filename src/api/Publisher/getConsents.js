const getConsents = publisherId => {
  return fetch(
    `http://sls.cleeng.com:8000/mediastore-api/publishers/${publisherId}/consents`,
    { method: 'GET' }
  ).then(res => res.json());
};
export default getConsents;
