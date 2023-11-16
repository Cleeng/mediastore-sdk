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

  return !error;
};

const isDateInPast = (date: Date) => {
  if (!date) return false;

  const now = new Date();

  if (date.setHours(0, 0, 0, 0) < now.setHours(0, 0, 0, 0)) {
    return true;
  }

  return false;
};

export const isDateInFuture = (date: Date) => {
  if (!date) return false;

  const now = new Date();

  return date.setHours(0, 0, 0, 0) > now.setHours(0, 0, 0, 0);
};

export const validateDeliveryDate = (value: string) => {
  const deliveryDate = new Date(value);

  let error = '';

  if (!value) {
    error = 'Missing delivery date';
  }

  if (isDateInPast(deliveryDate)) {
    error = 'Invalid delivery date';
  }

  store.dispatch(
    setFieldError({
      name: 'deliveryDate',
      error,
      translationKey: !value ? 'recipientForm.error.delivery-date' : ''
    })
  );

  return !error;
};

export const validateDeliveryTime = (value: string) => {
  let error = '';

  if (!value) {
    error = 'Missing delivery time';
  }

  store.dispatch(
    setFieldError({
      name: 'deliveryTime',
      error,
      translationKey: !value ? 'recipientForm.error.delivery-time' : ''
    })
  );

  return !error;
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

    return false;
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

  return doEmailsMatch;
};

export const validateDeliveryDetailsForm = () => {
  const {
    deliveryDetails: { recipientEmail, confirmRecipientEmail, deliveryDate }
  } = store.getState();

  const isRecipientEmailValid = validateRecipientEmail(
    recipientEmail.value as string
  );
  const isConfirmRecipientEmailValid = validateConfirmRecipientEmail(
    confirmRecipientEmail.value as string
  );
  const isDeliveryDateValid = validateDeliveryDate(
    deliveryDate.value as string
  );

  const areDeliveryDetailsValid =
    isRecipientEmailValid &&
    isConfirmRecipientEmailValid &&
    isDeliveryDateValid;

  return areDeliveryDetailsValid;
};
