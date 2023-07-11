import { useState } from 'react';
// import { useTranslation } from 'react-i18next';
import MyAccountInput from 'components/MyAccountInput';
import { validateEmailField } from 'util/validators';
import {
  InfoText,
  MessageWrapper,
  StyledRecipientForm,
  StyledLabel,
  StyledMessage,
  StyledButton
} from './RecipientFormStyled';

const RecipientForm = () => {
  const [recipientEmail, setRecipientEmail] = useState({
    value: '',
    error: ''
  });

  const [confirmRecipientEmail, setConfirmRecipientEmail] = useState({
    value: '',
    error: ''
  });

  const [deliveryDate, setDeliveryDate] = useState({
    value: '',
    error: ''
  });

  const [message, setMessage] = useState('');

  // const { t } = useTranslation();

  const validateRecipientEmail = (value: string) => {
    setRecipientEmail(curr => ({ ...curr, error: validateEmailField(value) }));
  };

  const validateConfirmRecipientEmail = (value: string) => {
    if (validateEmailField(value)) {
      setConfirmRecipientEmail(curr => ({
        ...curr,
        error: validateEmailField(value)
      }));
    }

    const doEmailsMatch = recipientEmail.value === confirmRecipientEmail.value;

    setConfirmRecipientEmail(curr => ({
      ...curr,
      error: doEmailsMatch ? '' : 'Email address doesn’t match'
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // set it in redux/update order?
    console.log(recipientEmail.value);
    console.log(deliveryDate.value);
    console.log(message);
  };

  const isSaveButtonDisabled = !!(
    validateEmailField(recipientEmail.value) ||
    validateEmailField(confirmRecipientEmail.value) ||
    recipientEmail.value !== confirmRecipientEmail.value ||
    !deliveryDate.value
  );

  return (
    <StyledRecipientForm onSubmit={handleSubmit} noValidate>
      {/* sort props alphabetically */}
      <MyAccountInput
        value={recipientEmail.value}
        label="Recipient email" // add translation
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setRecipientEmail(curr => ({ ...curr, value: e.target.value }))
        }
        error={recipientEmail.error}
        onBlur={(e: React.FocusEvent<HTMLInputElement>) =>
          validateRecipientEmail(e.target.value)
        }
        type="email"
        name="recipientEmail"
      />
      <MyAccountInput
        value={confirmRecipientEmail.value}
        label="Confirm recipient email" // add translation
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setConfirmRecipientEmail(curr => ({ ...curr, value: e.target.value }))
        }
        error={confirmRecipientEmail.error}
        onBlur={(e: React.FocusEvent<HTMLInputElement>) =>
          validateConfirmRecipientEmail(e.target.value)
        }
        type="email"
        name="confirmRecipientEmail"
      />
      <MyAccountInput
        value={deliveryDate.value}
        label="Delivery date" // add translation
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setDeliveryDate(curr => ({
            ...curr,
            value: e.target.value
          }));
        }}
        onBlur={() => {
          if (!deliveryDate.value) {
            setDeliveryDate(curr => ({
              ...curr,
              error: 'Missing delivery date'
            }));
          }
        }}
        type="date"
        min={new Date().toISOString().split('T')[0]}
        name="deliveryDate"
      />
      <MessageWrapper>
        <StyledLabel>Add a message</StyledLabel>
        <StyledMessage
          maxLength={150}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setMessage(e.target.value)
          }
          rows={3}
        />
      </MessageWrapper>
      <StyledButton
        disabled={isSaveButtonDisabled}
        type="submit"
        theme="confirm"
      >
        Save
      </StyledButton>
      <InfoText>
        To edit your gift delivery details, access MyAccount and click on the
        corresponding transaction.
      </InfoText>
    </StyledRecipientForm>
  );
};

export default RecipientForm;
