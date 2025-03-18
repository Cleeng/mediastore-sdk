import { useAppSelector } from 'appRedux/store';
import { selectSwitchSettings } from 'appRedux/planDetailsSlice';

const useAvailableDowngrades = (offerId: string) => {
  const allSwitchSettings = useAppSelector(selectSwitchSettings)?.data;

  return offerId
    ? allSwitchSettings[offerId]?.available?.filter(
        ({ switchDirection }) => switchDirection === 'downgrade'
      ) || []
    : [];
};

export default useAvailableDowngrades;
