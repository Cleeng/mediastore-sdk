import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { resetDeliveryDetailsState } from 'redux/deliveryDetailsSlice';
import { hidePopup } from 'redux/popupSlice';
import Button from 'components/Button';
import InnerPopupWrapper from 'components/InnerPopupWrapper';
import RecipientForm from 'components/DeliveryDetails/RecipientForm';
import { ButtonsStyled, ContentStyled } from './EditDeliveryDetailsPopupStyled';

const EditDeliveryDetailsPopup = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(resetDeliveryDetailsState());
    };
  }, []);

  return (
    <InnerPopupWrapper
      steps={2}
      isError={false}
      currentStep={1}
      popupTitle={t(
        // fix translation
        'update-payment-details-popup.title',
        'Edit delivery details'
      )}
    >
      {/* maybe import ContentStyled from InnerPopupWrapper  */}
      <ContentStyled>
        <RecipientForm isMyAccount />
        {/* ButtonsWrapper */}
        <ButtonsStyled>
          {/* <ButtonWrapperStyled removeMargin> */}
          <Button theme="simple" onClickFn={() => dispatch(hidePopup())}>
            {/* {t('update-payment-details-popup.cancel', '')} */}
            Back
          </Button>
          {/* </ButtonWrapperStyled> */}
          <Button
            theme="confirm"
            onClickFn={() => console.log('Updating details...')}
          >
            {/* {t('update-payment-details-popup.cancel', '')} */}
            Update details
          </Button>
        </ButtonsStyled>
      </ContentStyled>
    </InnerPopupWrapper>
  );
};

export default EditDeliveryDetailsPopup;
