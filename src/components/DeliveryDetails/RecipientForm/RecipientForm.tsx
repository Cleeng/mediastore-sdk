import { useState } from 'react';
// import { useTranslation } from 'react-i18next';
import MyAccountInput from 'components/MyAccountInput';
import { validateEmailField } from 'util/validators';
import { RecipientFormStyled } from './RecipientFormStyled';

const RecipientForm = () => {
  const [recipientEmail, setRecipientEmail] = useState({
    value: '',
    error: ''
  });

  const [confirmRecipientEmail, setConfirmRecipientEmail] = useState({
    value: '',
    error: ''
  });

  // const { t } = useTranslation();

  const validateRecipientEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value }
    } = e;

    setRecipientEmail(curr => ({ ...curr, error: validateEmailField(value) }));
  };

  const validateConfirmRecipientEmail = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const {
      target: { value }
    } = e;

    if (validateEmailField(value)) {
      setConfirmRecipientEmail(curr => ({
        ...curr,
        error: validateEmailField(value)
      }));

      return;
    }

    const doEmailsMatch = recipientEmail.value === confirmRecipientEmail.value;

    setConfirmRecipientEmail(curr => ({
      ...curr,
      error: doEmailsMatch ? '' : 'Email address doesn’t match'
    }));
  };

  const handleSubmit = () => {
    return null;
  };

  return (
    <RecipientFormStyled onSubmit={handleSubmit} noValidate>
      <MyAccountInput
        value={recipientEmail.value}
        label="Recipient email" // add translation
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setRecipientEmail(curr => ({ ...curr, value: e.target.value }))
        }
        error={recipientEmail.error}
        onBlur={validateRecipientEmail}
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
        onBlur={validateConfirmRecipientEmail}
        type="email"
        name="confirmRecipientEmail"
      />
    </RecipientFormStyled>
  );
};

export default RecipientForm;
