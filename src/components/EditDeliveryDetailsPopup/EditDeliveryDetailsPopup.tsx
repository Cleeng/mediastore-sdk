import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { resetDeliveryDetailsState } from 'redux/deliveryDetailsSlice';
import { hidePopup } from 'redux/popupSlice';
import Button from 'components/Button';
import InnerPopupWrapper from 'components/InnerPopupWrapper';
import RecipientForm from 'components/DeliveryDetails/RecipientForm';
import { ReactComponent as CheckmarkIcon } from 'assets/images/greenCheckmark.svg';
import {
  ButtonsStyled,
  ContentStyled,
  ThankYouPageHeaderStyled,
  ThankYouPageInfoTextStyled,
  ThankYouPageStyled
} from './EditDeliveryDetailsPopupStyled';

const EditDeliveryDetailsPopup = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    return () => {
      dispatch(resetDeliveryDetailsState());
    };
  }, []);

  // get offerTitle from store or props
  const offerTitle = '1 Month Subscription - Premium Plan';

  return (
    <InnerPopupWrapper
      steps={2}
      isError={false}
      currentStep={currentStep}
      popupTitle={t(
        'edit-delivery-details-popup.title',
        'Edit delivery details'
      )}
    >
      <ContentStyled>
        {currentStep === 1 ? (
          <>
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
              <ThankYouPageHeaderStyled>
                {t(
                  'edit-delivery-details-popup.thank-you-page.header',
                  'Delivery Details Updated'
                )}
              </ThankYouPageHeaderStyled>
              <ThankYouPageInfoTextStyled>
                {t(
                  'edit-delivery-details-popup.thank-you-page.info-text-1',
                  'Thank you for updating your delivery details for your'
                )}
                <p>{offerTitle}</p>
                {t(
                  'edit-delivery-details-popup.thank-you-page.info-text-2',
                  'Your changes have been saved and will be reflected in your next delivery.'
                )}
              </ThankYouPageInfoTextStyled>
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
