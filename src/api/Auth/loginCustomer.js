const loginCustomer = async (email, password, loginBy, captcha) => {
  const url = `${ENVIRONMENT_CONFIGURATION.GB_API_URL}/auths`;

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
        ...loginBy,
        captcha
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

export default loginCustomer;
