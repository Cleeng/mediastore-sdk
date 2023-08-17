import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from 'redux/store';
import {
  selectDeliveryDetails,
  setFieldValue
} from 'redux/deliveryDetailsSlice';
import { selectGift } from 'redux/giftSlice';
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

import { RecipientFormProps } from './RecipientForm.types';

const RecipientForm = ({ isMyAccount = false }: RecipientFormProps) => {
  const {
    recipientEmail,
    confirmRecipientEmail,
    deliveryDate,
    message
  } = useAppSelector(selectDeliveryDetails);

  const {
    gift: { deliveryDetails, sentAt }
  } = useAppSelector(selectGift);

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
          validateConfirmRecipientEmail(confirmRecipientEmail.value as string);
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

  useEffect(() => {
    if (isMyAccount && deliveryDetails) {
      dispatch(
        setFieldValue({
          name: 'recipientEmail',
          value: deliveryDetails?.recipientEmail
        })
      );
      dispatch(
        setFieldValue({
          name: 'deliveryDate',
          value: new Date(deliveryDetails?.deliveryDate * 1000)
            .toISOString()
            .split('T')[0]
        })
      );
      dispatch(
        setFieldValue({
          name: 'message',
          value: deliveryDetails?.personalNote
        })
      );
    }
  }, [deliveryDetails]);

  const isGiftSent = !!sentAt;

  return (
    <StyledRecipientForm noValidate>
      <MyAccountInput
        disabled={isGiftSent}
        error={t(recipientEmail.translationKey, recipientEmail.error)}
        label={t('recipientForm.label.recipient-email', 'Recipient email')}
        name="recipientEmail"
        onBlur={onBlur}
        onChange={onChange}
        type="email"
        value={recipientEmail.value}
      />
      {!isGiftSent && (
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
      )}
      <MyAccountInput
        disabled={isGiftSent}
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
          {isGiftSent ? (
            <>{t('recipientForm.label.message', 'Message')}</>
          ) : (
            <>{t('recipientForm.label.add-message', 'Add a message')}</>
          )}
        </StyledLabel>
        <StyledMessage
          disabled={isGiftSent}
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

export default RecipientForm;
