import React, { useState } from 'react';
import PropTypes from 'prop-types';
import InnerPopupWrapper from 'components/InnerPopupWrapper';
import { withTranslation } from 'react-i18next';
import labeling from 'containers/labeling';
import Button from 'components/Button';
import Loader from 'components/Loader';
import { updateSwitch } from 'api';
import checkmarkIconBase from 'assets/images/checkmarkBase';

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
    switchOfferTitle,
    baseOfferTitle,
    baseOfferExpirationDate,
    baseOfferPrice
  },
  hideInnerPopup,
  updateList,
  setSwitchDetails,
  t
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [step, setStep] = useState(1);

  const cancelSwitch = async () => {
    setIsLoading(true);
    try {
      const resp = await updateSwitch(pendingSwitchId);
      if (!resp.errors.length) {
        setIsLoading(false);
        setSwitchDetails({ details: { pendingSwitchId }, type: 'delete' });
        setStep(2);
      } else {
        setIsError(true);
        setIsLoading(false);
      }
    } catch {
      setIsError(true);
      setIsLoading(false);
    }
  };

  return (
    <InnerPopupWrapper
      steps={2}
      popupTitle={t('Stop switch')}
      currentStep={step}
      isError={isError}
    >
      {step === 1 && (
        <>
          <ContentStyled>
            <TitleStyled>{t('Stop switch')}</TitleStyled>
            <TextStyled>
              {t(
                `Your {{switchDirection}} to {{switchOfferTitle}} is still pending and will take effect on {{baseOfferExpirationDate}}. If you decide to stop the switch, you will keep access to current plan and be charged {{baseOfferPrice}} on the next billing date.`,
                {
                  switchDirection,
                  switchOfferTitle,
                  baseOfferExpirationDate,
                  baseOfferPrice
                }
              )}
              <br />
              <br />
              {t('Are you sure you want to stop the switch?')}
            </TextStyled>
          </ContentStyled>
          <ButtonWrapperStyled removeMargin>
            <Button theme="simple" onClickFn={hideInnerPopup}>
              {t('No, thanks')}
            </Button>
            <Button theme="danger" onClickFn={cancelSwitch}>
              {isLoading ? (
                <Loader buttonLoader color="#ffffff" />
              ) : (
                t(`Stop switch`)
              )}
            </Button>
          </ButtonWrapperStyled>
        </>
      )}
      {step === 2 && (
        <>
          <ContentStyled>
            <img src={checkmarkIconBase} alt="checkmark icon" />
            <TitleStyled>{t('Switch stopped')}</TitleStyled>
            <TextStyled>
              {t(
                `You have successfully stopped your {{switchDirection}} to {{switchOfferTitle}}. You will be charged a current price on {{baseOfferExpirationDate}} and keep access to {{baseOfferTitle}}.`,
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
                updateList();
                hideInnerPopup();
              }}
            >
              {t('Back to settings')}
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
  setSwitchDetails: PropTypes.func.isRequired,
  t: PropTypes.func
};

CancelSwitchPopup.defaultProps = {
  updateList: () => {},
  t: k => k
};

export default withTranslation()(labeling()(CancelSwitchPopup));
