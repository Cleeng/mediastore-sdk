import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from 'appRedux/store';
import {
  selectDeliveryDetails,
  setFieldValue
} from 'appRedux/deliveryDetailsSlice';
import { selectGift } from 'appRedux/giftSlice';
import { POPUP_TYPES, selectPopupDetails } from 'appRedux/popupSlice';
import MyAccountInput from 'components/MyAccountInput';
import SkeletonWrapper from 'components/SkeletonWrapper';
import {
  getLocalDate,
  getLocalTime
} from 'components/DeliveryDetails/RecipientForm/helpers';
import {
  InfoText,
  MessageWrapper,
  StyledRecipientForm,
  StyledLabel,
  StyledMessage,
  DateContainer
} from './RecipientFormStyled';
import {
  isDateInFuture,
  validateConfirmRecipientEmail,
  validateDeliveryDate,
  validateDeliveryTime,
  validateRecipientEmail
} from './validators';

import { RecipientFormProps } from './RecipientForm.types';

const RecipientForm = ({ isMyAccount = false }: RecipientFormProps) => {
  const {
    recipientEmail,
    confirmRecipientEmail,
    deliveryDate,
    deliveryTime,
    message
  } = useAppSelector(selectDeliveryDetails);

  const {
    loading,
    gift: { deliveryDetails: giftDeliveryDetails, redeemedAt, sentAt }
  } = useAppSelector(selectGift);
  const { isOpen, currentType } = useAppSelector(selectPopupDetails);

  const dispatch = useAppDispatch();

  const { t } = useTranslation();

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
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
        validateDeliveryDate(value, deliveryTime.value);
        break;
      case 'deliveryTime':
        validateDeliveryTime(value, deliveryDate.value);
        break;
      default:
        break;
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (shouldHideValue) {
      return;
    }

    const {
      target: { name, value }
    } = e;
    dispatch(setFieldValue({ name, value }));
    if (name === 'deliveryDate' && !deliveryTime.value) {
      dispatch(setFieldValue({ name: 'deliveryTime', value: '00:00' }));
    }
  };

  useEffect(() => {
    if (isMyAccount && giftDeliveryDetails) {
      dispatch(
        setFieldValue({
          name: 'recipientEmail',
          value: giftDeliveryDetails?.recipientEmail
        })
      );
      dispatch(
        setFieldValue({
          name: 'deliveryDate',
          value: getLocalDate(giftDeliveryDetails?.deliveryDate)
        })
      );
      dispatch(
        setFieldValue({
          name: 'deliveryTime',
          value: getLocalTime(giftDeliveryDetails?.deliveryDate)
        })
      );
      dispatch(
        setFieldValue({
          name: 'message',
          value: giftDeliveryDetails?.personalNote
        })
      );
    }
  }, [giftDeliveryDetails]);

  const isGiftEditable =
    isDateInFuture(new Date(giftDeliveryDetails?.deliveryDate * 1000)) &&
    !sentAt &&
    !redeemedAt;

  const isFieldDisabled = isMyAccount && !isGiftEditable;

  const isEditDeliveryDetailsPopupOpened =
    isOpen && currentType === POPUP_TYPES.EDIT_DELIVERY_DETAILS_POPUP;

  const shouldHideValue = !isMyAccount && isEditDeliveryDetailsPopupOpened;

  const getInputValue = (value: string | number) =>
    shouldHideValue ? '' : value;

  return (
    <StyledRecipientForm noValidate>
      {loading ? (
        <>
          <>
            <SkeletonWrapper width={100} margin='0 0 12px 0' />
            <SkeletonWrapper height={40} margin='0 0 28px 0' />
          </>
          <>
            <SkeletonWrapper width={100} margin='0 0 12px 0' />
            <SkeletonWrapper height={40} margin='0 0 28px 0' />
          </>
          <>
            <SkeletonWrapper width={100} margin='0 0 12px 0' />
            <SkeletonWrapper height={92} margin='0 0 28px 0' />
          </>
        </>
      ) : (
        <>
          <MyAccountInput
            disabled={isFieldDisabled}
            error={t(recipientEmail.translationKey, recipientEmail.error)}
            label={t('recipientForm.label.recipient-email', 'Recipient email')}
            name='recipientEmail'
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder={t(
              'recipientForm.label.recipient-email',
              'jdoe@cleeng.com'
            )}
            type='email'
            value={getInputValue(recipientEmail.value)}
          />
          {!isFieldDisabled && (
            <MyAccountInput
              error={t(
                confirmRecipientEmail.translationKey,
                confirmRecipientEmail.error
              )}
              label={t(
                'recipientForm.label.confirm-recipient-email',
                'Confirm recipient email'
              )}
              name='confirmRecipientEmail'
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder={t(
                'recipientForm.label.confirm-recipient-email',
                'jdoe@cleeng.com'
              )}
              type='email'
              value={getInputValue(confirmRecipientEmail.value)}
            />
          )}
          <DateContainer>
            <MyAccountInput
              disabled={isFieldDisabled}
              error={t(deliveryDate.translationKey, deliveryDate.error)}
              label={t('recipientForm.label.delivery-date', 'Delivery date')}
              min={new Date().toISOString().split('T')[0]}
              name='deliveryDate'
              onBlur={handleBlur}
              onChange={handleChange}
              type='date'
              value={getInputValue(deliveryDate.value)}
              width='50%'
            />
            <MyAccountInput
              disabled={isFieldDisabled}
              error={t(deliveryTime.translationKey, deliveryTime.error)}
              label={t('recipientForm.label.delivery-time', 'Delivery time')}
              name='deliveryTime'
              onBlur={handleBlur}
              onChange={handleChange}
              type='time'
              value={getInputValue(deliveryTime.value)}
              width='50%'
            />
          </DateContainer>
          <MessageWrapper>
            <StyledLabel>
              {isFieldDisabled ? (
                <>{t('recipientForm.label.message', 'Message')}</>
              ) : (
                <>{t('recipientForm.label.add-message', 'Add a message')}</>
              )}
            </StyledLabel>
            <StyledMessage
              disabled={isFieldDisabled}
              maxLength={150}
              name='message'
              onChange={handleChange}
              placeholder={
                isFieldDisabled
                  ? ''
                  : t(
                      'recipientForm.placeholder.message',
                      'I’d give you the gift of never having to leave the house again! Enjoy your new subscription plan. Happy streaming!'
                    )
              }
              rows={3}
              value={getInputValue(message.value)}
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
        </>
      )}
    </StyledRecipientForm>
  );
};

export default RecipientForm;
