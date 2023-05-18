/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unescaped-entities */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withTranslation, Trans } from 'react-i18next';
import labeling from 'containers/labeling';
import { useSelector } from 'react-redux';
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
  skipAvailableDowngradesStep,
  t
}) => {
  const STEPS = {
    PAUSE: 'PAUSE',
    DOWNGRADES: 'DOWNGRADES',
    SURVEY: 'SURVEY',
    CONFIRMATION: 'CONFIRMATION'
  };
  const INITIAL_STEPS_ARRAY = [STEPS.SURVEY, STEPS.CONFIRMATION];

  const [downgradesList, setDowngradesList] = useState([]);
  const [checkedReason, setCheckedReason] = useState('');
  const [steps, setSteps] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { pauseOffersIDs } = useSelector(state => state.offers);

  const getDowngrades = () => {
    const { planDetails } = store.getState();
    if (planDetails && Object.keys(planDetails.switchSettings).length) {
      const switchSettings = planDetails.switchSettings[offerDetails.offerId];
      const availableSorted = [...switchSettings.available]
        .filter(offer => offer.switchDirection === 'downgrade')
        .sort((aOffer, bOffer) => bOffer.price - aOffer.price);
      return availableSorted;
    }
    return [];
  };

  const scheduledSwitch = () => {
    if (offerDetails.pendingSwitchId) {
      const { planDetails } = store.getState();
      return planDetails.switchDetails[offerDetails.pendingSwitchId];
    }
    return false;
  };

  const downgrades = getDowngrades();

  const shouldShowDowngradeScreen = () => {
    const {
      innerPopup: {
        data: { offerData }
      }
    } = store.getState();
    if (skipAvailableDowngradesStep) {
      return false;
    }
    if (
      offerDetails.pendingSwitchId &&
      scheduledSwitch().direction === 'downgrade'
    ) {
      return false;
    }
    if (!offerData.inTrial && downgrades.length) {
      const downgradesFiltered = downgrades.filter(
        ({ toOfferId }) => !pauseOffersIDs.includes(toOfferId)
      );
      return !!downgradesFiltered.length;
    }
    return false;
  };

  const shouldShowPauseScreen = () => {
    if (downgrades.length) {
      const pauseOffer = downgrades.filter(({ toOfferId }) =>
        pauseOffersIDs.includes(toOfferId)
      );
      return !!pauseOffer.length;
    }
    return false;
  };

  const shouldShowDowngrades = shouldShowDowngradeScreen();
  const shouldShowPause = shouldShowPauseScreen();
  const [currentStep, setCurrentStep] = useState(null);

  const pauseOffer = downgradesList?.filter(({ toOfferId }) =>
    pauseOffersIDs.includes(toOfferId)
  );

  useEffect(() => {
    const tempArray = INITIAL_STEPS_ARRAY.slice();
    if (shouldShowDowngrades && !tempArray.includes(STEPS.DOWNGRADES)) {
      tempArray.unshift(STEPS.DOWNGRADES);
    }
    if (shouldShowPause && !tempArray.includes(STEPS.PAUSE)) {
      tempArray.unshift(STEPS.PAUSE);
    }
    if (tempArray.length !== steps.length) {
      setSteps(tempArray);
    }
    if (!downgradesList.length) setDowngradesList(() => getDowngrades());
  }, []);

  useEffect(() => {
    setCurrentStep(steps[0]);
  }, [steps]);

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
          offerId: offerDetails.offerId,
          cancellationReason: checkedReason
        }
      })
    );
    try {
      setIsLoading(true);
      const isPauseActive = pauseOffersIDs.includes(offerDetails.offerId);
      const response = await updateSubscription({
        offerId: offerDetails.offerId,
        status: isPauseActive ? 'terminated' : 'cancelled',
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

  const cancelUnsubscribeAction = () => {
    window.dispatchEvent(new CustomEvent('MSSDK:unsubscribe-action-cancelled'));
    hideInnerPopup();
  };

  const { offerTitle, expiresAt, offerId, period } = offerDetails;
  const formattedExpiresAt = dateFormat(expiresAt);
  const scheduledSwitchTitle = t(
    `offer-title-${scheduledSwitch().toOfferId}`,
    scheduledSwitch().title
  );
  const translatedTitle = t(`offer-title-${offerId}`, offerTitle);

  // Filter out the pause subscription
  const downgradesListFiltered = downgradesList?.filter(
    ({ toOfferId }) => !pauseOffersIDs.includes(toOfferId)
  );

  if (!steps || !currentStep) return <></>;

  return (
    <InnerPopupWrapper
      steps={steps.length}
      popupTitle={t('unsubscribe-popup.title', 'Manage your plan')}
      isError={isError}
      currentStep={steps.indexOf(currentStep) + 1}
    >
      {currentStep === STEPS.PAUSE && (
        <ContentStyled>
          <TitleStyled>
            {t(
              'unsubscribe-popup.pause-title',
              'Would you like to pause your subscription instead?'
            )}
          </TitleStyled>
          <TextStyled>
            {t(
              'unsubscribe-popup.pause-question',
              'Need to step away? No problem.'
            )}
          </TextStyled>
          <TextStyled>
            {t(
              'unsubscribe-popup.pause-description',
              'Pause your subscription until the beginning of next season, you can resume at any time.'
            )}
          </TextStyled>
          <ButtonWrapperStyled fillWrapper customMargin="80px 0 0">
            <Button
              theme="confirm"
              onClickFn={() => {
                showInnerPopup({
                  type: 'pauseSubscription',
                  data: {
                    offerData: {
                      ...pauseOffer[0]
                    },
                    isPartOfCancellationFlow: true
                  }
                });
              }}
            >
              {t('unsubscribe-popup.pause-button-text', 'Pause')}
            </Button>
          </ButtonWrapperStyled>
          <TextStyled>
            {t('Or still wants to cancel a subscription?')}
          </TextStyled>
          <ButtonWrapperStyled removeMargin>
            <Button theme="simple" onClickFn={hideInnerPopup}>
              {t('unsubscribe-popup.back-button-text', 'Back to My Account')}
            </Button>
            <Button
              theme="primary"
              onClickFn={() =>
                setCurrentStep(steps[steps.indexOf(currentStep) + 1])
              }
            >
              {t('unsubscribe-popup.unsubscribe-button-text', 'Unsubscribe')}
            </Button>
          </ButtonWrapperStyled>
        </ContentStyled>
      )}
      {currentStep === STEPS.DOWNGRADES && (
        <ContentStyled>
          <>
            <TitleStyled>
              {t('How about a plan downgrade instead of cancellation?')}
            </TitleStyled>
            <TextStyled>
              {t('Here are the plans that might suit your needs:')}
            </TextStyled>
          </>
          <DowngradesWrapperStyled>
            {downgradesListFiltered.map(downgradeOffer => {
              return (
                <OfferCardWrapperStyled
                  onClick={() =>
                    showInnerPopup({
                      type: 'switchPlan',
                      data: {
                        offerData: {
                          ...downgradeOffer
                        },
                        isPartOfCancellationFlow: true
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
                    offerId={downgradeOffer.toOfferId}
                  />
                </OfferCardWrapperStyled>
              );
            })}
          </DowngradesWrapperStyled>
          <TextStyled>
            {t('Or still wants to cancel a subscription?')}
          </TextStyled>
          <ButtonWrapperStyled removeMargin>
            <Button theme="simple" onClickFn={hideInnerPopup}>
              {t('Back to My Account')}
            </Button>
            <Button
              theme="confirm"
              onClickFn={() => setCurrentStep(STEPS.SURVEY)}
            >
              {t('unsubscribe-popup.unsubscribe-button-text', 'Unsubscribe')}
            </Button>
          </ButtonWrapperStyled>
        </ContentStyled>
      )}
      {currentStep === STEPS.SURVEY && (
        <>
          <ContentStyled>
            <TitleStyled>{t('We’re sorry to see you go')}</TitleStyled>
            {period === 'season' ? (
              <TextStyled>
                {t(
                  'You will keep access to your seasonal subscription until {{formattedExpiresAt}}. Before you go, please let us know why you’re leaving.',
                  {
                    formattedExpiresAt
                  }
                )}
              </TextStyled>
            ) : (
              <TextStyled>
                {scheduledSwitch() ? (
                  t(
                    `Your subscription switch is still pending. You will switch to {{scheduledSwitchTitle}} and be charged a new price.`,
                    { scheduledSwitchTitle }
                  )
                ) : (
                  <>
                    {offerDetails.inTrial
                      ? t(
                          'Your {{translatedTitle}} free trial will end on {{formattedExpiresAt}}.',
                          { translatedTitle, formattedExpiresAt }
                        )
                      : t(
                          'Your {{translatedTitle}} subscription is paid until {{formattedExpiresAt}}.',
                          { translatedTitle, formattedExpiresAt }
                        )}
                  </>
                )}{' '}
                <Trans i18nKey="unsubscribe-info">
                  If you would like to proceed with cancelling your
                  subscription, please select 'Unsubscribe' below, and your
                  subscription will be cancelled as of {{ formattedExpiresAt }}.
                  Until then, you will continue to have access to all of your
                  current subscription features. Before you go, please let us
                  know why you're leaving.
                </Trans>
              </TextStyled>
            )}
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
            <Button
              theme="simple"
              onClickFn={() =>
                shouldShowDowngrades
                  ? setCurrentStep(STEPS.DOWNGRADES)
                  : cancelUnsubscribeAction()
              }
            >
              {t('Go back')}
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
              'You have been successfully unsubscribed. Your current plan will expire on'
            )}{' '}
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
            {t('Back to My Account')}
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
  skipAvailableDowngradesStep: PropTypes.bool,
  t: PropTypes.func
};

Unsubscribe.defaultProps = {
  customCancellationReasons: null,
  skipAvailableDowngradesStep: false,
  t: k => k
};

export default withTranslation()(labeling()(Unsubscribe));
