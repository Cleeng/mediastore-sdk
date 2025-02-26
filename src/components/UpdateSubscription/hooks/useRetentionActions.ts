import { selectOffers } from 'appRedux/offersSlice';
import { selectSwitchSettings } from 'appRedux/planDetailsSlice';
import { selectOfferData } from 'appRedux/popupSlice';
import { selectRetentionActions } from 'appRedux/retentionActionsSlice';
import { useAppSelector } from 'appRedux/store';
import { RetentionActions, SwitchDetail } from 'appRedux/types';
import { SubscriptionOffer } from 'appRedux/types/popupSlice.types';

type UsePauseActionsArguments = {
  scheduledSwitch: SwitchDetail | null;
  skipAvailableFreeExtensionStep?: boolean;
  skipAvailableDowngradesStep?: boolean;
};

type GetShouldShowDowngradeScreen = {
  offerDetails: SubscriptionOffer | undefined;
  pauseOffersIDs: string[];
  retentionActions: RetentionActions;
  skipAvailableDowngradesStep?: boolean;
  scheduledSwitch: SwitchDetail | null;
};

const getShouldShowDowngradeScreen = ({
  offerDetails,
  pauseOffersIDs,
  retentionActions,
  scheduledSwitch,
  skipAvailableDowngradesStep
}: GetShouldShowDowngradeScreen) => {
  if (skipAvailableDowngradesStep) return false;

  if (
    scheduledSwitch &&
    scheduledSwitch.direction === 'downgrade' &&
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

const useRetentionActions = ({
  scheduledSwitch,
  skipAvailableFreeExtensionStep,
  skipAvailableDowngradesStep
}: UsePauseActionsArguments) => {
  const { retentionActions } = useAppSelector(selectRetentionActions);
  const offerDetails = useAppSelector(selectOfferData);
  const { pauseOffersIDs } = useAppSelector(selectOffers);
  const { data: switchSettings } = useAppSelector(selectSwitchSettings);

  const downgrades =
    Object.keys(switchSettings).length && offerDetails
      ? [...switchSettings[offerDetails?.offerId].available]
          .filter((offer) => offer.switchDirection === 'downgrade')
          .sort((aOffer, bOffer) => bOffer.price - aOffer.price)
      : [];
  const downgradesWithoutPause = downgrades?.filter(
    ({ toOfferId: offerId }) => !pauseOffersIDs.includes(offerId)
  );

  const shouldShowFreeExtension =
    retentionActions?.type === 'FREE_EXTENSION' &&
    !skipAvailableFreeExtensionStep;

  const shouldShowDowngrades =
    retentionActions?.type === 'DOWNGRADE' &&
    getShouldShowDowngradeScreen({
      offerDetails,
      pauseOffersIDs,
      retentionActions,
      scheduledSwitch,
      skipAvailableDowngradesStep
    });

  const pauseOffer = downgrades.find(({ toOfferId }) =>
    pauseOffersIDs.includes(toOfferId)
  );
  const pauseOfferDowngradeExists =
    downgrades.findIndex(({ toOfferId }) =>
      pauseOffersIDs.includes(toOfferId)
    ) > -1;

  const isPauseActive = offerDetails?.offerId
    ? pauseOffersIDs.includes(offerDetails?.offerId)
    : false;

  const shouldShowPauseScreen =
    retentionActions?.type === 'PAUSE' && pauseOfferDowngradeExists;

  return {
    downgradesWithoutPause,
    isPauseActive,
    pauseOffer,
    shouldShowDowngrades,
    shouldShowFreeExtension,
    shouldShowPauseScreen
  };
};

export default useRetentionActions;
