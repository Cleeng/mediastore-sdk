import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
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
  Confirmation
} from 'components/UpdateSubscription/components';
import { selectUnsubscribe } from 'redux/unsubscribeSlice';
import { Props } from './Unsubscribe.types';
import STEPS from './Unsubscribe.enum';

const Unsubscribe = ({
  customCancellationReasons,
  skipAvailableDowngradesStep
}: Props) => {
  const INITIAL_STEPS_ARRAY = [STEPS.SURVEY, STEPS.CONFIRMATION];

  const [downgradesList, setDowngradesList] = useState<Array<SwitchSetting>>(
    []
  );
  const [checkedReason, setCheckedReason] = useState('');
  const [steps, setSteps] = useState<STEPS[]>([]);
  const { pauseOffersIDs } = useAppSelector(selectOffers);
  const { data: switchSettings } = useAppSelector(selectSwitchSettings);
  const { data: switchDetails } = useAppSelector(selectSwitchDetails);
  const offerDetails = useAppSelector(selectOfferData);
  const { error: isError } = useAppSelector(selectUnsubscribe);

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

  const shouldShowDowngrades = shouldShowDowngradeScreen();
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

  if (!steps || !currentStep) return <></>;

  return (
    <InnerPopupWrapper
      steps={steps.length}
      popupTitle={t('unsubscribe-popup.title', 'Manage your plan')}
      isError={Boolean(isError)}
      currentStep={steps.indexOf(currentStep) + 1}
    >
      {currentStep === STEPS.PAUSE && (
        <Pause
          pauseOffer={pauseOffer[0]}
          handleClick={() =>
            setCurrentStep(steps[steps.indexOf(currentStep) + 1])
          }
        />
      )}
      {currentStep === STEPS.DOWNGRADES && (
        <Downgrades
          downgradesListFiltered={downgradesListFiltered}
          handleClick={() => setCurrentStep(STEPS.SURVEY)}
        />
      )}
      {currentStep === STEPS.SURVEY && (
        <Survey
          customCancellationReasons={customCancellationReasons}
          checkedReason={checkedReason}
          shouldShowDowngrades={shouldShowDowngrades}
          handleCheckboxClick={setCheckedReason}
          handleButtonClick={() => setCurrentStep(STEPS.DOWNGRADES)}
          scheduledSwitch={scheduledSwitch}
        />
      )}
      {currentStep === STEPS.CONFIRMATION && <Confirmation />}
    </InnerPopupWrapper>
  );
};

export default Unsubscribe;
