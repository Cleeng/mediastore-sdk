import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import InnerPopupWrapper from 'components/InnerPopupWrapper';
import { useTranslation } from 'react-i18next';
import Button from 'components/Button';
import Loader from 'components/Loader';
import { updateSwitch } from 'api';
import checkmarkIconBase from 'assets/images/checkmarkBase';
import { dateFormat, INFINITE_DATE } from 'util';

import {
  ContentStyled,
  TitleStyled,
  TextStyled,
  ButtonWrapperStyled
} from 'components/InnerPopupWrapper/InnerPopupWrapperStyled';

const CancelSwitchPopup = ({
  popupData: {
    pendingSwitchId,
    switchDirection,
    switchOfferTitle: untranslatedSwitchOfferTitle,
    baseOfferTitle: untranslatedBaseOfferTitle,
    baseOfferExpirationDate
  },
  hideInnerPopup,
  updateList,
  setSwitchDetails
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [step, setStep] = useState(1);

  const planDetailsState = useSelector(state => state.planDetails);
  const switchDetails = planDetailsState.switchDetails[pendingSwitchId];
  const eventsPayload = {
    pendingSwitchId,
    fromOfferId: switchDetails && switchDetails.fromOfferId,
    toOfferId: switchDetails && switchDetails.toOfferId
  };

  const [offerIdsFallback, setOfferIdsFallback] = useState({}); // required to keep translations in step 2

  const { t } = useTranslation();

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
        setSwitchDetails({ details: { pendingSwitchId }, type: 'delete' });
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
      popupTitle={t('cancelswitch-popup.title', 'Cancel switch')}
      currentStep={step}
      isError={isError}
    >
      {step === 1 && (
        <>
          <ContentStyled>
            <TitleStyled>
              {t('cancelswitch-popup.title', 'Cancel switch')}
            </TitleStyled>
            <TextStyled>
              {t(
                'cancelswitch-popup.switch-pending',
                `Your {{switchDirection}} to {{switchOfferTitle}} is still pending and will take effect on {{baseOfferExpirationDate}}. If you decide to cancel the switch, you will keep access to current plan and be charged {{baseOfferPrice}} on the next billing date.`,
                {
                  switchDirection,
                  switchOfferTitle,
                  baseOfferExpirationDate:
                    baseOfferExpirationDate === INFINITE_DATE
                      ? t(
                          'cancelswitch-popup.next-season-start',
                          'the next season start'
                        )
                      : dateFormat(baseOfferExpirationDate)
                }
              )}
              <br />
              <br />
              {t(
                'cancelswitch-popup.question',
                'Are you sure you want to cancel the switch?'
              )}
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
                hideInnerPopup();
              }}
            >
              {t('cancelswitch-popup.no-thanks', 'No, thanks')}
            </Button>
            <Button theme="danger" onClickFn={cancelSwitch}>
              {isLoading ? (
                <Loader buttonLoader color="#ffffff" />
              ) : (
                t('cancelswitch-popup.title', 'Cancel switch')
              )}
            </Button>
          </ButtonWrapperStyled>
        </>
      )}
      {step === 2 && (
        <>
          <ContentStyled>
            <img src={checkmarkIconBase} alt="checkmark icon" />
            <TitleStyled>
              {t(
                'cancelswitch-popup.switch-cancelled-title',
                'Switch canceled'
              )}
            </TitleStyled>
            <TextStyled>
              {t(
                'cancelswitch-popup.switch-cancelled',
                'You have successfully canceled your {{switchDirection}} to {{switchOfferTitle}}. You will be charged a current price on {{baseOfferExpirationDate}} and keep access to {{baseOfferTitle}}.',
                {
                  switchDirection,
                  switchOfferTitle,
                  baseOfferExpirationDate:
                    baseOfferExpirationDate === INFINITE_DATE
                      ? t(
                          'cancelswitch-popup.next-season-start',
                          'the next season start'
                        )
                      : dateFormat(baseOfferExpirationDate),
                  baseOfferTitle
                }
              )}
            </TextStyled>
          </ContentStyled>
          <ButtonWrapperStyled removeMargin>
            <Button
              theme="confirm"
              onClickFn={() => {
                updateList();
                hideInnerPopup();
              }}
            >
              {t('cancelswitch-popup.back-to-my-account', 'Back to My Account')}
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
  hideInnerPopup: PropTypes.func.isRequired,
  updateList: PropTypes.func,
  setSwitchDetails: PropTypes.func.isRequired
};

CancelSwitchPopup.defaultProps = {
  updateList: () => {}
};

export default CancelSwitchPopup;
