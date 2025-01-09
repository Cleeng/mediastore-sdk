import { selectPublisherConfig } from 'appRedux/publisherConfigSlice';
import { useAppSelector } from 'appRedux/store';
import { useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { normalizeCaptchaToken } from 'util/captcha';
import { validateCaptcha } from 'util/validators';

interface VerifyCaptchaResult {
  recaptchaError: string;
  hasCaptchaSucceeded: boolean;
  captchaToken: string;
}

const useCaptchaVerification = () => {
  const {
    googleRecaptcha: { showCaptchaOnPurchase, showCaptchaOnRegister, sitekey }
  } = useAppSelector(selectPublisherConfig);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const validateCaptchaToken = (recaptchaToken: string) => {
    const captchaError = validateCaptcha(recaptchaToken);

    return captchaError;
  };

  const getCaptchaToken = async (): Promise<VerifyCaptchaResult> => {
    const fetchedCaptchaToken = await recaptchaRef.current?.execute();
    const normalizedCaptchaToken = normalizeCaptchaToken(fetchedCaptchaToken);

    const recaptchaValidationError = validateCaptchaToken(
      normalizedCaptchaToken
    );

    return {
      recaptchaError: recaptchaValidationError,
      hasCaptchaSucceeded: !recaptchaValidationError,
      captchaToken: normalizedCaptchaToken
    };
  };

  return {
    recaptchaRef,
    showCaptchaOnPurchase,
    showCaptchaOnRegister,
    sitekey,
    getCaptchaToken,
    validateCaptchaToken
  };
};

export default useCaptchaVerification;
