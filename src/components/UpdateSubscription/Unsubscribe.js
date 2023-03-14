/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unescaped-entities */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withTranslation, Trans } from 'react-i18next';
import labeling from 'containers/labeling';
import { useSelector, useDispatch } from 'react-redux';

import updateSubscription from 'api/Customer/updateSubscription';
import { dateFormat, periodMapper } from 'util/planHelper';
import checkmarkIcon from 'assets/images/checkmarkBase';

import Button from 'components/Button';
import Checkbox from 'components/Checkbox';
import InnerPopupWrapper from 'components/InnerPopupWrapper';
import Loader from 'components/Loader';
import OfferCard from 'components/OfferCard';
import { updateList } from 'redux/planDetailsSlice';
import { showPopup, hidePopup } from 'redux/popupSlice';

import {
  ContentStyled,
  TitleStyled,
  TextStyled,
  ButtonWrapperStyled,
  OfferCardWrapperStyled,
  DowngradesWrapperStyled,
  HorizontalLineStyled
} from 'components/InnerPopupWrapper/InnerPopupWrapperStyled';
import { ReasonsWrapper, StyledItem } from './UpdateSubscriptionStyled';

const Unsubscribe = ({
  customCancellationReasons,
  skipAvailableDowngradesStep,
  t
}) => {
  const STEPS = {
    DOWNGRADES: 'DOWNGRADES',
    SURVEY: 'SURVEY',
    CONFIRMATION: 'CONFIRMATION'
  };

  const EXTENDED_FLOW_STEP_NUMBER = {
    DOWNGRADES: 1,
    SURVEY: 2,
    CONFIRMATION: 3
  };

  const BASIC_FLOW_STEP_NUMBER = {
    SURVEY: 1,
    CONFIRMATION: 2
  };

  const [downgradesList, setDowngradesList] = useState([]);
  const [checkedReason, setCheckedReason] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { pauseOffersIDs } = useSelector(state => state.offers);
  const { data: switchSettings } = useSelector(
    state => state.plan.switchSettings
  );
  const { data: switchDetails } = useSelector(
    state => state.plan.switchDetails
  );
  const {
    updateSubscription: { offerData: offerDetails }
  } = useSelector(state => state.popupManager);

  const dispatch = useDispatch();

  const getDowngrades = () => {
    if (Object.keys(switchSettings).length) {
      const offerSwitchSettings = switchSettings[offerDetails.offerId];
      const availableSorted = [...offerSwitchSettings.available]
        .filter(offer => offer.switchDirection === 'downgrade')
        .sort((aOffer, bOffer) => bOffer.price - aOffer.price);
      return availableSorted;
    }
    return [];
  };

  const scheduledSwitch = () => {
    if (offerDetails.pendingSwitchId) {
      return switchDetails[offerDetails.pendingSwitchId];
    }
    return false;
  };

  const shouldShowDowngradeScreen = () => {
    if (skipAvailableDowngradesStep) {
      return false;
    }
    if (
      offerDetails.pendingSwitchId &&
      scheduledSwitch().direction === 'downgrade'
    ) {
      return false;
    }
    if (!offerDetails.inTrial && getDowngrades().length) {
      return true;
    }
    return false;
  };

  const shouldShowDowngrades = shouldShowDowngradeScreen();
  const [currentStep, setCurrentStep] = useState(
    shouldShowDowngrades ? STEPS.DOWNGRADES : STEPS.SURVEY
  );

  useEffect(() => {
    if (shouldShowDowngrades) {
      setDowngradesList(() => getDowngrades());
    }
  }, []);

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
    dispatch(hidePopup());
  };

  const { offerTitle, expiresAt, offerId } = offerDetails;
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
  const pauseOffer = downgradesList?.filter(({ toOfferId }) =>
    pauseOffersIDs.includes(toOfferId)
  );

  return (
    <InnerPopupWrapper
      steps={shouldShowDowngrades ? 3 : 2}
      popupTitle={t('Manage your plan')}
      isError={isError}
      currentStep={
        shouldShowDowngrades
          ? EXTENDED_FLOW_STEP_NUMBER[currentStep]
          : BASIC_FLOW_STEP_NUMBER[currentStep]
      }
    >
      {currentStep === STEPS.DOWNGRADES && (
        <ContentStyled>
          {pauseOffer.length ? (
            <>
              <TitleStyled>
                {downgradesListFiltered.length
                  ? t('We’re sorry to see you go!')
                  : t('How about pausing your subscription?')}
              </TitleStyled>
              <TextStyled>
                {downgradesListFiltered.length
                  ? t(
                      'You might want to pause your subscription instead or find another plan that will suit you better'
                    )
                  : t(
                      'You won’t be charged for your current plan until your subscription is resumed.'
                    )}
              </TextStyled>
              <OfferCardWrapperStyled
                onClick={() => {
                  dispatch(
                    showPopup({
                      type: 'pauseSubscription',
                      data: {
                        offerData: {
                          ...pauseOffer[0]
                        },
                        isPartOfCancellationFlow: true
                      }
                    })
                  );
                }}
              >
                <OfferCard
                  offerType="S"
                  title={t('Pause subscription')}
                  description={t(
                    'Your current plan will be paused for {{ pausePeriod }}',
                    {
                      pausePeriod:
                        periodMapper[pauseOffer[0].period].chargedForEveryText
                    }
                  )}
                  offerId={pauseOffer[0].toOfferId}
                  isPriceBoxHidden
                  isPaused
                />
              </OfferCardWrapperStyled>
              {downgradesListFiltered.length !== 0 && <HorizontalLineStyled />}
            </>
          ) : (
            <>
              <TitleStyled>
                {t('How about a plan downgrade instead of cancellation?')}
              </TitleStyled>
              <TextStyled>
                {t('Here are the plans that might suit your needs:')}
              </TextStyled>
            </>
          )}
          <DowngradesWrapperStyled>
            {downgradesListFiltered.map(downgradeOffer => {
              return (
                <OfferCardWrapperStyled
                  onClick={() =>
                    dispatch(
                      showPopup({
                        type: 'switchPlan',
                        data: {
                          offerData: {
                            ...downgradeOffer
                          },
                          isPartOfCancellationFlow: true
                        }
                      })
                    )
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
            <Button theme="simple" onClickFn={() => dispatch(hidePopup())}>
              {t('Back to My Account')}
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
                If you would like to proceed with cancelling your subscription,
                please select 'Unsubscribe' below, and your subscription will be
                cancelled as of {{ formattedExpiresAt }}. Until then, you will
                continue to have access to all of your current subscription
                features. Before you go, please let us know why you're leaving.
              </Trans>
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
              dispatch(hidePopup());
              dispatch(updateList());
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
