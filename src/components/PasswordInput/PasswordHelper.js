/* istanbul ignore file */
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
  const validPassword = re.test(password) && password.length >= 6;
  if (password === '') {
    message = 'Please fill out this field.';
  } else if (!validPassword) {
    message =
      'Your password must contain at least 6 characters, including 1 digit.';
  }
  return message;
}
