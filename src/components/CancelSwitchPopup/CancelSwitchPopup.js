import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import InnerPopupWrapper from 'components/InnerPopupWrapper';
import { withTranslation } from 'react-i18next';
import labeling from 'containers/labeling';
import Button from 'components/Button';
import Loader from 'components/Loader';
import { updateSwitch } from 'api';
import checkmarkIconBase from 'assets/images/checkmarkBase';
import { updateList, setSwitchDetails } from 'redux/planDetailsSlice';
import { hidePopup } from 'redux/popupSlice';

import {
  ContentStyled,
  TitleStyled,
  TextStyled,
  ButtonWrapperStyled
} from 'components/InnerPopupWrapper/InnerPopupWrapperStyled';

const CancelSwitchPopup = ({ t }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [step, setStep] = useState(1);

  const { data: allSwitchDetails } = useSelector(
    state => state.plan.switchDetails
  );
  const {
    data: {
      pendingSwitchId,
      switchDirection,
      switchOfferTitle: untranslatedSwitchOfferTitle,
      baseOfferTitle: untranslatedBaseOfferTitle,
      baseOfferExpirationDate,
      baseOfferPrice
    }
  } = useSelector(state => state.popupManager.cancelSwitch);

  const switchDetails = allSwitchDetails[pendingSwitchId];
  const eventsPayload = {
    pendingSwitchId,
    fromOfferId: switchDetails && switchDetails.fromOfferId,
    toOfferId: switchDetails && switchDetails.toOfferId
  };
  const dispatch = useDispatch();

  const [offerIdsFallback, setOfferIdsFallback] = useState({}); // required to keep translations in step 2
  useEffect(() => {
    if (switchDetails) {
      setOfferIdsFallback({
        fromOfferId: switchDetails && switchDetails.fromOfferId,
        toOfferId: switchDetails && switchDetails.toOfferId
      });
    }
  }, [switchDetails]);

  const baseOfferTitle = t(
    `offer-title-${offerIdsFallback.fromOfferId}`,
    untranslatedBaseOfferTitle
  );
  const switchOfferTitle = t(
    `offer-title-${offerIdsFallback.toOfferId}`,
    untranslatedSwitchOfferTitle
  );

  const cancelSwitch = async () => {
    window.dispatchEvent(
      new CustomEvent('MSSDK:cancel-switch-action-triggered', {
        detail: eventsPayload
      })
    );
    setIsLoading(true);
    try {
      const resp = await updateSwitch(pendingSwitchId);
      if (!resp.errors.length) {
        setIsLoading(false);
        dispatch(
          setSwitchDetails({ details: { pendingSwitchId }, type: 'delete' })
        );
        setStep(2);
        window.dispatchEvent(
          new CustomEvent('MSSDK:cancel-switch-action-successful', {
            detail: eventsPayload
          })
        );
      } else {
        setIsError(true);
        setIsLoading(false);
        window.dispatchEvent(
          new CustomEvent('MSSDK:cancel-switch-action-failed', {
            detail: { ...eventsPayload, reason: resp.errors[0] }
          })
        );
      }
    } catch {
      setIsError(true);
      setIsLoading(false);
      window.dispatchEvent(
        new CustomEvent('MSSDK:cancel-switch-action-failed', {
          detail: eventsPayload
        })
      );
    }
  };

  return (
    <InnerPopupWrapper
      steps={2}
      popupTitle={t('Cancel switch')}
      currentStep={step}
      isError={isError}
    >
      {step === 1 && (
        <>
          <ContentStyled>
            <TitleStyled>{t('Cancel switch')}</TitleStyled>
            <TextStyled>
              {t(
                `Your {{switchDirection}} to {{switchOfferTitle}} is still pending and will take effect on {{baseOfferExpirationDate}}. If you decide to cancel the switch, you will keep access to current plan and be charged {{baseOfferPrice}} on the next billing date.`,
                {
                  switchDirection,
                  switchOfferTitle,
                  baseOfferExpirationDate,
                  baseOfferPrice
                }
              )}
              <br />
              <br />
              {t('Are you sure you want to cancel the switch?')}
            </TextStyled>
          </ContentStyled>
          <ButtonWrapperStyled removeMargin>
            <Button
              theme="simple"
              onClickFn={() => {
                window.dispatchEvent(
                  new CustomEvent('MSSDK:cancel-switch-action-cancelled', {
                    detail: eventsPayload
                  })
                );
                dispatch(hidePopup({ type: 'cancelSwitch' }));
              }}
            >
              {t('No, thanks')}
            </Button>
            <Button theme="danger" onClickFn={cancelSwitch}>
              {isLoading ? (
                <Loader buttonLoader color="#ffffff" />
              ) : (
                t(`Cancel switch`)
              )}
            </Button>
          </ButtonWrapperStyled>
        </>
      )}
      {step === 2 && (
        <>
          <ContentStyled>
            <img src={checkmarkIconBase} alt="checkmark icon" />
            <TitleStyled>{t('Switch canceled')}</TitleStyled>
            <TextStyled>
              {t(
                `You have successfully canceled your {{switchDirection}} to {{switchOfferTitle}}. You will be charged a current price on {{baseOfferExpirationDate}} and keep access to {{baseOfferTitle}}.`,
                {
                  switchDirection,
                  switchOfferTitle,
                  baseOfferExpirationDate,
                  baseOfferTitle
                }
              )}
            </TextStyled>
          </ContentStyled>
          <ButtonWrapperStyled removeMargin>
            <Button
              theme="confirm"
              onClickFn={() => {
                dispatch(hidePopup({ type: 'cancelSwitch' }));
                dispatch(updateList());
              }}
            >
              {t('Back to My Account')}
            </Button>
          </ButtonWrapperStyled>
        </>
      )}
    </InnerPopupWrapper>
  );
};

CancelSwitchPopup.propTypes = {
  popupData: PropTypes.shape({
    pendingSwitchId: PropTypes.string.isRequired,
    baseOfferTitle: PropTypes.string.isRequired,
    baseOfferExpirationDate: PropTypes.string.isRequired,
    baseOfferPrice: PropTypes.string.isRequired,
    switchDirection: PropTypes.string.isRequired,
    switchOfferTitle: PropTypes.string.isRequired
  }).isRequired,
  t: PropTypes.func
};

CancelSwitchPopup.defaultProps = {
  t: k => k
};

export default withTranslation()(labeling()(CancelSwitchPopup));
