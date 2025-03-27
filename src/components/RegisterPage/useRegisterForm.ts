import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import submitConsents from 'api/Customer/submitConsents';
import {
  validateRegisterPassword,
  validateEmailField,
  validateConsentsField
} from 'util/validators';
import { selectPublisherConfig } from 'appRedux/publisherConfigSlice';
import { selectPublisherConsents } from 'appRedux/publisherConsentsSlice';
import registerCustomer from 'api/Auth/registerCustomer';
import getCustomerLocales from 'api/Customer/getCustomerLocales';
import Auth from 'services/auth';
import { useAppSelector } from 'appRedux/store';
import { Consent as ConsentType } from 'types/Consents.types';
import ERROR_CODES from 'util/errorCodes';
import useCaptchaVerification from 'hooks/useCaptchaVerification';

type Errors = {
  email: string;
  password: string;
  consents: string;
  captcha: string;
};

const errorsInitialState = {
  email: '',
  password: '',
  consents: '',
  captcha: ''
};

type UseRegisterFormProps = {
  onSuccess: () => void;
};

function useRegisterForm({ onSuccess }: UseRegisterFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [consents, setConsents] = useState<boolean[]>([]);
  const [errors, setErrors] = useState<Errors>(errorsInitialState);
  const [generalError, setGeneralError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [consentDefinitions, setConsentDefinitions] = useState<ConsentType[]>(
    []
  );
  const [processing, setProcessing] = useState(false);
  const {
    recaptchaRef,
    showCaptchaOnRegister,
    getCaptchaToken,
    validateCaptchaToken
  } = useCaptchaVerification();

  const { t } = useTranslation();
  const { publisherId, googleRecaptcha } = useAppSelector(
    selectPublisherConfig
  );
  const { error: publisherConsentsError } = useAppSelector(
    selectPublisherConsents
  );

  const handleClickShowPassword = () =>
    setShowPassword((prevValue) => !prevValue);

  const validateEmail = () => {
    const message = validateEmailField(email);
    setErrors((prevValue) => {
      return {
        ...prevValue,
        email: message
      };
    });
  };

  const validatePassword = () => {
    const message = validateRegisterPassword(password);
    setErrors((prevValue) => {
      return {
        ...prevValue,
        password: message
      };
    });
  };

  const validateFields = (captchaValue: string) => {
    const errorFields = {
      email: validateEmailField(email),
      password: validateRegisterPassword(password),
      consents: validateConsentsField(consents, consentDefinitions),
      captcha: showCaptchaOnRegister ? validateCaptchaToken(captchaValue) : ''
    };
    setErrors(errorFields);
    return !Object.values(errorFields).some((error) => error !== '');
  };

  const handleConsentsChange = (
    value: boolean[],
    consentDefinitionsParam: ConsentType[]
  ) => {
    setConsents(value);
    setConsentDefinitions(consentDefinitionsParam);
    setErrors((prevValue) => {
      return {
        ...prevValue,
        consents: ''
      };
    });
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    setErrors((prevValue) => {
      return {
        ...prevValue,
        password: ''
      };
    });
  };

  const handleRecaptchaChange = () => {
    setErrors((prevValue) => {
      return {
        ...prevValue,
        captcha: ''
      };
    });
  };

  const renderError = (message: string) => {
    setProcessing(false);
    if (showCaptchaOnRegister) recaptchaRef?.current?.reset();
    setGeneralError(
      message || t('register-form.error.general', 'An error occurred.')
    );
  };

  const register = async (captchaValue = ''): Promise<boolean> => {
    setProcessing(true);
    const localesResponse = await getCustomerLocales();
    if (!localesResponse.responseData) {
      setProcessing(false);
      renderError(t('register-form.error.general', 'An error occurred.'));
      return false;
    }
    const { locale, country, currency } = localesResponse.responseData;

    const response = await registerCustomer({
      email,
      password,
      publisherId,
      locale,
      country,
      currency,
      captchaValue
    });

    if (!response.code) {
      Auth.login(
        email,
        response?.responseData?.jwt,
        response?.responseData?.refreshToken,
        false,
        true,
        submitConsents,
        [consents, consentDefinitions],
        onSuccess
      );
      return true;
    }

    switch (response.code) {
      case ERROR_CODES.USER.ALREADY_EXISTS:
        renderError(
          t('register-form.error.customer-exists', 'Customer already exists.')
        );
        break;
      case ERROR_CODES.REQUEST.INVALID_REQUEST_BODY:
        if (response.errors[0] === 'Email verification failed.') {
          renderError(
            t(
              'register-form.error.email-verification-failed',
              "We couldn't verify the email address you entered. Please check it for accuracy and try again. If you're sure the address is correct and still see this message, you may need to use a different email or contact support for help."
            )
          );
        }
        break;
      case ERROR_CODES.CAPTCHA.VERIFICATION_FAILED:
        renderError(
          t(
            'register-form.error.captcha-verification-failed',
            'An error occurred during registration. Please try again later. If the issue persists, please reach out to our support team for assistance.'
          )
        );
        break;
      default:
        renderError(t('register-form.error.general', 'An error occurred.'));
        break;
    }

    return false;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    let captchaToken = '';

    if (showCaptchaOnRegister) {
      const { captchaToken: fetchedCaptchaToken } = await getCaptchaToken();
      captchaToken = fetchedCaptchaToken;
    }

    if (validateFields(captchaToken)) {
      register(captchaToken);
    }
  };

  return {
    handleClickShowPassword,
    validateEmail,
    validatePassword,
    handleConsentsChange,
    handlePasswordChange,
    handleRecaptchaChange,
    handleSubmit,
    setEmail,
    errors,
    generalError,
    showPassword,
    processing,
    publisherConsentsError,
    email,
    password,
    recaptchaRef,
    googleRecaptcha
  };
}

export default useRegisterForm;
