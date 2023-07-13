// import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from 'redux/store';
import {
  selectDeliveryDetails,
  setFieldValue
} from 'redux/deliveryDetailsSlice';
import MyAccountInput from 'components/MyAccountInput';
import {
  InfoText,
  MessageWrapper,
  StyledRecipientForm,
  StyledLabel,
  StyledMessage
} from './RecipientFormStyled';
import {
  validateConfirmRecipientEmail,
  validateDeliveryDate,
  validateRecipientEmail
} from './validators';

const RecipientForm = () => {
  const {
    recipientEmail,
    confirmRecipientEmail,
    deliveryDate,
    message
  } = useAppSelector(selectDeliveryDetails);

  const dispatch = useAppDispatch();

  const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const {
      target: { name, value }
    } = e;

    switch (name) {
      case 'recipientEmail':
        validateRecipientEmail(value);
        break;
      case 'confirmRecipientEmail':
        validateConfirmRecipientEmail(value);
        break;
      case 'deliveryDate':
        validateDeliveryDate(value);
        break;
      default:
        break;
    }
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
        onBlur={onBlur}
        onChange={onChange}
        type="email"
        value={recipientEmail.value}
      />
      <MyAccountInput
        error={confirmRecipientEmail.error}
        label="Confirm recipient email" // add translation
        name="confirmRecipientEmail"
        onBlur={onBlur}
        onChange={onChange}
        type="email"
        value={confirmRecipientEmail.value}
      />
      <MyAccountInput
        error={deliveryDate.error}
        label="Delivery date" // add translation
        min={new Date().toISOString().split('T')[0]}
        name="deliveryDate"
        onBlur={onBlur}
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
