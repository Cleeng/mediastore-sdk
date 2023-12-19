import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import InnerPopupWrapper from 'components/InnerPopupWrapper';
import {
  selectSwitchDetails,
  selectSwitchSettings
} from 'redux/planDetailsSlice';
import { SwitchSetting } from 'redux/types';
import { useAppDispatch, useAppSelector } from 'redux/store';
import { selectOffers } from 'redux/offersSlice';
import { selectOfferData } from 'redux/popupSlice';
import { fetchUnsubscribe, selectUnsubscribe } from 'redux/unsubscribeSlice';
import { selectRetentionActions } from 'redux/retentionActionsSlice';
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

const Unsubscribe = ({
  customCancellationReasons,
  skipAvailableDowngradesStep,
  skipAvailableFreeExtensionStep
}: Props) => {
  const INITIAL_STEPS_ARRAY = [STEPS.SURVEY, STEPS.CONFIRMATION];

  const [downgradesList, setDowngradesList] = useState<Array<SwitchSetting>>(
    []
  );
  const [checkedReason, setCheckedReason] = useState('');
  const [isFreeExtensionSecondStep, setIsFreeExtensionSecondStep] = useState(
    false
  );

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
        .filter(offer => offer.switchDirection === 'downgrade')
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

    if (!offerDetails?.inTrial && downgrades.length) {
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

  const shouldShowFreeExtension =
    retentionActions?.type === 'FREE_EXTENSION' &&
    !skipAvailableFreeExtensionStep;

  const shouldShowDowngrades =
    !shouldShowFreeExtension && shouldShowDowngradeScreen();

  const shouldShowPause = shouldShowPauseScreen();

  const [currentStep, setCurrentStep] = useState<STEPS | null>(null);

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

    if (shouldShowFreeExtension && !tempArray.includes(STEPS.FREE_EXTENSION)) {
      tempArray.unshift(STEPS.FREE_EXTENSION);
    }

    if (tempArray.length !== steps.length) {
      setSteps(tempArray);
    }
    if (!downgradesList.length) setDowngradesList(() => getDowngrades());
  }, []);

  useEffect(() => {
    setCurrentStep(steps[0]);
  }, [steps]);

  // Filter out the pause subscription
  const downgradesListFiltered = downgradesList?.filter(
    ({ toOfferId: offerId }) => !pauseOffersIDs.includes(offerId)
  );

  const isPauseActive = pauseOffersIDs.includes(offerDetails?.offerId);

  if (!steps || !currentStep) return <></>;

  const goToNextStep = () =>
    setCurrentStep(steps[steps.indexOf(currentStep) + 1]);

  const handleUnsubscribe = async () => {
    eventDispatcher(UNSUBSCRIBE_ACTION_CONFIRMED, {
      detail: {
        offerId: offerDetails?.offerId,
        cancellationReason: checkedReason
      }
    });
    await dispatch(
      fetchUnsubscribe({
        offerId: offerDetails?.offerId,
        checkedReason,
        isPauseActive
      })
    );

    setCurrentStep(STEPS.CONFIRMATION);
  };

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
