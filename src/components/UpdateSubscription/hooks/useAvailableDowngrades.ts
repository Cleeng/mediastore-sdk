import { useAppSelector } from 'appRedux/store';
import {
  selectSwitchSettings,
  selectPendingSwitchesDetails
} from 'appRedux/planDetailsSlice';
import { SwitchSetting } from 'appRedux/types';

const useAvailableDowngrades = (offerId: string): SwitchSetting[] => {
  const allSwitchSettings = useAppSelector(selectSwitchSettings)?.data || {};
  const pendingSwitches =
    useAppSelector(selectPendingSwitchesDetails)?.data || {};

  const toOfferIdsWithPendingSwitch: string[] = Object.values(pendingSwitches)
    .filter(({ fromOfferId }) => fromOfferId === offerId)
    .map(({ toOfferId }) => toOfferId);

  return (
    allSwitchSettings[offerId]?.available?.filter(
      ({ switchDirection, toOfferId }) =>
        switchDirection === 'downgrade' &&
        !toOfferIdsWithPendingSwitch.includes(toOfferId)
    ) || []
  );
};

export default useAvailableDowngrades;
