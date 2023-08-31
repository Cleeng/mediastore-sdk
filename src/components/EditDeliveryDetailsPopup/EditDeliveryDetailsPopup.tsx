import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  resetDeliveryDetailsState,
  selectDeliveryDetails
} from 'redux/deliveryDetailsSlice';
import { fetchGift, fetchUpdateGift, selectGift } from 'redux/giftSlice';
import { hidePopup, selectEditDeliveryDetailsPopup } from 'redux/popupSlice';
import { useAppDispatch, useAppSelector } from 'redux/store';
import { ReactComponent as CheckmarkIcon } from 'assets/images/greenCheckmark.svg';
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
  HeaderStyled,
  InfoTextStyled,
  ThankYouPageStyled
} from './EditDeliveryDetailsPopupStyled';

const EditDeliveryDetailsPopup = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const [currentStep, setCurrentStep] = useState(1);

  const { recipientEmail, deliveryDate, message } = useAppSelector(
    selectDeliveryDetails
  );
  const { giftId, offerId, offerTitle } = useAppSelector(
    selectEditDeliveryDetailsPopup
  );

  const {
    gift: { sentAt, deliveryDetails: giftDeliveryDetails },
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
              deliveryDate: new Date(deliveryDate.value).valueOf() / 1000,
              personalNote: message.value
            }
          }
        })
      )
        .unwrap()
        .catch(err => {
          throw new Error(err);
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
    !sentAt;

  const isGiftSent = !!sentAt;

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
            <SkeletonWrapper
              height={32}
              margin="0 0 24px 0"
              showChildren={!loading}
            >
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
            </SkeletonWrapper>
          </InfoTextStyled>
          <RecipientForm isMyAccount />
          <ButtonsStyled>
            {isGiftEditable ? (
              <>
                <Button theme="simple" onClickFn={() => dispatch(hidePopup())}>
                  {t('edit-delivery-details-popup.button.cancel', 'Back')}
                </Button>
                <Button theme="confirm" onClickFn={updateGift}>
                  {isUpdateLoading ? (
                    <Loader buttonLoader color="#ffffff" />
                  ) : (
                    t(
                      'edit-delivery-details-popup.button.confirm',
                      'Update details'
                    )
                  )}
                </Button>
              </>
            ) : (
              <Button theme="confirm" onClickFn={() => dispatch(hidePopup())}>
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
          <Button theme="confirm" onClickFn={() => dispatch(hidePopup())}>
            {t('edit-delivery-details-popup.button.back', 'Back to settings')}
          </Button>
        </ThankYouPageStyled>
      </ContentStyled>
    </InnerPopupWrapper>
  );
};

export default EditDeliveryDetailsPopup;
