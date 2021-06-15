const getConsents = publisherId => {
  console.log(`https://mediastore-sandbox.cleeng.com/publishers/${publisherId}/consents`);
  return fetch(
    `https://mediastore-sandbox.cleeng.com/publishers/${publisherId}/consents`,
    { method: 'GET' }
  ).then(res => res.json());
};

export default getConsents;
