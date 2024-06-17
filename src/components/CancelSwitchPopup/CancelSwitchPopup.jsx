import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InnerPopupWrapper from 'components/InnerPopupWrapper';
import { useTranslation } from 'react-i18next';
import Button from 'components/Button';
import Loader from 'components/Loader';
import { updateSwitch } from 'api';
import checkmarkIconBase from 'assets/images/checkmarkBase';
import { updateList, setSwitchDetails } from 'appRedux/planDetailsSlice';
import { hidePopup } from 'appRedux/popupSlice';
import { dateFormat, INFINITE_DATE } from 'util';

import {
  ContentStyled,
  TitleStyled,
  TextStyled,
  ButtonWrapperStyled
} from 'components/InnerPopupWrapper/InnerPopupWrapperStyled';

const CancelSwitchPopup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [step, setStep] = useState(1);

  const { data: allSwitchDetails } = useSelector(
    (state) => state.plan.switchDetails
  );
  const {
    cancelSwitch: {
      pendingSwitchId,
      switchDirection,
      switchOfferTitle: untranslatedSwitchOfferTitle,
      baseOfferTitle: untranslatedBaseOfferTitle,
      baseOfferExpirationDate,
      baseOfferPrice
    }
  } = useSelector((state) => state.popupManager);

  const switchDetails = allSwitchDetails[pendingSwitchId];
  const eventsPayload = {
    pendingSwitchId,
    fromOfferId: switchDetails && switchDetails.fromOfferId,
    toOfferId: switchDetails && switchDetails.toOfferId
  };
  const dispatch = useDispatch();

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
      popupTitle={t(
        `cancelswitch-popup.title.${switchDirection}`,
        `Cancel ${switchDirection}`
      )}
      currentStep={step}
      isError={isError}
    >
      {step === 1 && (
        <>
          <ContentStyled>
            <TitleStyled $textTransform='capitalize'>
              {t(
                `cancelswitch-popup.title.${switchDirection}`,
                `Cancel ${switchDirection}`
              )}
            </TitleStyled>
            <TextStyled>
              {t(
                `cancelswitch-popup.pending.${switchDirection}`,
                `Your {{switchDirection}} to {{switchOfferTitle}} is still pending and will take effect on {{baseOfferExpirationDate}}. If you decide to cancel the {{switchDirection}}, you will keep access to current plan and be charged {{baseOfferPrice}} on the next billing date.`,
                {
                  switchDirection: t(switchDirection, switchDirection),
                  switchOfferTitle,
                  baseOfferExpirationDate:
                    baseOfferExpirationDate === INFINITE_DATE
                      ? t(
                          'cancelswitch-popup.next-season-start',
                          'the next season start'
                        )
                      : dateFormat(baseOfferExpirationDate),
                  baseOfferPrice
                }
              )}
              <br />
              <br />
              {t(
                `cancelswitch-popup.question.${switchDirection}`,
                `Are you sure you want to cancel the ${switchDirection}?`
              )}
            </TextStyled>
          </ContentStyled>
          <ButtonWrapperStyled $removeMargin>
            <Button
              theme='simple'
              onClickFn={() => {
                window.dispatchEvent(
                  new CustomEvent('MSSDK:cancel-switch-action-cancelled', {
                    detail: eventsPayload
                  })
                );
                dispatch(hidePopup());
              }}
            >
              {t('cancelswitch-popup.resign', 'No, thanks')}
            </Button>
            <Button theme='danger' onClickFn={cancelSwitch}>
              {isLoading ? (
                <Loader buttonLoader color='#ffffff' />
              ) : (
                t(
                  `cancelswitch-popup.confirm-button-text.${switchDirection}`,
                  `Cancel ${switchDirection}`
                )
              )}
            </Button>
          </ButtonWrapperStyled>
        </>
      )}
      {step === 2 && (
        <>
          <ContentStyled>
            <img src={checkmarkIconBase} alt='checkmark icon' />
            <TitleStyled $textTransform='capitalize'>
              {t(
                `cancelswitch-popup.cancelled-title.${switchDirection}`,
                `${switchDirection} canceled`
              )}
            </TitleStyled>
            <TextStyled>
              {t(
                'cancelswitch-popup.switch-cancelled',
                'You have successfully canceled your {{switchDirection}} to {{switchOfferTitle}}. You will be charged a current price on {{baseOfferExpirationDate}} and keep access to {{baseOfferTitle}}.',
                {
                  switchDirection: t(switchDirection, switchDirection),
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
          <ButtonWrapperStyled $removeMargin>
            <Button
              theme='confirm'
              onClickFn={() => {
                dispatch(hidePopup());
                dispatch(updateList());
              }}
            >
              {t('cancelswitch-popup.back-button', 'Back to My Account')}
            </Button>
          </ButtonWrapperStyled>
        </>
      )}
    </InnerPopupWrapper>
  );
};

export default CancelSwitchPopup;
