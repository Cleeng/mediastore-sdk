import { useTranslation } from 'react-i18next';
import Loader from 'components/Loader';
import Consent from 'components/Consents';
import { FromStyled, FormErrorStyled } from 'components/LoginPage/LoginStyled';
import Button from 'components/Button';
import EmailInput from 'components/EmailInput';
import PasswordInput from 'components/PasswordInput';
import ReCAPTCHA from 'react-google-recaptcha';
import { RegisterFormProps } from './RegisterForm.types';
import useRegisterForm from './useRegisterForm';

window.recaptchaOptions = {
  enterprise: true
};

export const RegisterForm = ({ onSuccess }: RegisterFormProps) => {
  const {
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
  } = useRegisterForm({ onSuccess });

  const { t } = useTranslation();
  const { showCaptchaOnRegister, sitekey } = googleRecaptcha;

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
      />
      <Consent error={errors.consents} onChangeFn={handleConsentsChange} />
      {showCaptchaOnRegister && (
        <>
          <ReCAPTCHA
            ref={recaptchaRef}
            size='invisible'
            badge='bottomright'
            sitekey={sitekey}
            onChange={handleRecaptchaChange}
          />
          <>{errors.captcha}</>
        </>
      )}
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
