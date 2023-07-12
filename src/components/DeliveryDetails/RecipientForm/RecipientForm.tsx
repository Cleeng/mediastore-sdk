// import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from 'redux/store';
import {
  selectDeliveryDetails,
  setFieldValue
} from 'redux/deliveryDetailsSlice';
import MyAccountInput from 'components/MyAccountInput';
import { validateEmailField } from 'util/validators';
import {
  InfoText,
  MessageWrapper,
  StyledRecipientForm,
  StyledLabel,
  StyledMessage
} from './RecipientFormStyled';

const RecipientForm = () => {
  const {
    recipientEmail,
    confirmRecipientEmail,
    deliveryDate,
    message
  } = useAppSelector(selectDeliveryDetails);

  const dispatch = useAppDispatch();

  // const { t } = useTranslation();

  const validateRecipientEmail = (e: React.FocusEvent<HTMLInputElement>) => {
    const {
      target: { value, name }
    } = e;

    dispatch(setFieldValue({ name, value, error: validateEmailField(value) }));
  };

  const validateDeliveryDate = (e: React.FocusEvent<HTMLInputElement>) => {
    const {
      target: { value, name }
    } = e;

    dispatch(
      setFieldValue({
        name,
        value,
        error: !value ? 'Missing delivery date' : ''
      })
    );
  };

  const validateConfirmRecipientEmail = (
    e: React.FocusEvent<HTMLInputElement>
  ) => {
    const {
      target: { value, name }
    } = e;

    if (validateEmailField(value)) {
      dispatch(
        setFieldValue({ name, value, error: validateEmailField(value) })
      );
    }

    const doEmailsMatch = recipientEmail.value === confirmRecipientEmail.value;

    dispatch(
      setFieldValue({
        name,
        value,
        error: doEmailsMatch ? '' : 'Email address doesn’t match'
      })
    );
  };

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const {
      target: { name, value }
    } = e;

    dispatch(setFieldValue({ name, value }));
  };

  return (
    <StyledRecipientForm noValidate>
      <MyAccountInput
        error={recipientEmail.error}
        label="Recipient email" // add translation
        name="recipientEmail"
        onBlur={validateRecipientEmail}
        onChange={onChange}
        type="email"
        value={recipientEmail.value}
      />
      <MyAccountInput
        error={confirmRecipientEmail.error}
        label="Confirm recipient email" // add translation
        name="confirmRecipientEmail"
        onBlur={validateConfirmRecipientEmail}
        onChange={onChange}
        type="email"
        value={confirmRecipientEmail.value}
      />
      <MyAccountInput
        label="Delivery date" // add translation
        min={new Date().toISOString().split('T')[0]}
        name="deliveryDate"
        onBlur={validateDeliveryDate}
        onChange={onChange}
        type="date"
        value={deliveryDate.value}
      />
      <MessageWrapper>
        <StyledLabel>Add a message</StyledLabel>
        <StyledMessage
          maxLength={150}
          name="message"
          onChange={onChange}
          rows={3}
          value={message.value}
        />
      </MessageWrapper>
      <InfoText>
        To edit your gift delivery details, access MyAccount and click on the
        corresponding transaction.
      </InfoText>
    </StyledRecipientForm>
  );
};

export default RecipientForm;
