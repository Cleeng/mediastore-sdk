/* istanbul ignore file */
export default function validatePasswordField(password) {
  let message = '';
  if (password === '') {
    message = 'Please fill out this field.';
  }
  return message;
}
