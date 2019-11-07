import { validateConsents } from '../../services/helper';

export default function validateConsentsField(value, consents) {
  if (!validateConsents(value, consents)) {
    return 'Please agree on all consents to use this service';
  }
  return '';
}
