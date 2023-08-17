import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { resetDeliveryDetailsState } from 'redux/deliveryDetailsSlice';
import { hidePopup, selectEditDeliveryDetailsPopup } from 'redux/popupSlice';
import { useAppSelector } from 'redux/store';
import Button from 'components/Button';
import InnerPopupWrapper from 'components/InnerPopupWrapper';
import RecipientForm from 'components/DeliveryDetails/RecipientForm';
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

  const { offerId, offerTitle } = useAppSelector(
    selectEditDeliveryDetailsPopup
  );

  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    return () => {
      dispatch(resetDeliveryDetailsState());
    };
  }, []);

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
            <InfoTextStyled>
              {t(
                'edit-delivery-details-popup.info-text-1',
                'You are editing information for your'
              )}
              <p>{t(`offer-title-${offerId}`, offerTitle)}</p>
              {t(
                'edit-delivery-details-popup.info-text-2',
                'Please take a moment to update your gift delivery details.'
              )}
            </InfoTextStyled>
            <RecipientForm isMyAccount />
            <ButtonsStyled>
              <Button theme="simple" onClickFn={() => dispatch(hidePopup())}>
                {t('edit-delivery-details-popup.button.cancel', 'Back')}
              </Button>
              <Button theme="confirm" onClickFn={() => setCurrentStep(2)}>
                {t(
                  'edit-delivery-details-popup.button.confirm',
                  'Update details'
                )}
              </Button>
            </ButtonsStyled>
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
