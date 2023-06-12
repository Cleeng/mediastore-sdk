/* eslint-disable no-nested-ternary */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Trans, useTranslation } from 'react-i18next';
import { getData } from 'util/appConfigHelper';

import { ReactComponent as NoSubscriptionsIcon } from 'assets/images/errors/sad_coupon.svg';
import { dateFormat, currencyFormat, INFINITE_DATE } from 'util/planHelper';

import MyAccountError from 'components/MyAccountError';
import OfferCard from 'components/OfferCard';
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
      <OfferCard isDataLoaded={false} />
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
          {t('currentplan.no-offers-yet', 'No offers yet!')}
        </TitleStyled>
        <SubTitleStyled>
          {getData('CLEENG_OFFER_SELECTION_URL') ? (
            <Trans i18nKey="currentplan.no-offers-withlink">
              If you{' '}
              <a
                href={getData('CLEENG_OFFER_SELECTION_URL')}
                target="_blank"
                rel="noreferrer"
              >
                choose your plan
              </a>
              , you will be able to manage your offers here.
            </Trans>
          ) : (
            t(
              'currentplan.manage-offers',
              'If you choose your plan, you will be able to manage your offers here.'
            )
          )}
        </SubTitleStyled>
      </ErrorWrapStyled>
    </WrapStyled>
  );
};

const supportedPaymentGateways = ['paypal', 'card', 'adyen'];

const CurrentPlan = ({
  subscriptions,
  isLoading,
  errors,
  showInnerPopup,
  setOfferToSwitch,
  offerToSwitch,
  updateList
}) => {
  const [isMessageBoxOpened, setIsMessageBoxOpened] = useState(false);
  const [messageBoxType, setMessageBoxType] = useState(null);
  const [messageBoxText, setMessageBoxText] = useState('');
  const [messageSubscriptionId, setMessageSubscriptionId] = useState(null);
  const { t } = useTranslation();
  const { pauseOffersIDs } = useSelector(store => store.offers);

  const getInfoBoxType = subscription => {
    if (subscription.offerType !== 'S') return '';
    if (subscription.status === 'active' && subscription.pendingSwitchId)
      return 'SWITCH';
    if (supportedPaymentGateways.includes(subscription.paymentGateway))
      return '';
    return 'INAPP_SUBSCRIPTION';
  };

  const showMessageBox = (type, text, subscriptionId) => {
    setIsMessageBoxOpened(true);
    setMessageBoxType(type);
    setMessageBoxText(text);
    setMessageSubscriptionId(subscriptionId);
  };

  if (isLoading) return <SkeletonCard />;

  if (errors.length !== 0) return <ErrorView />;

  if (subscriptions.length === 0) return <EmptyPlanView />;

  return (
    <WrapStyled>
      <>
        {subscriptions.map(subItem => {
          const isPaused = pauseOffersIDs.includes(subItem.offerId);
          let description;
          let price;
          let currency;
          let renewalDate;

          switch (subItem.offerType) {
            case 'S':
              price = subItem.nextPaymentPrice;
              currency = currencyFormat[subItem.nextPaymentCurrency];
              renewalDate = dateFormat(subItem.expiresAt);
              if (subItem.expiresAt === INFINITE_DATE)
                renewalDate = t(
                  'currentplan.next-season-start',
                  'the next season start'
                );
              if (subItem.status === 'active' && !subItem.pendingSwitchId) {
                description = `${t(
                  'currentplan.renews-info',
                  'Renews automatically on {{renewalDate}}',
                  {
                    renewalDate
                  }
                )}`;
              } else if (subItem.status === 'cancelled') {
                description = `${t(
                  'currentplan.expire-info',
                  'This plan will expire on {{renewalDate}}',
                  {
                    renewalDate
                  }
                )}`;
              } else {
                description = '';
              }

              break;
            case 'P':
              price = subItem.totalPrice;
              currency = currencyFormat[subItem.customerCurrency];
              description = `${t(
                'currentplan.expires-on',
                'Expires on'
              )} ${dateFormat(subItem.expiresAt)}`;

              break;
            default:
              break;
          }

          return (
            <SubscriptionStyled
              key={subItem.offerId}
              onClick={() => {
                if (
                  subscriptions.length > 1 &&
                  subItem.offerType === 'S' &&
                  subItem.status === 'active'
                )
                  setOfferToSwitch(subItem);
              }}
              cursorPointer={
                subscriptions.length > 1 &&
                subItem.status === 'active' &&
                subItem.offerType === 'S'
              }
              isSelected={
                subscriptions.length > 1 &&
                offerToSwitch.offerId === subItem.offerId
              }
            >
              <OfferCard
                period={subItem.period}
                offerType={subItem.offerType}
                title={subItem.offerTitle}
                description={description}
                currency={currency}
                price={price}
                isMyAccount
                showInfoBox={getInfoBoxType(subItem)}
                paymentMethod={subItem.paymentMethod}
                pendingSwitchId={subItem.pendingSwitchId}
                expiresAt={subItem.expiresAt}
                showInnerPopup={showInnerPopup}
                offerId={subItem.offerId}
                isPriceBoxHidden={isPaused}
                isPaused={isPaused}
              />
              {isMessageBoxOpened &&
                messageSubscriptionId === subItem.subscriptionId && (
                  <StatusMessageWrapStyled>
                    <MessageBox
                      type={messageBoxType}
                      message={messageBoxText}
                    />
                  </StatusMessageWrapStyled>
                )}
              {subItem.offerType === 'S' &&
                supportedPaymentGateways.includes(subItem.paymentGateway) && (
                  <SubscriptionManagement
                    subscription={subItem}
                    showInnerPopup={showInnerPopup}
                    updateList={updateList}
                    showMessageBox={showMessageBox}
                    setOfferToSwitch={setOfferToSwitch}
                  />
                )}
            </SubscriptionStyled>
          );
        })}
      </>
    </WrapStyled>
  );
};

CurrentPlan.propTypes = {
  subscriptions: PropTypes.arrayOf(
    PropTypes.shape({
      subscriptionId: PropTypes.number,
      offerId: PropTypes.string,
      status: PropTypes.string,
      startedAt: PropTypes.number,
      expiresAt: PropTypes.number,
      nextPaymentPrice: PropTypes.number,
      nextPaymentCurrency: PropTypes.string,
      nextPaymentAt: PropTypes.number,
      paymentGateway: PropTypes.string,
      paymentMethod: PropTypes.string,
      externalPaymentId: PropTypes.string,
      inTrial: PropTypes.bool,
      offerTitle: PropTypes.string,
      period: PropTypes.string,
      totalPrice: PropTypes.number
    })
  ),
  isLoading: PropTypes.bool,
  errors: PropTypes.arrayOf(PropTypes.string),
  showInnerPopup: PropTypes.func.isRequired,
  setOfferToSwitch: PropTypes.func.isRequired,
  offerToSwitch: PropTypes.shape({
    subscriptionId: PropTypes.number,
    offerId: PropTypes.string,
    status: PropTypes.string,
    startedAt: PropTypes.number,
    expiresAt: PropTypes.number,
    nextPaymentPrice: PropTypes.number,
    nextPaymentCurrency: PropTypes.string,
    nextPaymentAt: PropTypes.number,
    paymentGateway: PropTypes.string,
    paymentMethod: PropTypes.string,
    externalPaymentId: PropTypes.string,
    inTrial: PropTypes.bool,
    offerTitle: PropTypes.string,
    period: PropTypes.string,
    totalPrice: PropTypes.number
  }),
  updateList: PropTypes.func.isRequired,
  switchDetails: PropTypes.shape({
    [PropTypes.string]: PropTypes.shape({
      id: PropTypes.string,
      customerId: PropTypes.number,
      direction: PropTypes.string,
      algorithm: PropTypes.string,
      fromOfferId: PropTypes.string,
      toOfferId: PropTypes.string,
      subscriptionId: PropTypes.string,
      status: PropTypes.string,
      createdAt: PropTypes.number,
      updatedAt: PropTypes.number
    })
  })
};

CurrentPlan.defaultProps = {
  subscriptions: [],
  isLoading: false,
  errors: [],
  offerToSwitch: {},
  switchDetails: {}
};

export default CurrentPlan;
