import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import updateSubscription from 'api/Customer/updateSubscription';
import InnerPopupWrapper from 'components/InnerPopupWrapper';
import {
  selectSwitchDetails,
  selectSwitchSettings
} from 'redux/planDetailsSlice';
import { selectOfferData } from 'redux/popupSlice';
import { useAppSelector } from 'redux/store';
import { selectOffers } from 'redux/offersSlice';
import { SwitchSetting } from 'redux/types';
import {
  Pause,
  Downgrades,
  Survey,
  Confirmation,
  FreeExtension
} from 'components/UpdateSubscription/components';
import eventDispatcher, {
  UNSUBSCRIBE_ACTION_CONFIRMED
} from 'util/eventDispatcher';
import { Props } from './Unsubscribe.types';
import STEPS from './Unsubscribe.enum';
import { defaultCancellationReasons } from './utils';

const Unsubscribe = ({
  customCancellationReasons,
  skipAvailableDowngradesStep,
  retentionActions
}: Props) => {
  const INITIAL_STEPS_ARRAY = [STEPS.SURVEY, STEPS.CONFIRMATION];

  const [downgradesList, setDowngradesList] = useState<Array<SwitchSetting>>(
    []
  );
  const [checkedReason, setCheckedReason] = useState('');
  const [steps, setSteps] = useState<STEPS[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { pauseOffersIDs } = useAppSelector(selectOffers);
  const { data: switchSettings } = useAppSelector(selectSwitchSettings);
  const { data: switchDetails } = useAppSelector(selectSwitchDetails);
  const offerDetails = useAppSelector(selectOfferData);

  const { t } = useTranslation();

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

  const shouldShowFreeExtensionScreen = () => {
    if (retentionActions?.type === 'FREE_EXTENSION') {
      return true;
    }

    return false;
  };

  const shouldShowFreeExtension = shouldShowFreeExtensionScreen();

  const shouldShowDowngrades = shouldShowFreeExtension
    ? false
    : shouldShowDowngradeScreen();

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

  const cancellationReasonsToShow = customCancellationReasons?.length
    ? customCancellationReasons
    : defaultCancellationReasons;

  const unsubscribe = async () => {
    eventDispatcher(UNSUBSCRIBE_ACTION_CONFIRMED, {
      detail: {
        offerId: offerDetails?.offerId,
        cancellationReason: checkedReason
      }
    });
    try {
      setIsLoading(true);
      const isPauseActive = pauseOffersIDs.includes(offerDetails?.offerId);
      const response = await updateSubscription({
        offerId: offerDetails?.offerId,
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

  // Filter out the pause subscription
  const downgradesListFiltered = downgradesList?.filter(
    ({ toOfferId: offerId }) => !pauseOffersIDs.includes(offerId)
  );

  if (!steps || !currentStep) return <></>;

  const goToNextStep = () =>
    setCurrentStep(steps[steps.indexOf(currentStep) + 1]);

  return (
    <InnerPopupWrapper
      steps={steps.length}
      popupTitle={t('unsubscribe-popup.title', 'Manage your plan')}
      isError={isError}
      currentStep={steps.indexOf(currentStep) + 1}
    >
      {currentStep === STEPS.FREE_EXTENSION && (
        <FreeExtension handleUnsubscribe={goToNextStep} />
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
          cancellationReasonsToShow={cancellationReasonsToShow}
          checkedReason={checkedReason}
          shouldShowDowngrades={shouldShowDowngrades}
          isLoading={isLoading}
          unsubscribe={unsubscribe}
          handleCheckboxClick={setCheckedReason}
          handleButtonClick={setCurrentStep}
          scheduledSwitch={scheduledSwitch}
        />
      )}
      {currentStep === STEPS.CONFIRMATION && <Confirmation />}
    </InnerPopupWrapper>
  );
};

export default Unsubscribe;
