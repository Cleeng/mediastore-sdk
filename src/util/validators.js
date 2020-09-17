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
    return 'Please agree on all consents to use this service';
  }
  return '';
}

export function validatePasswordField(password) {
  let message = '';
  if (password === '') {
    message = 'Please fill out this field.';
  }
  return message;
}

export function validateRegisterPassword(password) {
  let message = '';
  const re = /[0-9]+/;
  const validPassword = re.test(password) && password.length >= 8;
  if (password === '') {
    message = 'Please fill out this field.';
  } else if (!validPassword) {
    message =
      'Your password must contain at least 8 characters, including 1 digit.';
  }
  return message;
}

export function validateEmailField(value) {
  let message = '';
  if (!validateEmail(value)) {
    message = 'The email address is not properly formatted.';
  }
  if (value === '') {
    message = 'Please fill out this field.';
  }

  return message;
}
