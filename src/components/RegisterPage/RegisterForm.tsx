import React, { useState, useEffect } from 'react';
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
  validateConsentsField
} from 'util/validators';
import { selectPublisherConfig } from 'appRedux/publisherConfigSlice';
import { selectPublisherConsents } from 'appRedux/publisherConsentsSlice';
import registerCustomer from 'api/Auth/registerCustomer';
import getCustomerLocales from 'api/Customer/getCustomerLocales';
import Auth from 'services/auth';
import { useAppSelector } from 'appRedux/store';
import { Consent as ConsentType } from 'types/Consents.types';
import { RegisterFormProps } from './RegisterForm.types';

type Errors = {
  email: string;
  password: string;
  consents: string;
};

const errorsInitialState = {
  email: '',
  password: '',
  consents: ''
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
  const [timeoutId, setTimeoutId] = useState<ReturnType<typeof setTimeout>>();
  const [processing, setProcessing] = useState(false);
  const [disableActionButton, setDisableActionButton] = useState(false);

  const { t } = useTranslation();
  const { publisherId } = useAppSelector(selectPublisherConfig);
  const { error: publisherConsentsError } = useAppSelector(
    selectPublisherConsents
  );

  useEffect(() => {
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

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
    const errorFields = {
      email: validateEmailField(email),
      password: validateRegisterPassword(password),
      consents: validateConsentsField(consents, consentDefinitions)
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

  const renderError = (message = 'An error occurred.') => {
    setProcessing(false);
    setGeneralError(
      message || t('register-form.error.general', 'An error occurred.')
    );
  };

  const register = async () => {
    setProcessing(true);
    const localesResponse = await getCustomerLocales();
    if (!localesResponse.responseData) {
      setProcessing(false);
      setGeneralError(t('register-form.error.general', 'An error occurred.'));
      return false;
    }
    const { locale, country, currency } = localesResponse.responseData;
    const response = await registerCustomer(
      email,
      password,
      publisherId,
      locale,
      country,
      currency
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
          t(
            'register-form.error.account',
            'You would need our product <a href="https://cleeng.com/core-ott-subscriber-management" target="_blank">Core</a> to call this API'
          )
        );
      } else {
        renderError(
          t('register-form.error.customer-exists', 'Customer already exists.')
        );
      }
    } else if (response.status === 429) {
      setDisableActionButton(true);
      renderError(
        t(
          'register-form.error.server-overloaded',
          'Server overloaded. Please try again later.'
        )
      );
      const timeoutIdValue = setTimeout(() => {
        setDisableActionButton(false);
        setGeneralError('');
      }, 10 * 1000);
      setTimeoutId(timeoutIdValue);
    } else {
      setProcessing(false);
      setGeneralError(t('register-form.error.general', 'An error occurred.'));
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
      <Button
        type='submit'
        size='big'
        variant='confirm'
        margin='10px 0'
        disabled={processing || disableActionButton || !!publisherConsentsError}
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
