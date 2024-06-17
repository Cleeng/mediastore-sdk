/* eslint-disable no-nested-ternary */

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Trans, useTranslation } from 'react-i18next';
import { getData } from 'util/appConfigHelper';

import NoSubscriptionsIcon from 'assets/images/errors/sad_coupon.svg';
import { setOfferToSwitch } from 'appRedux/planDetailsSlice';

import MyAccountError from 'components/MyAccountError';
import OfferMyAccountCard from 'components/OfferMyAccountCard';
import OfferMyAccountCardLoader from 'components/OfferMyAccountCard/OfferMyAccountCardLoader';
import SubscriptionManagement from 'components/SubscriptionManagement';
import MessageBox from 'components/MessageBox';

import {
  WrapStyled as ErrorWrapStyled,
  TitleStyled,
  SubTitleStyled,
  IconStyled
} from 'components/MyAccountError/MyAccountErrorStyled';
import {
  WrapStyled,
  SubscriptionStyled,
  StatusMessageWrapStyled
} from './CurrentPlanStyled';

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

const EmptyPlanView = () => {
  const { t } = useTranslation();

  return (
    <WrapStyled>
      <ErrorWrapStyled>
        <IconStyled>
          <NoSubscriptionsIcon />
        </IconStyled>
        <TitleStyled>
          {t('currentplan.no-offers-title', 'No offers yet!')}
        </TitleStyled>
        <SubTitleStyled>
          {getData('CLEENG_OFFER_SELECTION_URL') ? (
            <Trans i18nKey='currentplan.no-offers-text-withlink'>
              If you{' '}
              <a
                href={getData('CLEENG_OFFER_SELECTION_URL')}
                target='_blank'
                rel='noreferrer'
              >
                choose your plan
              </a>
              , you will be able to manage your offers here.
            </Trans>
          ) : (
            t(
              'currentplan.no-offers-text',
              'If you choose your plan, you will be able to manage your offers here.'
            )
          )}
        </SubTitleStyled>
      </ErrorWrapStyled>
    </WrapStyled>
  );
};

const CurrentPlan = () => {
  const [isMessageBoxOpened, setIsMessageBoxOpened] = useState(false);
  const [messageBoxType, setMessageBoxType] = useState(null);
  const [messageBoxText, setMessageBoxText] = useState('');
  const [messageSubscriptionId, setMessageSubscriptionId] = useState(null);
  const {
    data: subscriptions,
    loading: isLoading,
    error: errors
  } = useSelector((state) => state.plan.currentPlan);
  const { offerToSwitch } = useSelector((state) => state.plan);
  const dispatch = useDispatch();

  const showMessageBox = (type, text, subscriptionId) => {
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
          return (
            <SubscriptionStyled
              as='article'
              key={subItem.offerId}
              onClick={() => {
                if (
                  subscriptions.length > 1 &&
                  subItem.offerType === 'S' &&
                  subItem.status === 'active'
                )
                  dispatch(setOfferToSwitch(subItem));
              }}
              $cursorPointer={
                subscriptions.length > 1 &&
                subItem.status === 'active' &&
                subItem.offerType === 'S'
              }
              $isSelected={
                subscriptions.length > 1 &&
                offerToSwitch.offerId === subItem.offerId
              }
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
