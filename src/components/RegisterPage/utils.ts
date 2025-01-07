const isCaptchaTokenString = (
  captchaToken: string | undefined | void
): captchaToken is string => {
  return (captchaToken?.length ?? -1) >= 0;
};

const normalizeCaptchaToken = (captchaToken: string | undefined | void) => {
  return isCaptchaTokenString(captchaToken) ? captchaToken : '';
};

export default normalizeCaptchaToken;
