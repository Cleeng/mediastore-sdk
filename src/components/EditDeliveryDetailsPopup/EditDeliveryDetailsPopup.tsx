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

  return (
    <InnerPopupWrapper
      steps={2}
      isError={false}
      currentStep={currentStep}
      popupTitle={t(
        // fix translation
        'update-payment-details-popup.title',
        'Edit delivery details'
      )}
    >
      {/* maybe import ContentStyled from InnerPopupWrapper  */}
      <ContentStyled>
        {currentStep === 1 ? (
          <>
            <RecipientForm isMyAccount />
            {/* ButtonsWrapper */}
            <ButtonsStyled>
              {/* <ButtonWrapperStyled removeMargin> */}
              <Button theme="simple" onClickFn={() => dispatch(hidePopup())}>
                {/* {t('update-payment-details-popup.cancel', '')} */}
                Back
              </Button>
              {/* </ButtonWrapperStyled> */}
              <Button theme="confirm" onClickFn={() => setCurrentStep(2)}>
                {/* {t('update-payment-details-popup.cancel', '')} */}
                Update details
              </Button>
            </ButtonsStyled>
          </>
        ) : (
          <>
            <ThankYouPageStyled>
              {/* should I use h2? */}
              {/* add translations */}
              <CheckmarkIcon />
              <ThankYouPageHeaderStyled>
                Delivery Details Updated
              </ThankYouPageHeaderStyled>
              <ThankYouPageInfoTextStyled>
                Thank you for updating your delivery details for your
              </ThankYouPageInfoTextStyled>
              <ThankYouPageInfoTextStyled>
                {/* change to real plan name */}1 Month Subscription - Premium
                Plan
              </ThankYouPageInfoTextStyled>
              <ThankYouPageInfoTextStyled>
                Your changes have been saved and will be reflected in your next
                delivery.
              </ThankYouPageInfoTextStyled>
              <Button theme="confirm" onClickFn={() => dispatch(hidePopup())}>
                Back to settings
              </Button>
            </ThankYouPageStyled>
          </>
        )}
      </ContentStyled>
    </InnerPopupWrapper>
  );
};

export default EditDeliveryDetailsPopup;
