import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ReCAPTCHA from 'react-google-recaptcha';
import {
  validateRegisterPassword,
  validateEmailField,
  validateConsentsField,
  validateCaptcha
} from 'util/validators';
import { selectPublisherConfig } from 'redux/publisherConfigSlice';
import { fetchSettings, selectSettings } from 'redux/settingsSlice';
import { selectPublisherConsents } from 'redux/publisherConsentsSlice';
import { useAppDispatch, useAppSelector } from 'redux/store';
import registerCustomer from 'api/Auth/registerCustomer';
import getCustomerLocales from 'api/Customer/getCustomerLocales';
import submitConsents from 'api/Customer/submitConsents';
import Auth from 'services/auth';
import Loader from 'components/Loader';
import Consent from 'components/Consents';
import { FromStyled, FormErrorStyled } from 'components/LoginPage/LoginStyled';
import Button from 'components/Button';
import EmailInput from 'components/EmailInput';
import PasswordInput from 'components/PasswordInput';
import { Consent as ConsentType } from 'types/Consents.types';
import { RegisterFormProps } from './RegisterForm.types';
import { RecaptchaError, RecaptchaWrapper } from './RegisterFormStyled';

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

export const Register = ({ onSuccess }: RegisterFormProps) => {
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
  const [disableActionButton, setDisableActionButton] = useState(false);

  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { publisherId } = useAppSelector(selectPublisherConfig);
  const { error: publisherConsentsError } = useAppSelector(
    selectPublisherConsents
  );
  const { settings, loading } = useAppSelector(selectSettings);
  const recaptchaRef = React.createRef<ReCAPTCHA>();

  useEffect(() => {
    if (publisherId) dispatch(fetchSettings(publisherId));
  }, []);

  const handleClickShowPassword = () =>
    setShowPassword(prevValue => !prevValue);

  const validateEmail = () => {
    const message = validateEmailField(email);
    setErrors(prevValue => {
      return {
        ...prevValue,
        email: t(message)
      };
    });
  };

  const validatePassword = () => {
    const message = validateRegisterPassword(password);
    setErrors(prevValue => {
      return {
        ...prevValue,
        password: t(message)
      };
    });
  };

  const validateFields = () => {
    const recaptchaValue = recaptchaRef.current?.getValue();
    const errorFields: Errors = {
      email: t(validateEmailField(email)),
      password: t(validateRegisterPassword(password)),
      consents: t(validateConsentsField(consents, consentDefinitions)),
      captcha: settings?.isCaptchaRequired
        ? t(validateCaptcha(recaptchaValue))
        : ''
    };
    setErrors(errorFields);
    return !(Object.keys(errorFields) as Array<keyof Errors>).find(
      key => errorFields[key] !== ''
    );
  };

  const handleConsentsChange = (
    value: boolean[],
    consentDefinitionsParam: ConsentType[]
  ) => {
    setConsents(value);
    setConsentDefinitions(consentDefinitionsParam);
    setErrors(prevValue => {
      return {
        ...prevValue,
        consents: ''
      };
    });
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    setErrors(prevValue => {
      return {
        ...prevValue,
        password: ''
      };
    });
  };

  const handleRecaptchaChange = () => {
    setErrors(prevValue => {
      return {
        ...prevValue,
        captcha: ''
      };
    });
  };

  const renderError = (message = 'An error occurred.') => {
    setProcessing(false);
    setGeneralError(t(message));
  };

  const register = async () => {
    setProcessing(true);
    const recaptchaValue = recaptchaRef.current?.getValue();
    const localesResponse = await getCustomerLocales();
    if (!localesResponse.responseData) {
      setProcessing(false);
      setGeneralError(t('An error occurred.'));
      return false;
    }
    const { locale, country, currency } = localesResponse.responseData;
    const response = await registerCustomer(
      email,
      password,
      publisherId,
      locale,
      country,
      currency,
      recaptchaValue
    );
    if (response.status === 200) {
      Auth.login(
        false,
        true,
        email,
        response.responseData.jwt,
        response.responseData.refreshToken,
        submitConsents,
        [consents, consentDefinitions],
        onSuccess
      );
    } else if (response.status === 422) {
      if (response.errors[0].includes('Enterprise account is required')) {
        renderError(
          'You would need our product <a href="https://cleeng.com/core-ott-subscriber-management" target="_blank">Core</a> to call this API'
        );
      } else {
        renderError('Customer already exists.');
      }
    } else if (response.status === 429) {
      setDisableActionButton(true);
      renderError('Server overloaded. Please try again later.');
      setTimeout(() => {
        setDisableActionButton(false);
        setGeneralError('');
      }, 10 * 1000);
    } else {
      setProcessing(false);
      setGeneralError(t('An error occurred.'));
    }
    return true;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (validateFields()) {
      register();
    }
  };

  return (
    <FromStyled onSubmit={handleSubmit} noValidate>
      <FormErrorStyled dangerouslySetInnerHTML={{ __html: generalError }} />
      <EmailInput
        label={t('Email')}
        floatingLabels={false}
        value={email}
        onChange={e => setEmail(e)}
        onBlur={validateEmail}
        error={errors.email}
      />
      <PasswordInput
        label={t('Password')}
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
      {settings?.isCaptchaRequired && !loading && (
        <RecaptchaWrapper>
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey="6Ld3D5UpAAAAAOBQUGtg2JrPwjO3O7bgdbPlNRJ6"
            onChange={handleRecaptchaChange}
          />
          <RecaptchaError>{errors.captcha}</RecaptchaError>
        </RecaptchaWrapper>
      )}
      <Button
        type="submit"
        size="big"
        theme="confirm"
        margin="10px 0"
        disabled={processing || disableActionButton || !!publisherConsentsError}
      >
        {processing ? <Loader buttonLoader color="#ffffff" /> : t('Register')}
      </Button>
    </FromStyled>
  );
};

export default Register;
