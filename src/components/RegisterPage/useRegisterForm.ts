import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import submitConsents from 'api/Customer/submitConsents';
import {
  validateRegisterPassword,
  validateEmailField,
  validateConsentsField,
  validateCaptcha
} from 'util/validators';
import { selectPublisherConfig } from 'appRedux/publisherConfigSlice';
import { selectPublisherConsents } from 'appRedux/publisherConsentsSlice';
import registerCustomer from 'api/Auth/registerCustomer';
import getCustomerLocales from 'api/Customer/getCustomerLocales';
import Auth from 'services/auth';
import { useAppSelector } from 'appRedux/store';
import { Consent as ConsentType } from 'types/Consents.types';
import ReCAPTCHA from 'react-google-recaptcha';
import ERROR_CODES from 'util/errorCodes';

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

  const { t } = useTranslation();
  const { publisherId, googleRecaptcha } = useAppSelector(
    selectPublisherConfig
  );
  const { error: publisherConsentsError } = useAppSelector(
    selectPublisherConsents
  );

  const { showCaptchaOnRegister } = googleRecaptcha;

  const recaptchaRef = useRef<ReCAPTCHA>(null);

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

  const validateFields = () => {
    const captchaValue = recaptchaRef?.current?.getValue();

    console.log('##### useRegisterForm > validateFields', {
      captchaValue,
      showCaptchaOnRegister,
      validationREsult: validateCaptcha(captchaValue)
    });

    const errorFields = {
      email: validateEmailField(email),
      password: validateRegisterPassword(password),
      consents: validateConsentsField(consents, consentDefinitions),
      captcha: showCaptchaOnRegister ? validateCaptcha(captchaValue) : ''
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
    console.log('##### useRegisterForm > handleRecaptchaChange');

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

  const register = async () => {
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
      captchaValue: recaptchaRef?.current?.getValue() || ''
    });

    if (response.code === ERROR_CODES.USER.ALREADY_EXISTS) {
      renderError(
        t('register-form.error.customer-exists', 'Customer already exists.')
      );
    } else if (
      response.errors[0] === 'Email verification failed.' &&
      response.code === ERROR_CODES.REQUEST.INVALID_REQUEST_BODY
    ) {
      renderError(
        t(
          'register-form.error.email-verification-failed',
          "We couldn't verify the email address you entered. Please check it for accuracy and try again. If you're sure the address is correct and still see this message, you may need to use a different email or contact support for help."
        )
      );
    } else if (response.code) {
      renderError(t('register-form.error.general', 'An error occurred.'));
    }

    Auth.login(
      false,
      true,
      email,
      response?.responseData?.jwt,
      response?.responseData?.refreshToken,
      submitConsents,
      [consents, consentDefinitions],
      onSuccess
    );

    return true;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log('############ useRegisterForm > handleSubmit');

    if (showCaptchaOnRegister) {
      console.log(
        '############ useRegisterForm > handleSubmit > should show captcha case > before',
        {
          recaptchaRef: recaptchaRef.current,
          executeAsync: recaptchaRef?.current?.executeAsync
        }
      );
      await recaptchaRef?.current?.execute();
      // await recaptchaRef?.current?.executeAsync();
      console.log(
        '############ useRegisterForm > handleSubmit > should show captcha case > after',
        {
          recaptchaRef: recaptchaRef.current,
          executeAsync: recaptchaRef?.current?.executeAsync
        }
      );
    }

    console.log(
      '########## useRegisterForm > handleSubmit > before validateFields',
      {
        validateFields: validateFields()
      }
    );

    if (validateFields()) {
      console.log(
        '########## useRegisterForm > handleSubmit > after validateFields'
      );
      register();
    }

    console.log('########## useRegisterForm > handleSubmit > end');
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