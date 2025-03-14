import { selectDeliveryDetails } from 'appRedux/deliveryDetailsSlice';
import { fetchUpdateOrder, selectOnlyOrder } from 'appRedux/orderSlice';
import { useAppDispatch, useAppSelector } from 'appRedux/store';
import { DeliveryDetailsInitialState } from 'appRedux/types';
import { validateDeliveryDetailsForm } from 'components/DeliveryDetails/RecipientForm/validators';
import { useEffect, useRef } from 'react';

export const useDeliveryDetails = () => {
  const dispatch = useAppDispatch();
  const order = useAppSelector(selectOnlyOrder);

  const { id: orderId, buyAsAGift } = order;

  const deliveryDetails = useAppSelector(selectDeliveryDetails);
  const deliveryDetailsRef = useRef<DeliveryDetailsInitialState | null>(null);
  const buyAsAGiftRef = useRef<boolean | null>(null);

  useEffect(() => {
    deliveryDetailsRef.current = deliveryDetails;
    buyAsAGiftRef.current = buyAsAGift;
  }, [deliveryDetails, buyAsAGift]);

  const handleDeliveryDetails = async () => {
    if (!deliveryDetailsRef.current) {
      return false;
    }

    const { isGift } = deliveryDetailsRef.current;

    if (isGift) {
      const areDeliveryDetailsValid = validateDeliveryDetailsForm();

      if (!areDeliveryDetailsValid) {
        return false;
      }

      const { recipientEmail, deliveryDate, deliveryTime, message } =
        deliveryDetailsRef.current;

      await dispatch(
        fetchUpdateOrder({
          id: orderId,
          payload: {
            buyAsAGift: true,
            deliveryDetails: {
              recipientEmail: recipientEmail.value,
              deliveryDate:
                new Date(
                  `${deliveryDate.value}T${deliveryTime.value}`
                ).valueOf() / 1000,
              personalNote: message.value
            }
          }
        })
      )
        .unwrap()
        .catch((err) => {
          throw new Error(err);
        });

      return true;
    }

    if (buyAsAGiftRef.current && !isGift) {
      await dispatch(
        fetchUpdateOrder({
          id: orderId,
          payload: {
            buyAsAGift: false
          }
        })
      )
        .unwrap()
        .catch((err) => {
          throw new Error(err);
        });

      return true;
    }

    return true;
  };

  return {
    handleDeliveryDetails
  };
};
