import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InnerPopupWrapper from 'components/InnerPopupWrapper';
import { useTranslation } from 'react-i18next';
import Button from 'components/Button';
import Loader from 'components/Loader';
import { updateSwitch } from 'api';
import checkmarkIconBase from 'assets/images/checkmarkBase';
import eventDispatcher, {
  MSSDK_CANCEL_SWITCH_ACTION_TRIGGERED,
  MSSDK_CANCEL_SWITCH_ACTION_SUCCESSFUL,
  MSSDK_CANCEL_SWITCH_ACTION_FAILED,
  MSSDK_CANCEL_SWITCH_ACTION_CANCELLED
} from 'util/eventDispatcher';
import { setSwitchDetails, updateList } from 'appRedux/planDetailsSlice';
import { hidePopup } from 'appRedux/popupSlice';
import { dateFormat } from 'util';

import {
  ContentStyled,
  TitleStyled,
  TextStyled,
  ButtonWrapperStyled
} from 'components/InnerPopupWrapper/InnerPopupWrapperStyled';

const CancelPausePopup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [step, setStep] = useState(1);

  const { data: allSwitchDetails } = useSelector(
    (state) => state.plan.switchDetails
  );
  const {
    cancelPause: {
      pendingSwitchId,
      baseOfferExpirationDate,
      baseOfferPrice,
      baseOfferTitle
    }
  } = useSelector((state) => state.popupManager);

  const switchDetails = allSwitchDetails[pendingSwitchId];
  const { t } = useTranslation();

  const eventsPayload = {
    pendingSwitchId,
    fromOfferId: switchDetails?.fromOfferId,
    toOfferId: switchDetails?.toOfferId
  };

  const dispatch = useDispatch();

  const cancelPause = async () => {
    eventDispatcher(MSSDK_CANCEL_SWITCH_ACTION_TRIGGERED, eventsPayload);
    setIsLoading(true);
    try {
      const { errors } = await updateSwitch(pendingSwitchId);
      if (!errors.length) {
        setIsLoading(false);
        dispatch(
          setSwitchDetails({ details: { pendingSwitchId }, type: 'delete' })
        );
        setStep(2);
        eventDispatcher(MSSDK_CANCEL_SWITCH_ACTION_SUCCESSFUL, eventsPayload);
      } else {
        setIsError(true);
        setIsLoading(false);
        eventDispatcher(MSSDK_CANCEL_SWITCH_ACTION_FAILED, {
          ...eventsPayload,
          reason: errors[0]
        });
      }
    } catch {
      setIsError(true);
      setIsLoading(false);
      eventDispatcher(MSSDK_CANCEL_SWITCH_ACTION_FAILED, eventsPayload);
    }
  };

  return (
    <InnerPopupWrapper
      steps={2}
      popupTitle={t('cancelpause-popup.title', 'Cancel pause')}
      currentStep={step}
      isError={isError}
    >
      {step === 1 && (
        <>
          <ContentStyled>
            <TitleStyled>
              {t('cancelpause-popup.title', 'Cancel pause')}
            </TitleStyled>
            <TextStyled>
              {t(
                'cancelpause-popup.information-text',
                'Your current plan will be paused starting on {{baseOfferExpirationDate}}. Cancel the pause to resume access to your {{ pausedOfferTitle }} subscription. While your subscription is paused, you won’t be charged for, and you won’t have access to, {{ pausedOfferTitle }}.',
                {
                  baseOfferExpirationDate: dateFormat(baseOfferExpirationDate),
                  baseOfferPrice,
                  pausedOfferTitle: baseOfferTitle
                }
              )}
            </TextStyled>
            <TextStyled>
              {t(
                'cancelpause-popup.question-text',
                'Would you like to cancel the pause request?'
              )}
            </TextStyled>
          </ContentStyled>
          <ButtonWrapperStyled $removeMargin>
            <Button
              theme='simple'
              onClickFn={() => {
                eventDispatcher(
                  MSSDK_CANCEL_SWITCH_ACTION_CANCELLED,
                  eventsPayload
                );
                dispatch(hidePopup());
              }}
            >
              {t('cancelpause-popup.resign', 'No, thanks')}
            </Button>
            <Button theme='danger' onClickFn={cancelPause}>
              {isLoading ? (
                <Loader buttonLoader color='#ffffff' />
              ) : (
                t('cancelpause-popup.confirm-button-text', 'Cancel pause')
              )}
            </Button>
          </ButtonWrapperStyled>
        </>
      )}
      {step === 2 && (
        <>
          <ContentStyled>
            <img src={checkmarkIconBase} alt='checkmark icon' />
            <TitleStyled>
              {t(
                'cancelpause-popup.confirmation-title',
                'Your pause request has been canceled.'
              )}
            </TitleStyled>
            <TextStyled>
              {t(
                'cancelpause-popup.confirmation-text',
                'Your access to your {{ pausedOfferTitle }} subscription will continue.',
                {
                  pausedOfferTitle: baseOfferTitle
                }
              )}
            </TextStyled>
          </ContentStyled>
          <ButtonWrapperStyled $removeMargin>
            <Button
              theme='confirm'
              onClickFn={() => {
                dispatch(updateList());
                dispatch(hidePopup());
              }}
            >
              {t('cancelpause-popup.back-button', 'Back to My Account')}
            </Button>
          </ButtonWrapperStyled>
        </>
      )}
    </InnerPopupWrapper>
  );
};

export default CancelPausePopup;
