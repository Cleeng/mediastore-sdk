import { selectPendingSwitchesDetails } from 'appRedux/planDetailsSlice';
import { selectOfferData } from 'appRedux/popupSlice';
import { useAppDispatch, useAppSelector } from 'appRedux/store';
import { fetchUnsubscribe } from 'appRedux/unsubscribeSlice';
import { useState } from 'react';
import eventDispatcher, {
  UNSUBSCRIBE_ACTION_CONFIRMED
} from 'util/eventDispatcher';

const useUnsubscribe = (skipCancellationSurveyStep?: boolean) => {
  const [checkedReason, setCheckedReason] = useState('');

  const offerDetails = useAppSelector(selectOfferData);
  const { data: pendingSwitchesDetails } = useAppSelector(
    selectPendingSwitchesDetails
  );

  const dispatch = useAppDispatch();

  const handleUnsubscribe = async (handleSuccess: () => void) => {
    eventDispatcher(UNSUBSCRIBE_ACTION_CONFIRMED, {
      detail: {
        offerId: offerDetails?.offerId,
        cancellationReason: checkedReason
      }
    });

    await dispatch(
      fetchUnsubscribe({
        offerId: offerDetails?.offerId,
        ...(!skipCancellationSurveyStep && { checkedReason })
      })
    );

    handleSuccess();
  };

  const scheduledSwitch = offerDetails?.pendingSwitchId
    ? pendingSwitchesDetails[offerDetails.pendingSwitchId]
    : null;

  return {
    checkedReason,
    scheduledSwitch,
    handleUnsubscribe,
    setCheckedReason
  };
};

export default useUnsubscribe;
