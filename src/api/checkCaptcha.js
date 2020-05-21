const checkCaptcha = formName => {
  return fetch(
    `${ENVIRONMENT_CONFIGURATION.GB_API_URL}/captcha?form=${formName}`,
    {}
  ).then(res => res.json());
};

export default checkCaptcha;
