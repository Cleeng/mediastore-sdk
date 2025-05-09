import { Trans, useTranslation } from 'react-i18next';
import WarningIcon from 'assets/images/errors/warning.svg';
import {
  ContentStyled,
  TitleStyled,
  TextStyled,
  ButtonWrapperStyled
} from 'components/InnerPopupWrapper/InnerPopupWrapperStyled';
import Button from 'components/Button';
import { useAppDispatch, useAppSelector } from 'appRedux/store';
import {
  PAYMENT_DETAILS_STEPS,
  selectPaymentDetailsPopup,
  updatePaymentDetailsPopup
} from 'appRedux/popupSlice';
import { ImageWrapper } from '../UpdatePaymentDetailsPopupStyled';

const errorMessages = {
  REFUSED: 'Refused',
  NO_ACTIVE_ENTITLEMENT: 'No active entitlement'
};

const ErrorStep = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { error: finalizeErrorMessage } = useAppSelector(
    (state) => state.finalizeAddPaymentDetails
  );
  const { errorMessage } = useAppSelector(selectPaymentDetailsPopup);

  const errorMessageValue = errorMessage || finalizeErrorMessage;

  const getErrorMessage = () => {
    if (errorMessageValue?.includes(errorMessages.REFUSED)) {
      return (
        <Trans i18nKey='update-payment-details-popup.refused'>
          We weren’t able to update your payment method. <br /> Please try
          again.
        </Trans>
      );
    }

    if (errorMessageValue?.includes(errorMessages.NO_ACTIVE_ENTITLEMENT)) {
      return (
        <Trans i18nKey='update-payment-details-popup.no-active-plan'>
          We weren’t able to update your payment method because you don’t have
          an active plan.
        </Trans>
      );
    }

    return (
      <Trans i18nKey='update-payment-details-popup.error'>
        We weren’t able to update your payment details. <br /> Please try again
        using different payment method.
      </Trans>
    );
  };

  return (
    <>
      <ContentStyled>
        <ImageWrapper>
          <WarningIcon />
        </ImageWrapper>
        <TitleStyled>
          {t('oops-something-went-wrong', 'Oops! Something went wrong.')}
        </TitleStyled>
        <TextStyled>{getErrorMessage()}</TextStyled>
      </ContentStyled>
      <ButtonWrapperStyled $removeMargin>
        <Button
          variant='simple'
          onClickFn={() =>
            dispatch(
              updatePaymentDetailsPopup({
                step: PAYMENT_DETAILS_STEPS.PAYMENT_DETAILS_UPDATE,
                isLoading: false
              })
            )
          }
        >
          {t('update-payment-details-popup.try-again', 'Try again')}
        </Button>
      </ButtonWrapperStyled>
    </>
  );
};

export default ErrorStep;
