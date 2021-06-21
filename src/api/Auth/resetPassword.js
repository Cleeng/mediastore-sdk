const resetPassword = async (offerId, customerEmail, publisherId = '') => {
  const url = `https://mediastore-sandbox.cleeng.com/customers/passwords`;
  try {
    const res = await fetch(url, {
      method: 'PUT',
      body: JSON.stringify({ offerId, publisherId, customerEmail }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    });
    const json = await res.json();
    if (json.message) {
      return {
        ...json,
        errors: [json.message]
      };
    }
    return {
      status: res.status,
      ...json
    };
  } catch (error) {
    return {
      errors: [error.message]
    };
  }
};

export default resetPassword;
