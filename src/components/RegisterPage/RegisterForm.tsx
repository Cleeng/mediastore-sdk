import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import submitConsents from 'api/Customer/submitConsents';
import Loader from 'components/Loader';
import Consent from 'components/Consents';
import { FromStyled, FormErrorStyled } from 'components/LoginPage/LoginStyled';
import Button from 'components/Button';
import EmailInput from 'components/EmailInput';
import PasswordInput from 'components/PasswordInput';
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
import { RegisterFormProps } from './RegisterForm.types';

type Errors = {
  email: string;
  password: string;
  consents: string;
  captcha: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const window: any;
window.recaptchaOptions = {
  enterprise: true
};

const errorsInitialState = {
  email: '',
  password: '',
  consents: '',
  captcha: ''
};

export const RegisterForm = ({ onSuccess }: RegisterFormProps) => {
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
  const { publisherId } = useAppSelector(selectPublisherConfig);
  const { error: publisherConsentsError } = useAppSelector(
    selectPublisherConsents
  );

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
    const captchaValue = recaptchaRef.current?.getValue();
    const errorFields = {
      email: validateEmailField(email),
      password: validateRegisterPassword(password),
      consents: validateConsentsField(consents, consentDefinitions),
      captcha: validateCaptcha(captchaValue)
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

  const resetCaptcha = () => {
    recaptchaRef.current?.reset();
  };

  const renderError = (message: string) => {
    setProcessing(false);
    resetCaptcha();
    setGeneralError(
      message || t('register-form.error.general', 'An error occurred.')
    );
  };

  const register = async () => {
    setProcessing(true);
    const captchaValue = recaptchaRef.current?.getValue();
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

    if (response.code === 'USER0002') {
      renderError(
        t('register-form.error.customer-exists', 'Customer already exists.')
      );
    } else if (
      response.errors[0] === 'Email verification failed.' &&
      response.code === 'REQ0001'
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
    await recaptchaRef.current?.executeAsync();
    if (validateFields()) {
      register();
    }
  };

  return (
    <FromStyled onSubmit={handleSubmit} noValidate>
      <FormErrorStyled>{generalError}</FormErrorStyled>
      <EmailInput
        label={t('register-form.label.email', 'Email')}
        value={email}
        error={errors.email}
        onChange={(val: string) => setEmail(val)}
        onBlur={validateEmail}
        required={false}
      />
      <PasswordInput
        label={t('register-form.label.password', 'Password')}
        floatingLabels={false}
        value={password}
        onChange={handlePasswordChange}
        onBlur={validatePassword}
        error={errors.password}
        showVisibilityIcon
        showPassword={showPassword}
        handleClickShowPassword={handleClickShowPassword}
        showPasswordStrength
        t={t}
      />
      <Consent error={errors.consents} onChangeFn={handleConsentsChange} />
      <ReCAPTCHA
        ref={recaptchaRef}
        size='invisible'
        badge='bottomright'
        sitekey='6Ld0A54qAAAAANJ8mLCpJAxEp0XKtJyueFmEFVaG'
        onChange={handleRecaptchaChange}
      />
      <>{errors.captcha}</>
      <Button
        type='submit'
        size='big'
        variant='confirm'
        margin='10px 0'
        disabled={processing || !!publisherConsentsError}
      >
        {processing ? (
          <Loader buttonLoader color='#ffffff' />
        ) : (
          t('register-form.button.register', 'Register')
        )}
      </Button>
    </FromStyled>
  );
};

export default RegisterForm;
