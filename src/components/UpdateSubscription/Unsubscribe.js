import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import labeling from 'containers/labeling';
import store from 'redux/store';

import updateSubscription from 'api/Customer/updateSubscription';
import { dateFormat, periodMapper } from 'util/planHelper';
import checkmarkIcon from 'assets/images/checkmarkBase';

import Button from 'components/Button';
import Checkbox from 'components/Checkbox';
import InnerPopupWrapper from 'components/InnerPopupWrapper';
import Loader from 'components/Loader';
import OfferCard from 'components/OfferCard';

import {
  ContentStyled,
  TitleStyled,
  TextStyled,
  ButtonWrapperStyled,
  OfferCardWrapperStyled,
  DowngradesWrapperStyled
} from 'components/InnerPopupWrapper/InnerPopupWrapperStyled';
import { ReasonsWrapper, StyledItem } from './UpdateSubscriptionStyled';

const Unsubscribe = ({
  offerDetails,
  hideInnerPopup,
  updateList,
  customCancellationReasons,
  showInnerPopup,
  t
}) => {
  const STEPS = {
    DOWNGRADES: 'DOWNGRADES',
    SURVEY: 'SURVEY',
    CONFIRMATION: 'CONFIRMATION'
  };

  const stepsNumbersWithDowngrade = {
    DOWNGRADES: 1,
    SURVEY: 2,
    CONFIRMATION: 3
  };

  // TODO: use this when downgrades screen should be hidden
  // const stepsNumbers = {
  //   SURVEY: 1,
  //   CONFIRMATION: 1
  // };

  const [checkedReason, setCheckedReason] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [currentStep, setCurrentStep] = useState(STEPS.DOWNGRADES);
  const [downgradesList, setDowngradesList] = useState([]);

  const defaultCancellationReasons = [
    { value: 'Poor customer support', key: 'support' },
    { value: 'Switch to a different service', key: 'service' },
    { value: 'Subscription is too expensive', key: 'expensive' },
    { value: 'Video streaming issues', key: 'issues' },
    { value: 'Not enough interesting content', key: 'content' },
    { value: 'Service is hard to use', key: 'hardUse' },
    { value: 'Content I like has ended', key: 'end' }
  ];

  const calcellationReasonsToShow =
    customCancellationReasons || defaultCancellationReasons;

  const unsubscribe = async () => {
    window.dispatchEvent(
      new CustomEvent('MSSDK:unsubscribe-action-confirmed', {
        detail: {
          offerId: offerDetails.offerId
        }
      })
    );
    try {
      setIsLoading(true);
      const response = await updateSubscription({
        offerId: offerDetails.offerId,
        status: 'cancelled',
        cancellationReason: checkedReason
      });
      if (response.errors.length) {
        setIsError(true);
        setIsLoading(false);
      } else {
        setCurrentStep(STEPS.CONFIRMATION);
        setIsLoading(false);
      }
    } catch {
      setIsError(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const { planDetails } = store.getState();
    if (planDetails && planDetails.switchSettings) {
      const switchSettings = planDetails.switchSettings[offerDetails.offerId];
      const availableSorted = [...switchSettings.available]
        .filter(offer => offer.switchDirection === 'downgrade')
        .sort((aOffer, bOffer) => bOffer.price - aOffer.price);
      if (availableSorted.length) {
        setDowngradesList(availableSorted);
      }
    }
  }, []);

  return (
    <InnerPopupWrapper
      steps={3}
      popupTitle={t('Manage your plan')}
      isError={isError}
      currentStep={stepsNumbersWithDowngrade[currentStep]}
    >
      {currentStep === STEPS.DOWNGRADES && (
        <ContentStyled>
          <TitleStyled>
            {t('How about a plan switch instead of cancellation?')}
          </TitleStyled>
          <TextStyled>
            {t('Here are the plans that might match your needs: ')}
          </TextStyled>
          <DowngradesWrapperStyled>
            {downgradesList.map(downgradeOffer => {
              return (
                <OfferCardWrapperStyled
                  onClick={() =>
                    showInnerPopup({
                      type: 'switchPlan',
                      data: {
                        offerData: {
                          ...downgradeOffer
                        }
                      }
                    })
                  }
                  key={downgradeOffer.toOfferId}
                >
                  <OfferCard
                    period={
                      periodMapper[downgradeOffer.period].chargedForEveryText
                    }
                    offerType="S"
                    title={downgradeOffer.title}
                    currency={downgradeOffer.nextPaymentPriceCurrencySymbol}
                    price={
                      Math.round(downgradeOffer.nextPaymentPrice * 100) / 100
                    }
                  />
                </OfferCardWrapperStyled>
              );
            })}
          </DowngradesWrapperStyled>
          <TextStyled>Or still wants to cancel a subscription?</TextStyled>
          <ButtonWrapperStyled removeMargin>
            <Button theme="simple" onClickFn={hideInnerPopup}>
              {t('Back to settings')}
            </Button>
            <Button
              theme="confirm"
              onClickFn={() => setCurrentStep(STEPS.SURVEY)}
            >
              {t('Unsubscribe')}
            </Button>
          </ButtonWrapperStyled>
        </ContentStyled>
      )}
      {currentStep === STEPS.SURVEY && (
        <>
          <ContentStyled>
            <TitleStyled>{t('We’re sorry to see you go')}</TitleStyled>
            <TextStyled>
              Your <strong>{offerDetails.offerTitle}</strong>{' '}
              {offerDetails.inTrial
                ? `free trial will end on `
                : `subscription is
                paid until `}
              <strong>{dateFormat(offerDetails.expiresAt)}</strong>. If you
              would like to proceed with cancelling your subscription, please
              select &apos;Unsubscribe&apos; below, and your subscription will
              be cancelled as of{' '}
              <strong>{dateFormat(offerDetails.expiresAt)}</strong>. Until then,
              you will continue to have access to all of your current
              subscription features. Before you go, please let us know why
              you&apos;re leaving.
            </TextStyled>
            {calcellationReasonsToShow && (
              <ReasonsWrapper>
                {calcellationReasonsToShow.map(reason => (
                  <StyledItem key={reason.key}>
                    <Checkbox
                      isRadioButton
                      onClickFn={() => setCheckedReason(reason.value)}
                      checked={reason.value === checkedReason}
                    >
                      {t(reason.value)}
                    </Checkbox>
                  </StyledItem>
                ))}
              </ReasonsWrapper>
            )}
          </ContentStyled>
          <ButtonWrapperStyled removeMargin>
            <Button theme="simple" onClickFn={hideInnerPopup}>
              {t('No, thanks')}
            </Button>
            <Button
              theme="confirm"
              onClickFn={unsubscribe}
              disabled={checkedReason === '' || isLoading}
            >
              {(isLoading && <Loader buttonLoader color="#ffffff" />) ||
                t('Unsubscribe')}
            </Button>
          </ButtonWrapperStyled>
        </>
      )}
      {currentStep === STEPS.CONFIRMATION && (
        <ContentStyled>
          <img src={checkmarkIcon} alt="checkmark icon" />
          <TitleStyled>{t('Miss you already.')}</TitleStyled>
          <TextStyled>
            {t(
              'You have been successfully unsubscribed. Your current plan will expire on '
            )}
            <b>{dateFormat(offerDetails.expiresAt)}</b>.
          </TextStyled>
          <Button
            width="auto"
            margin="30px auto 0 auto"
            onClickFn={() => {
              hideInnerPopup();
              updateList();
            }}
          >
            {t('Back to settings')}
          </Button>
        </ContentStyled>
      )}
    </InnerPopupWrapper>
  );
};

Unsubscribe.propTypes = {
  hideInnerPopup: PropTypes.func.isRequired,
  showInnerPopup: PropTypes.func.isRequired,
  updateList: PropTypes.func.isRequired,
  offerDetails: PropTypes.objectOf(PropTypes.any).isRequired,
  customCancellationReasons: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    })
  ),
  t: PropTypes.func
};

Unsubscribe.defaultProps = {
  customCancellationReasons: null,
  t: k => k
};

export default withTranslation()(labeling()(Unsubscribe));
