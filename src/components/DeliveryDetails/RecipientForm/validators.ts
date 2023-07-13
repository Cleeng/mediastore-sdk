import store from 'redux/store';
import { setFieldError } from 'redux/deliveryDetailsSlice';
import { validateEmailField } from 'util/validators';

export const validateRecipientEmail = (value: string) => {
  store.dispatch(
    setFieldError({
      name: 'recipientEmail',
      error: validateEmailField(value)
    })
  );
};

export const validateDeliveryDate = (value: string) => {
  store.dispatch(
    setFieldError({
      name: 'deliveryDate',
      error: !value ? 'Missing delivery date' : ''
    })
  );
};

export const validateConfirmRecipientEmail = (value: string) => {
  if (validateEmailField(value)) {
    store.dispatch(
      setFieldError({
        name: 'confirmRecipientEmail',
        error: validateEmailField(value)
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
      error: doEmailsMatch ? '' : 'Email address doesn’t match'
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
