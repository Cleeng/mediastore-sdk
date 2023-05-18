import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import InnerPopupWrapper from 'components/InnerPopupWrapper';
import { withTranslation } from 'react-i18next';
import labeling from 'containers/labeling';
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

import {
  ContentStyled,
  TitleStyled,
  TextStyled,
  ButtonWrapperStyled
} from 'components/InnerPopupWrapper/InnerPopupWrapperStyled';

const CancelPausePopup = ({
  popupData: { pendingSwitchId, baseOfferExpirationDate, baseOfferPrice },
  hideInnerPopup,
  updateList,
  setSwitchDetails,
  t
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [step, setStep] = useState(1);

  const planDetailsState = useSelector(state => state.planDetails);
  const switchDetails = planDetailsState.switchDetails[pendingSwitchId];
  const { offerToSwitch } = planDetailsState;
  const eventsPayload = {
    pendingSwitchId,
    fromOfferId: switchDetails?.fromOfferId,
    toOfferId: switchDetails?.toOfferId
  };

  const cancelPause = async () => {
    eventDispatcher(MSSDK_CANCEL_SWITCH_ACTION_TRIGGERED, eventsPayload);
    setIsLoading(true);
    try {
      const { errors } = await updateSwitch(pendingSwitchId);
      if (!errors.length) {
        setIsLoading(false);
        setSwitchDetails({ details: { pendingSwitchId }, type: 'delete' });
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

  const pausedOfferTitle = offerToSwitch?.offerTitle;
  return (
    <InnerPopupWrapper
      steps={2}
      popupTitle={t('cancel-pause-popup.title', 'Cancel pause')}
      currentStep={step}
      isError={isError}
    >
      {step === 1 && (
        <>
          <ContentStyled>
            <TitleStyled>
              {t('cancel-pause-popup.title', 'Cancel pause')}
            </TitleStyled>
            <TextStyled>
              {t(
                'cancel-pause-popup.information-text',
                'Your current plan will be paused starting on {{baseOfferExpirationDate}}. Cancel the pause to resume access to your {{ pausedOfferTitle }} subscription. While your subscription is paused, you won’t be charged for, and you won’t have access to, {{ pausedOfferTitle }}.',
                {
                  baseOfferExpirationDate,
                  baseOfferPrice,
                  pausedOfferTitle
                }
              )}
            </TextStyled>
            <TextStyled>
              {t(
                'cancel-pause-popup.question-text',
                'Would you like to cancel the pause request?'
              )}
            </TextStyled>
          </ContentStyled>
          <ButtonWrapperStyled removeMargin>
            <Button
              theme="simple"
              onClickFn={() => {
                eventDispatcher(
                  MSSDK_CANCEL_SWITCH_ACTION_CANCELLED,
                  eventsPayload
                );
                hideInnerPopup();
              }}
            >
              {t('No, thanks')}
            </Button>
            <Button theme="danger" onClickFn={cancelPause}>
              {isLoading ? (
                <Loader buttonLoader color="#ffffff" />
              ) : (
                t('cancel-pause-popup.confirm-button-text', 'Cancel pause')
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
                'cancel-pause-popup.confirmation-title',
                'Your pause request has been canceled.'
              )}
            </TitleStyled>
            <TextStyled>
              {t(
                'cancel-pause-popup.confirmation-text',
                'Your access to your {{ pausedOfferTitle }} subscription will continue.',
                {
                  pausedOfferTitle
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
              {t('Back to My Account')}
            </Button>
          </ButtonWrapperStyled>
        </>
      )}
    </InnerPopupWrapper>
  );
};

CancelPausePopup.propTypes = {
  popupData: PropTypes.shape({
    pendingSwitchId: PropTypes.string.isRequired,
    baseOfferExpirationDate: PropTypes.string.isRequired,
    baseOfferPrice: PropTypes.string.isRequired
  }).isRequired,
  hideInnerPopup: PropTypes.func.isRequired,
  updateList: PropTypes.func,
  setSwitchDetails: PropTypes.func.isRequired,
  t: PropTypes.func
};

CancelPausePopup.defaultProps = {
  updateList: () => {},
  t: k => k
};

export default withTranslation()(labeling()(CancelPausePopup));
