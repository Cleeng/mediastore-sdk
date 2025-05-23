import i18n from 'i18next';
import { EMAIL_REGEX } from 'util/regexConstants';

export function validateEmail(email: string) {
  return EMAIL_REGEX.test(String(email).toLowerCase());
}

export function validateConsents(value: any[], consentDefinitions: any[]) {
  return consentDefinitions.every(
    (consent, index) => !(consent.required && !value[index])
  );
}

export function validateConsentsField(value: any[], consents: any[]) {
  if (!validateConsents(value, consents)) {
    return i18n.t(
      'validators.consents',
      'Please agree on all required consents to use this service'
    );
  }
  return '';
}

export function validatePasswordField(password: string): string {
  if (password === '') {
    return i18n.t('validators.password', 'Please fill out this field.');
  }
  return '';
}

export function validateRegisterPassword(password: string): string {
  const re = /[0-9]+/;
  const validPassword = re.test(password) && password.length >= 8;

  if (password === '') {
    return i18n.t('validators.password', 'Please fill out this field.');
  }

  if (!validPassword) {
    return i18n.t(
      'validators.password-invalid',
      'Your password must contain at least 8 characters, including 1 digit.'
    );
  }

  return '';
}

export function validateEmailField(value: string): string {
  if (value === '') {
    return i18n.t('validators.email', 'Please fill out this field.');
  }

  if (!validateEmail(value)) {
    return i18n.t(
      'validators.email-invalid',
      'The email address is not properly formatted.'
    );
  }

  return '';
}

export function validateCaptcha(value: string | null | undefined): string {
  return value
    ? ''
    : i18n.t(
        'validators.captcha-invalid',
        'Google reCAPTCHA verification required.'
      );
}
