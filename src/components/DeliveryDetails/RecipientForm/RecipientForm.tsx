import { useTranslation } from 'react-i18next';
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

type RecipientFormProps = {
  isMyAccount?: true;
};

const RecipientForm = ({ isMyAccount }: RecipientFormProps) => {
  const {
    recipientEmail,
    confirmRecipientEmail,
    deliveryDate,
    message
  } = useAppSelector(selectDeliveryDetails);

  const dispatch = useAppDispatch();

  const { t } = useTranslation();

  const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const {
      target: { name, value }
    } = e;

    switch (name) {
      case 'recipientEmail':
        validateRecipientEmail(value);

        if (confirmRecipientEmail.value) {
          validateConfirmRecipientEmail(confirmRecipientEmail.value);
        }
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
        error={t(recipientEmail.translationKey, recipientEmail.error)}
        label={t('recipientForm.label.recipient-email', 'Recipient email')}
        name="recipientEmail"
        onBlur={onBlur}
        onChange={onChange}
        type="email"
        value={recipientEmail.value}
      />
      <MyAccountInput
        error={t(
          confirmRecipientEmail.translationKey,
          confirmRecipientEmail.error
        )}
        label={t(
          'recipientForm.label.confirm-recipient-email',
          'Confirm recipient email'
        )}
        name="confirmRecipientEmail"
        onBlur={onBlur}
        onChange={onChange}
        type="email"
        value={confirmRecipientEmail.value}
      />
      <MyAccountInput
        error={t(deliveryDate.translationKey, deliveryDate.error)}
        label={t('recipientForm.label.delivery-date', 'Delivery date')}
        min={new Date().toISOString().split('T')[0]}
        name="deliveryDate"
        onBlur={onBlur}
        onChange={onChange}
        type="date"
        value={deliveryDate.value}
      />
      <MessageWrapper>
        <StyledLabel>
          {t('recipientForm.label.message', 'Add a message')}
        </StyledLabel>
        <StyledMessage
          maxLength={150}
          name="message"
          onChange={onChange}
          rows={3}
          value={message.value}
        />
      </MessageWrapper>
      {!isMyAccount && (
        <InfoText>
          {t(
            'recipientForm.info-text',
            'To edit your gift delivery details, access MyAccount and click on the corresponding transaction.'
          )}
        </InfoText>
      )}
    </StyledRecipientForm>
  );
};

RecipientForm.defaultProps = {
  isMyAccount: false
};

export default RecipientForm;
