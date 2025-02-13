import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  resetDeliveryDetailsState,
  selectDeliveryDetails
} from 'appRedux/deliveryDetailsSlice';
import { fetchGift, fetchUpdateGift, selectGift } from 'appRedux/giftSlice';
import { hidePopup, selectEditDeliveryDetailsPopup } from 'appRedux/popupSlice';
import { useAppDispatch, useAppSelector } from 'appRedux/store';
import CheckmarkIcon from 'assets/images/greenCheckmark.svg';
import WarningIcon from 'assets/images/errors/warning.svg';
import Button from 'components/Button';
import InnerPopupWrapper from 'components/InnerPopupWrapper';
import RecipientForm from 'components/DeliveryDetails/RecipientForm';
import Loader from 'components/Loader';
import {
  isDateInFuture,
  validateDeliveryDetailsForm
} from 'components/DeliveryDetails/RecipientForm/validators';
import SkeletonWrapper from 'components/SkeletonWrapper';

import {
  ButtonsStyled,
  ContentStyled,
  ErrorPageStyled,
  ErrorTextStyled,
  HeaderStyled,
  InfoTextSkeletonStyled,
  InfoTextStyled,
  ThankYouPageStyled
} from './EditDeliveryDetailsPopupStyled';

const EditDeliveryDetailsPopup = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const [currentStep, setCurrentStep] = useState(1);
  const [error, setError] = useState(false);

  const { recipientEmail, deliveryDate, deliveryTime, message } =
    useAppSelector(selectDeliveryDetails);
  const { giftId, offerId, offerTitle } = useAppSelector(
    selectEditDeliveryDetailsPopup
  );

  const {
    gift: { deliveryDetails: giftDeliveryDetails, redeemedAt, sentAt },
    isUpdateLoading,
    loading
  } = useAppSelector(selectGift);

  const updateGift = async () => {
    const areDeliveryDetailsValid = validateDeliveryDetailsForm();

    if (areDeliveryDetailsValid) {
      await dispatch(
        fetchUpdateGift({
          id: giftId as number,
          payload: {
            deliveryDetails: {
              recipientEmail: recipientEmail.value as string,
              deliveryDate:
                new Date(
                  `${deliveryDate.value}T${deliveryTime.value}`
                ).valueOf() / 1000,
              personalNote: message.value
            }
          }
        })
      )
        .unwrap()
        .catch(() => {
          setError(true);
        });

      setCurrentStep(2);
    }
  };

  useEffect(() => {
    if (giftId) {
      dispatch(fetchGift(giftId as number));
    }

    return () => {
      dispatch(hidePopup());
      dispatch(resetDeliveryDetailsState());
    };
  }, [giftId]);

  const isGiftEditable =
    isDateInFuture(new Date(giftDeliveryDetails?.deliveryDate * 1000)) &&
    !sentAt &&
    !redeemedAt;

  const isGiftSent = !!sentAt || !!redeemedAt;

  if (loading) {
    return (
      <InnerPopupWrapper
        steps={2}
        isError={false}
        currentStep={1}
        popupTitle={t(
          'edit-delivery-details-popup.title',
          'Edit Delivery Details'
        )}
      >
        <ContentStyled>
          <HeaderStyled>
            {t('edit-delivery-details-popup.header', 'Edit Delivery Details')}
          </HeaderStyled>
          <InfoTextSkeletonStyled>
            <SkeletonWrapper height={32} margin='0 0 24px 0' />
          </InfoTextSkeletonStyled>
          <RecipientForm isMyAccount />
        </ContentStyled>
      </InnerPopupWrapper>
    );
  }

  if (currentStep === 1) {
    return (
      <InnerPopupWrapper
        steps={2}
        isError={false}
        currentStep={currentStep}
        popupTitle={t(
          'edit-delivery-details-popup.title',
          'Edit Delivery Details'
        )}
      >
        <ContentStyled>
          <HeaderStyled>
            {t('edit-delivery-details-popup.header', 'Edit Delivery Details')}
          </HeaderStyled>
          <InfoTextStyled>
            {isGiftEditable ? (
              <>
                {t(
                  'edit-delivery-details-popup.info-text-1',
                  'You are editing information for your'
                )}
                <p>{t(`offer-title-${offerId}`, offerTitle)}</p>
                {t(
                  'edit-delivery-details-popup.info-text-2',
                  'Please take a moment to update your gift delivery details.'
                )}
              </>
            ) : (
              <>
                {isGiftSent
                  ? t(
                      'edit-delivery-details-popup.info-text-disabled',
                      'It is not possible to edit delivery details as the gift has been already sent out to the recipient.'
                    )
                  : t(
                      'edit-delivery-details-popup.info-text-disabled2',
                      'It is not possible to edit delivery details as the gift will be sent to the recipient soon.'
                    )}
              </>
            )}
          </InfoTextStyled>
          <RecipientForm isMyAccount />
          <ButtonsStyled>
            {isGiftEditable ? (
              <>
                <Button
                  variant='simple'
                  onClickFn={() => dispatch(hidePopup())}
                >
                  {t('edit-delivery-details-popup.button.cancel', 'Back')}
                </Button>
                <Button variant='confirm' onClickFn={updateGift}>
                  {isUpdateLoading ? (
                    <Loader buttonLoader color='#ffffff' />
                  ) : (
                    t(
                      'edit-delivery-details-popup.button.confirm',
                      'Update details'
                    )
                  )}
                </Button>
              </>
            ) : (
              <Button variant='confirm' onClickFn={() => dispatch(hidePopup())}>
                {t(
                  'edit-delivery-details-popup.button.back',
                  'Back to settings'
                )}
              </Button>
            )}
          </ButtonsStyled>
        </ContentStyled>
      </InnerPopupWrapper>
    );
  }

  return (
    <InnerPopupWrapper
      steps={2}
      isError={false}
      currentStep={currentStep}
      popupTitle={t(
        'edit-delivery-details-popup.title',
        'Edit Delivery Details'
      )}
    >
      <ContentStyled>
        {error ? (
          <ErrorPageStyled>
            <WarningIcon />
            <HeaderStyled>
              {t(
                'edit-delivery-details-popup.thank-you-page.error-header',
                'Failed to update the delivery details'
              )}
            </HeaderStyled>
            <ErrorTextStyled>
              <strong>
                {t(
                  'edit-delivery-details-popup.thank-you-page.error-text-1',
                  "We weren't able to process your request."
                )}
              </strong>
            </ErrorTextStyled>
            <ErrorTextStyled>
              {t(
                'edit-delivery-details-popup.thank-you-page.error-text-2',
                'Please try updating the delivery details again in a few minutes.'
              )}
            </ErrorTextStyled>
            <Button variant='confirm' onClickFn={() => dispatch(hidePopup())}>
              {t('edit-delivery-details-popup.button.back', 'Back to settings')}
            </Button>
          </ErrorPageStyled>
        ) : (
          <ThankYouPageStyled>
            <CheckmarkIcon />
            <HeaderStyled>
              {t(
                'edit-delivery-details-popup.thank-you-page.header',
                'Delivery Details Updated'
              )}
            </HeaderStyled>
            <InfoTextStyled>
              {t(
                'edit-delivery-details-popup.thank-you-page.info-text-1',
                'Thank you for updating your delivery details for your'
              )}
              <p>{t(`offer-title-${offerId}`, offerTitle)}</p>
              {t(
                'edit-delivery-details-popup.thank-you-page.info-text-2',
                'Your changes have been saved and will be reflected in your next delivery.'
              )}
            </InfoTextStyled>
            <Button variant='confirm' onClickFn={() => dispatch(hidePopup())}>
              {t('edit-delivery-details-popup.button.back', 'Back to settings')}
            </Button>
          </ThankYouPageStyled>
        )}
      </ContentStyled>
    </InnerPopupWrapper>
  );
};

export default EditDeliveryDetailsPopup;
