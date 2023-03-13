import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
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
import { setSwitchDetails, updateList } from 'redux/planDetailsSlice';
import { hidePopup } from 'redux/popupSlice';

import {
  ContentStyled,
  TitleStyled,
  TextStyled,
  ButtonWrapperStyled
} from 'components/InnerPopupWrapper/InnerPopupWrapperStyled';

const CancelPausePopup = ({ t }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [step, setStep] = useState(1);

  const { data: allSwitchDetails } = useSelector(
    state => state.plan.switchDetails
  );
  const {
    cancelPause: { pendingSwitchId, baseOfferExpirationDate, baseOfferPrice }
  } = useSelector(state => state.popupManager);

  const switchDetails = allSwitchDetails[pendingSwitchId];
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
                'The subscription pause will take effect on  {{baseOfferExpirationDate}}. Are you sure you want to cancel the scheduled pause and resume your subscription? If you resume your plan, you will be charged {{baseOfferPrice}} on the next billing date.',
                {
                  baseOfferExpirationDate,
                  baseOfferPrice
                }
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
                dispatch(hidePopup({ type: 'cancelPause' }));
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
              {t('cancel-pause-popup.confirmation-title', 'Pause canceled')}
            </TitleStyled>
            <TextStyled>
              {t(
                'cancel-pause-popup.confirmation-text',
                'You have successfully canceled subscription pause.'
              )}
            </TextStyled>
          </ContentStyled>
          <ButtonWrapperStyled removeMargin>
            <Button
              theme="confirm"
              onClickFn={() => {
                dispatch(updateList());
                dispatch(hidePopup({ type: 'cancelPause' }));
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
  t: PropTypes.func
};

CancelPausePopup.defaultProps = {
  t: k => k
};

export default withTranslation()(labeling()(CancelPausePopup));
