/* istanbul ignore file */
import { validateEmail } from '../../services/helper';

export default function validateEmailField(value) {
  let message = '';
  if (!validateEmail(value)) {
    message = 'The email address is not properly formatted.';
  }
  if (value === '') {
    message = 'Please fill out this field.';
  }

  return message;
}
