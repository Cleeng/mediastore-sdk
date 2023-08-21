import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import {
  resetDeliveryDetailsState,
  selectDeliveryDetails
} from 'redux/deliveryDetailsSlice';
import { fetchGift, fetchUpdateGift, selectGift } from 'redux/giftSlice';
import { hidePopup, selectEditDeliveryDetailsPopup } from 'redux/popupSlice';
import { useAppSelector } from 'redux/store';
import Button from 'components/Button';
import InnerPopupWrapper from 'components/InnerPopupWrapper';
import RecipientForm from 'components/DeliveryDetails/RecipientForm';
import Loader from 'components/Loader';
import {
  isDateInFuture,
  validateDeliveryDetailsForm
} from 'components/DeliveryDetails/RecipientForm/validators';
import { ReactComponent as CheckmarkIcon } from 'assets/images/greenCheckmark.svg';
import {
  ButtonsStyled,
  ContentStyled,
  HeaderStyled,
  InfoTextStyled,
  ThankYouPageStyled
} from './EditDeliveryDetailsPopupStyled';

const EditDeliveryDetailsPopup = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [isUpdateLoading, setIsUpdateLoading] = useState(false);

  const { recipientEmail, deliveryDate, message } = useAppSelector(
    selectDeliveryDetails
  );
  const { giftId, offerId, offerTitle } = useAppSelector(
    selectEditDeliveryDetailsPopup
  );

  const {
    loading,
    gift: { sentAt, deliveryDetails: giftDeliveryDetails }
  } = useAppSelector(selectGift);

  const [currentStep, setCurrentStep] = useState(1);

  const updateGift = async () => {
    const areDeliveryDetailsValid = validateDeliveryDetailsForm();

    if (areDeliveryDetailsValid) {
      setIsUpdateLoading(true);
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
      );

      setIsUpdateLoading(false);

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
        {currentStep === 1 ? (
          <>
            <HeaderStyled>
              {t('edit-delivery-details-popup.header', 'Edit Delivery Details')}
            </HeaderStyled>
            {loading ? (
              <Loader />
            ) : (
              <>
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
                        theme="simple"
                        onClickFn={() => dispatch(hidePopup())}
                      >
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
                    <Button
                      theme="confirm"
                      onClickFn={() => dispatch(hidePopup())}
                    >
                      {t(
                        'edit-delivery-details-popup.button.back',
                        'Back to settings'
                      )}
                    </Button>
                  )}
                </ButtonsStyled>
              </>
            )}
          </>
        ) : (
          <>
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
                {t(
                  'edit-delivery-details-popup.button.back',
                  'Back to settings'
                )}
              </Button>
            </ThankYouPageStyled>
          </>
        )}
      </ContentStyled>
    </InnerPopupWrapper>
  );
};

export default EditDeliveryDetailsPopup;
