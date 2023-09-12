/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unescaped-entities */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation, Trans } from 'react-i18next';

import updateSubscription from 'api/Customer/updateSubscription';
import {
  dateFormat,
  periodMapper,
  INFINITE_DATE,
  currencyFormat
} from 'util/planHelper';
import checkmarkIcon from 'assets/images/checkmarkBase';

import Button from 'components/Button';
import Checkbox from 'components/Checkbox';
import InnerPopupWrapper from 'components/InnerPopupWrapper';
import Loader from 'components/Loader';
import OfferSwitchCard from 'components/OfferSwitchCard';
import { updateList } from 'redux/planDetailsSlice';
import { showPopup, hidePopup } from 'redux/popupSlice';

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
  customCancellationReasons,
  skipAvailableDowngradesStep
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
  const { pauseOffersIDs, offers } = useSelector(state => state.offers);
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

  const { t } = useTranslation();

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

  const downgrades = getDowngrades();

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
    if (!offerDetails.inTrial && downgrades.length) {
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
    {
      value: 'Poor customer support',
      key: 'unsubscribe-popup.cancellation.poor-customer-support'
    },
    {
      value: 'Switch to a different service',
      key: 'unsubscribe-popup.cancellation.service-switch'
    },
    {
      value: 'Subscription is too expensive',
      key: 'unsubscribe-popup.cancellation.too-expensive'
    },
    {
      value: 'Video streaming issues',
      key: 'unsubscribe-popup.cancellation.streaming-issues'
    },
    {
      value: 'Not enough interesting content',
      key: 'unsubscribe-popup.cancellation.not-interesting-content'
    },
    {
      value: 'Service is hard to use',
      key: 'unsubscribe-popup.cancellation.hard-to-use'
    },
    {
      value: 'Content I like has ended',
      key: 'unsubscribe-popup.cancellation.content-ended'
    }
  ];

  const cancellationReasonsToShow = customCancellationReasons?.length
    ? customCancellationReasons
    : defaultCancellationReasons;

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

  const { offerTitle, expiresAt, offerId, period } = offerDetails;
  const formattedExpiresAt = dateFormat(expiresAt);

  const toOfferIdTitle = offers.find(
    ({ longId }) => longId === scheduledSwitch().toOfferId
  )?.title;
  const scheduledSwitchTitle = t(
    `offer-title-${scheduledSwitch().toOfferId}`,
    toOfferIdTitle
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
              onClickFn={() =>
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
                )
              }
            >
              {t('unsubscribe-popup.pause-button-text', 'Pause')}
            </Button>
          </ButtonWrapperStyled>
          <TextStyled>
            {t(
              'unsubscribe-popup.still-cancel',
              'Or still wants to cancel a subscription?'
            )}
          </TextStyled>
          <ButtonWrapperStyled removeMargin>
            <Button theme="simple" onClickFn={() => dispatch(hidePopup())}>
              {t('unsubscribe-popup.back-button', 'Back to My Account')}
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
              {t(
                'unsubscribe-popup.downgrade-instead',
                'How about a plan downgrade instead of cancellation?'
              )}
            </TitleStyled>
            <TextStyled>
              {t(
                'unsubscribe-popup.plans-proposal',
                'Here are the plans that might suit your needs:'
              )}
            </TextStyled>
          </>
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
                  <OfferSwitchCard
                    toOfferId={downgradeOffer.toOfferId}
                    baseOfferId={offerId}
                  />
                </OfferCardWrapperStyled>
              );
            })}
          </DowngradesWrapperStyled>
          <TextStyled>
            {t(
              'unsubscribe-popup.still-cancel',
              'Or still wants to cancel a subscription?'
            )}
          </TextStyled>
          <ButtonWrapperStyled removeMargin>
            <Button theme="simple" onClickFn={() => dispatch(hidePopup())}>
              {t('unsubscribe-popup.back-button', 'Back to My Account')}
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
            <TitleStyled>
              {t('unsubscribe-popup.survey-title', 'We’re sorry to see you go')}
            </TitleStyled>
            {period === 'season' ? (
              <TextStyled>
                {t(
                  'unsubscribe-popup.survey.access-info',
                  'You will keep access to your seasonal subscription until {{formattedExpiresAt}}. Before you go, please let us know why you’re leaving.',
                  {
                    formattedExpiresAt:
                      expiresAt === INFINITE_DATE
                        ? t(
                            'unsubscribe-popup.next-season-start',
                            'the next season start'
                          )
                        : dateFormat(expiresAt)
                  }
                )}
              </TextStyled>
            ) : (
              <TextStyled>
                {scheduledSwitch() ? (
                  t(
                    'unsubscribe-popup.survey.switch-pending',
                    `Your subscription switch is still pending. You will switch to {{scheduledSwitchTitle}} and be charged a new price.`,
                    { scheduledSwitchTitle }
                  )
                ) : (
                  <>
                    {offerDetails.inTrial
                      ? t(
                          'unsubscribe-popup.survey.free-trial',
                          'Your {{translatedTitle}} free trial will end on {{formattedExpiresAt}}.',
                          { translatedTitle, formattedExpiresAt }
                        )
                      : t(
                          'unsubscribe-popup.survey.subscription-paid',
                          'Your {{translatedTitle}} subscription is paid until {{formattedExpiresAt}}.',
                          { translatedTitle, formattedExpiresAt }
                        )}
                  </>
                )}{' '}
                <Trans i18nKey="unsubscribe-popup.survey.info">
                  If you would like to proceed with cancelling your
                  subscription, please select 'Unsubscribe' below, and your
                  subscription will be cancelled as of {{ formattedExpiresAt }}.
                  Until then, you will continue to have access to all of your
                  current subscription features. Before you go, please let us
                  know why you're leaving.
                </Trans>
              </TextStyled>
            )}
            {cancellationReasonsToShow && (
              <ReasonsWrapper>
                {cancellationReasonsToShow.map(({ key, value }) => (
                  <StyledItem key={key}>
                    <Checkbox
                      isRadioButton
                      onClickFn={() => setCheckedReason(value)}
                      checked={value === checkedReason}
                    >
                      {t(key, value)}
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
              {t('unsubscribe-popup.survey.go-back', 'Go back')}
            </Button>
            <Button
              theme="confirm"
              onClickFn={unsubscribe}
              disabled={checkedReason === '' || isLoading}
            >
              {(isLoading && <Loader buttonLoader color="#ffffff" />) ||
                t('unsubscribe-popup.survey.unsubscribe', 'Unsubscribe')}
            </Button>
          </ButtonWrapperStyled>
        </>
      )}
      {currentStep === STEPS.CONFIRMATION && (
        <ContentStyled>
          <img src={checkmarkIcon} alt="checkmark icon" />
          <TitleStyled>
            {t('unsubscribe-popup.success.title', 'Miss you already.')}
          </TitleStyled>
          <TextStyled>
            {t(
              'unsubscribe-popup.success.description',
              'You have been successfully unsubscribed. Your current plan will expire on'
            )}{' '}
            <b>
              {expiresAt === INFINITE_DATE
                ? t(
                    'unsubscribe-popup.next-season-start',
                    'the next season start'
                  )
                : dateFormat(expiresAt)}
            </b>
            .
          </TextStyled>
          <Button
            width="auto"
            margin="30px auto 0 auto"
            onClickFn={() => {
              dispatch(hidePopup());
              dispatch(updateList());
            }}
          >
            {t('unsubscribe-popup.back-button', 'Back to My Account')}
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
  skipAvailableDowngradesStep: PropTypes.bool
};

Unsubscribe.defaultProps = {
  customCancellationReasons: null,
  skipAvailableDowngradesStep: false
};

export default Unsubscribe;
