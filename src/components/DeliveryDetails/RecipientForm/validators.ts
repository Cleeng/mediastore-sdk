import store from 'redux/store';
import { setFieldError } from 'redux/deliveryDetailsSlice';
import { validateEmailField } from 'util/validators';

export const validateRecipientEmail = (value: string) => {
  const error = validateEmailField(value);

  const translationKey = !value
    ? 'recipientForm.error.missing-value'
    : 'recipientForm.error.bad-email-format';

  store.dispatch(
    setFieldError({
      name: 'recipientEmail',
      error,
      translationKey: error ? translationKey : ''
    })
  );
};

export const validateDeliveryDate = (value: string) => {
  store.dispatch(
    setFieldError({
      name: 'deliveryDate',
      error: !value ? 'Missing delivery date' : '',
      translationKey: !value ? 'recipientForm.error.delivery-date' : ''
    })
  );
};

export const validateConfirmRecipientEmail = (value: string) => {
  if (validateEmailField(value)) {
    store.dispatch(
      setFieldError({
        name: 'confirmRecipientEmail',
        error: validateEmailField(value),
        translationKey: !value
          ? 'recipientForm.error.missing-value'
          : 'recipientForm.error.bad-email-format'
      })
    );

    return;
  }

  const {
    deliveryDetails: { recipientEmail, confirmRecipientEmail }
  } = store.getState();

  const doEmailsMatch = recipientEmail.value === confirmRecipientEmail.value;

  store.dispatch(
    setFieldError({
      name: 'confirmRecipientEmail',
      error: doEmailsMatch ? '' : 'Email address doesn’t match',
      translationKey: doEmailsMatch
        ? ''
        : 'recipientForm.error.confirm-recipient-email.doesnt-match'
    })
  );
};

export const validateDeliveryDetailsForm = () => {
  const {
    deliveryDetails: { recipientEmail, confirmRecipientEmail, deliveryDate }
  } = store.getState();

  validateRecipientEmail(recipientEmail.value);
  validateConfirmRecipientEmail(confirmRecipientEmail.value);
  validateDeliveryDate(deliveryDate.value);

  const areDeliveryDetailsValid = !!(
    !validateEmailField(recipientEmail.value) &&
    !validateEmailField(confirmRecipientEmail.value) &&
    recipientEmail.value === confirmRecipientEmail.value &&
    deliveryDate.value
  );

  return areDeliveryDetailsValid;
};
