import i18n from 'i18next';

export function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; //eslint-disable-line
  return re.test(String(email).toLowerCase());
}

export function validateConsents(value, consentDefinitions) {
  return consentDefinitions.every(
    (consent, index) => !(consent.required && !value[index])
  );
}

export function validateConsentsField(value, consents) {
  if (!validateConsents(value, consents)) {
    return i18n.t(
      'validators.consents',
      'Please agree on all required consents to use this service'
    );
  }
  return '';
}

export function validatePasswordField(password) {
  if (password === '') {
    return i18n.t('validators.password', 'Please fill out this field.');
  }
  return '';
}

export function validateRegisterPassword(password) {
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

export function validateEmailField(value) {
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

export function validateCaptcha(value) {
  const message = 'Google reCAPTCHA verification required.';
  return value ? '' : message;
}
