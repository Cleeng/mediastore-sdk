import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import InnerPopupWrapper from 'components/InnerPopupWrapper';
import {
  selectSwitchDetails,
  selectSwitchSettings
} from 'appRedux/planDetailsSlice';
import { SwitchSetting } from 'appRedux/types';
import { useAppDispatch, useAppSelector } from 'appRedux/store';
import { selectOffers } from 'appRedux/offersSlice';
import { selectOfferData } from 'appRedux/popupSlice';
import { fetchUnsubscribe, selectUnsubscribe } from 'appRedux/unsubscribeSlice';
import { selectRetentionActions } from 'appRedux/retentionActionsSlice';
import eventDispatcher, {
  UNSUBSCRIBE_ACTION_CONFIRMED
} from 'util/eventDispatcher';
import {
  Pause,
  Downgrades,
  Survey,
  Confirmation,
  FreeExtension
} from 'components/UpdateSubscription/components';
import { Props } from './Unsubscribe.types';
import STEPS from './Unsubscribe.enum';
import { EXIT_SURVEY_HIDDEN_CANCELLATION_REASON } from './utils';

const INITIAL_STEPS_ARRAY = [STEPS.SURVEY, STEPS.CONFIRMATION];

const Unsubscribe = ({
  customCancellationReasons,
  skipAvailableDowngradesStep,
  skipCancellationSurveyStep,
  skipAvailableFreeExtensionStep
}: Props) => {
  const [downgradesList, setDowngradesList] = useState<Array<SwitchSetting>>(
    []
  );
  const [checkedReason, setCheckedReason] = useState('');
  const [isFreeExtensionSecondStep, setIsFreeExtensionSecondStep] =
    useState(false);

  const [steps, setSteps] = useState<STEPS[]>([]);
  const { pauseOffersIDs } = useAppSelector(selectOffers);
  const { data: switchSettings } = useAppSelector(selectSwitchSettings);
  const { data: switchDetails } = useAppSelector(selectSwitchDetails);
  const offerDetails = useAppSelector(selectOfferData);
  const { error: isError } = useAppSelector(selectUnsubscribe);

  const { retentionActions } = useAppSelector(selectRetentionActions);

  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const getDowngrades = () => {
    if (Object.keys(switchSettings).length && offerDetails) {
      const offerSwitchSettings = switchSettings[offerDetails?.offerId];
      return [...offerSwitchSettings.available]
        .filter((offer) => offer.switchDirection === 'downgrade')
        .sort((aOffer, bOffer) => bOffer.price - aOffer.price);
    }
    return [];
  };

  const scheduledSwitch = () => {
    if (offerDetails?.pendingSwitchId) {
      return switchDetails[offerDetails.pendingSwitchId];
    }
    return false;
  };

  const downgrades = getDowngrades();

  const shouldShowDowngradeScreen = () => {
    if (skipAvailableDowngradesStep) return false;

    const scheduled = scheduledSwitch();
    if (
      scheduled &&
      scheduled.direction === 'downgrade' &&
      offerDetails?.pendingSwitchId
    )
      return false;

    const {
      downgradeDetails: { offers }
    } = retentionActions;

    if (!offerDetails?.inTrial && offers.length) {
      const downgradeOffersFiltered = offers.filter(
        ({ toOfferId }) => !pauseOffersIDs.includes(toOfferId)
      );
      return !!downgradeOffersFiltered.length;
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

  const shouldShowFreeExtension =
    retentionActions?.type === 'FREE_EXTENSION' &&
    !skipAvailableFreeExtensionStep;

  const shouldShowDowngrades =
    retentionActions?.type === 'DOWNGRADE' && shouldShowDowngradeScreen();

  const shouldShowPause =
    retentionActions?.type === 'PAUSE' && shouldShowPauseScreen();

  const [currentStep, setCurrentStep] = useState<STEPS | null>(null);

  const pauseOffer = downgradesList?.filter(({ toOfferId }) =>
    pauseOffersIDs.includes(toOfferId)
  );

  const handleUnsubscribe = async () => {
    const cancellationReason = skipCancellationSurveyStep
      ? t(
          EXIT_SURVEY_HIDDEN_CANCELLATION_REASON.key,
          EXIT_SURVEY_HIDDEN_CANCELLATION_REASON.value
        )
      : checkedReason;

    eventDispatcher(UNSUBSCRIBE_ACTION_CONFIRMED, {
      detail: {
        offerId: offerDetails?.offerId,
        cancellationReason
      }
    });

    await dispatch(
      fetchUnsubscribe({
        offerId: offerDetails?.offerId,
        checkedReason: cancellationReason,
        isPauseActive
      })
    );

    setCurrentStep(STEPS.CONFIRMATION);
  };

  useEffect(() => {
    const initializeSteps = async () => {
      const tempArray = INITIAL_STEPS_ARRAY.slice();

      if (skipCancellationSurveyStep) {
        tempArray.shift();
        await handleUnsubscribe();
      }

      if (shouldShowDowngrades && !tempArray.includes(STEPS.DOWNGRADES)) {
        tempArray.unshift(STEPS.DOWNGRADES);
      }
      if (shouldShowPause && !tempArray.includes(STEPS.PAUSE)) {
        tempArray.unshift(STEPS.PAUSE);
      }

      if (
        shouldShowFreeExtension &&
        !tempArray.includes(STEPS.FREE_EXTENSION)
      ) {
        tempArray.unshift(STEPS.FREE_EXTENSION);
      }

      if (tempArray.length !== steps.length) {
        setSteps(tempArray);
      }
      if (!downgradesList.length) setDowngradesList(() => getDowngrades());
    };

    initializeSteps();
  }, []);

  useEffect(() => {
    setCurrentStep(steps[0]);
  }, [steps]);

  // Filter out the pause subscription
  const downgradesListFiltered = downgradesList?.filter(
    ({ toOfferId: offerId }) => !pauseOffersIDs.includes(offerId)
  );

  const isPauseActive = offerDetails?.offerId
    ? pauseOffersIDs.includes(offerDetails?.offerId)
    : false;

  if (!steps || !currentStep) return <></>;

  const goToNextStep = () =>
    setCurrentStep(steps[steps.indexOf(currentStep) + 1]);

  return (
    <InnerPopupWrapper
      steps={isFreeExtensionSecondStep ? 2 : steps.length}
      popupTitle={t('unsubscribe-popup.title', 'Manage your plan')}
      isError={Boolean(isError)}
      currentStep={
        isFreeExtensionSecondStep ? 2 : steps.indexOf(currentStep) + 1
      }
    >
      {currentStep === STEPS.FREE_EXTENSION && (
        <FreeExtension
          handleUnsubscribe={goToNextStep}
          setIsFreeExtensionSecondStep={setIsFreeExtensionSecondStep}
        />
      )}
      {currentStep === STEPS.PAUSE && (
        <Pause pauseOffer={pauseOffer[0]} handleClick={goToNextStep} />
      )}
      {currentStep === STEPS.DOWNGRADES && (
        <Downgrades
          downgradesListFiltered={downgradesListFiltered}
          handleClick={goToNextStep}
        />
      )}
      {currentStep === STEPS.SURVEY && (
        <Survey
          customCancellationReasons={customCancellationReasons}
          checkedReason={checkedReason}
          shouldShowDowngrades={shouldShowDowngrades}
          shouldShowFreeExtension={shouldShowFreeExtension}
          handleCheckboxClick={setCheckedReason}
          setCurrentStep={setCurrentStep}
          scheduledSwitch={scheduledSwitch}
          handleUnsubscribe={handleUnsubscribe}
        />
      )}
      {currentStep === STEPS.CONFIRMATION && <Confirmation />}
    </InnerPopupWrapper>
  );
};

export default Unsubscribe;
