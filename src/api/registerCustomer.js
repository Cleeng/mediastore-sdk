const registerCustomer = async (email, password, offerId, consents) => {
  const url = `${ENVIRONMENT_CONFIGURATION.GB_API_URL}/customrs`;

  try {
    const resp = await fetch(url, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
        offerId,
        consents
      })
    });
    const json = await resp.json();
    return {
      status: resp.status,
      ...json
    };
  } catch (error) {
    return error;
  }
};

export default registerCustomer;
