/* eslint-disable no-nested-ternary */

import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from 'appRedux/store';
import { setOfferToSwitch } from 'appRedux/planDetailsSlice';
import MyAccountError from 'components/MyAccountError';
import OfferMyAccountCard from 'components/OfferMyAccountCard';
import OfferMyAccountCardLoader from 'components/OfferMyAccountCard/OfferMyAccountCardLoader';
import SubscriptionManagement from 'components/SubscriptionManagement';
import MessageBox from 'components/MessageBox';
import EmptyPlanView from './EmptyPlanView';
import {
  WrapStyled,
  SubscriptionStyled,
  StatusMessageWrapStyled
} from './CurrentPlanStyled';
import { MessageBoxType } from './CurrentPlan.types';

export const SkeletonCard = () => {
  return (
    <SubscriptionStyled>
      <OfferMyAccountCardLoader />
    </SubscriptionStyled>
  );
};

const ErrorView = () => {
  return (
    <WrapStyled>
      <MyAccountError generalError />
    </WrapStyled>
  );
};

const CurrentPlan = () => {
  const [isMessageBoxOpened, setIsMessageBoxOpened] = useState(false);
  const [messageBoxType, setMessageBoxType] = useState<MessageBoxType | null>(
    null
  );
  const [messageBoxText, setMessageBoxText] = useState('');
  const [messageSubscriptionId, setMessageSubscriptionId] = useState<
    number | null
  >(null);

  const {
    data: subscriptions,
    loading: isLoading,
    error: errors
  } = useAppSelector((state) => state.plan.currentPlan);
  const { offerToSwitch } = useAppSelector((state) => state.plan);
  const dispatch = useAppDispatch();

  const showMessageBox = (
    type: MessageBoxType,
    text: string,
    subscriptionId: number
  ) => {
    setIsMessageBoxOpened(true);
    setMessageBoxType(type);
    setMessageBoxText(text);
    setMessageSubscriptionId(subscriptionId);
  };

  if (isLoading) return <SkeletonCard />;

  if (errors?.length) return <ErrorView />;

  if (subscriptions.length === 0) return <EmptyPlanView />;

  return (
    <WrapStyled>
      <>
        {subscriptions.map((subItem) => {
          const isClickable =
            subscriptions.length > 1 &&
            subItem.offerType === 'S' &&
            subItem.status === 'active';

          const isSelected =
            subscriptions.length > 1 &&
            offerToSwitch.offerId === subItem.offerId;

          return (
            <SubscriptionStyled
              as='article'
              key={subItem.offerId}
              onClick={() => {
                if (isClickable) {
                  dispatch(setOfferToSwitch(subItem));
                }
              }}
              $cursorPointer={isClickable}
              $isSelected={isSelected}
            >
              <OfferMyAccountCard offerId={subItem.offerId} />
              {isMessageBoxOpened &&
                messageSubscriptionId === subItem.subscriptionId && (
                  <StatusMessageWrapStyled>
                    <MessageBox
                      type={messageBoxType}
                      message={messageBoxText}
                    />
                  </StatusMessageWrapStyled>
                )}
              {subItem.offerType === 'S' && !subItem.isExternallyManaged && (
                <SubscriptionManagement
                  subscription={subItem}
                  showMessageBox={showMessageBox}
                />
              )}
            </SubscriptionStyled>
          );
        })}
      </>
    </WrapStyled>
  );
};

export default CurrentPlan;
