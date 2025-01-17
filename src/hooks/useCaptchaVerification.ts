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

  console.log('[CaptchaVerification] Hook initialized with config:', {
    showCaptchaOnPurchase,
    showCaptchaOnRegister,
    hasSitekey: !!sitekey
  });

  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const validateCaptchaToken = (recaptchaToken: string) => {
    console.log('[CaptchaVerification] Validating token:', {
      hasToken: !!recaptchaToken,
      tokenLength: recaptchaToken?.length
    });

    const captchaError = validateCaptcha(recaptchaToken);
    console.log('[CaptchaVerification] Validation result:', {
      hasError: !!captchaError,
      error: captchaError
    });

    return captchaError;
  };

  const getCaptchaToken = async (): Promise<VerifyCaptchaResult> => {
    console.log('[CaptchaVerification] Getting captcha token...');

    if (!recaptchaRef.current) {
      console.error('[CaptchaVerification] ReCAPTCHA ref is not initialized');
    }

    const fetchedCaptchaToken = await recaptchaRef.current?.execute();
    console.log(
      '[CaptchaVerification] Raw token received:',
      !!fetchedCaptchaToken
    );

    const normalizedCaptchaToken = normalizeCaptchaToken(fetchedCaptchaToken);
    console.log('[CaptchaVerification] Token normalized:', {
      hasToken: !!normalizedCaptchaToken,
      tokenLength: normalizedCaptchaToken?.length
    });

    const recaptchaValidationError = validateCaptchaToken(
      normalizedCaptchaToken
    );

    const result = {
      recaptchaError: recaptchaValidationError,
      hasCaptchaSucceeded: !recaptchaValidationError,
      captchaToken: normalizedCaptchaToken
    };

    console.log('[CaptchaVerification] Final result:', {
      hasError: !!result.recaptchaError,
      succeeded: result.hasCaptchaSucceeded,
      hasToken: !!result.captchaToken
    });

    return result;
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
