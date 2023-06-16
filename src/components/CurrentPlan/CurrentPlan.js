/* eslint-disable no-nested-ternary */

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Trans, useTranslation } from "react-i18next";
import { getData } from "util/appConfigHelper";

import { ReactComponent as NoSubscriptionsIcon } from "assets/images/errors/sad_coupon.svg";
import { dateFormat, currencyFormat, INFINITE_DATE } from "util/planHelper";
import { setOfferToSwitch } from "redux/planDetailsSlice";

import MyAccountError from "components/MyAccountError";
import OfferCard from "components/OfferCard";
import SubscriptionManagement from "components/SubscriptionManagement";
import MessageBox from "components/MessageBox";

import {
  WrapStyled as ErrorWrapStyled,
  TitleStyled,
  SubTitleStyled,
  IconStyled
} from "components/MyAccountError/MyAccountErrorStyled";
import {
  WrapStyled,
  SubscriptionStyled,
  StatusMessageWrapStyled
} from "./CurrentPlanStyled";

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
          {t('currentplan.no-offers-title', 'No offers yet!')}
        </TitleStyled>
        <SubTitleStyled>
          {getData('CLEENG_OFFER_SELECTION_URL') ? (
            <Trans i18nKey="currentplan.no-offers-text-withlink">
              If you{' '}
              <a
                href={getData("CLEENG_OFFER_SELECTION_URL")}
                target="_blank"
                rel="noreferrer"
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

const supportedPaymentGateways = ["paypal", "card", "adyen"];

const CurrentPlan = () => {
  const [isMessageBoxOpened, setIsMessageBoxOpened] = useState(false);
  const [messageBoxType, setMessageBoxType] = useState(null);
  const [messageBoxText, setMessageBoxText] = useState("");
  const [messageSubscriptionId, setMessageSubscriptionId] = useState(null);
  const { t } = useTranslation();
  const { pauseOffersIDs } = useSelector(store => store.offers);
  const {
    data: subscriptions,
    loading: isLoading,
    error: errors
  } = useSelector(state => state.plan.currentPlan);
  const { offerToSwitch } = useSelector(state => state.plan);
  const dispatch = useDispatch();

  const getInfoBoxType = subscription => {
    if (subscription.offerType !== "S") return "";
    if (subscription.status === "active" && subscription.pendingSwitchId)
      return "SWITCH";
    if (supportedPaymentGateways.includes(subscription.paymentGateway))
      return "";
    return "INAPP_SUBSCRIPTION";
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
            case "S":
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
                  'currentplan.subscription.renews-info',
                  'Renews automatically on {{renewalDate}}',
                  {
                    renewalDate
                  }
                )}`;
              } else if (subItem.status === 'cancelled') {
                description = `${t(
                  'currentplan.subscription.expire-info',
                  'This plan will expire on {{renewalDate}}',
                  {
                    renewalDate
                  }
                )}`;
              } else {
                description = "";
              }

              break;
            case "P":
              price = subItem.totalPrice;
              currency = currencyFormat[subItem.customerCurrency];
              description = `${t(
                'currentplan.pass.expires-on',
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
                  subItem.offerType === "S" &&
                  subItem.status === "active"
                )
                  dispatch(setOfferToSwitch(subItem));
              }}
              cursorPointer={
                subscriptions.length > 1 &&
                subItem.status === "active" &&
                subItem.offerType === "S"
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
              {subItem.offerType === "S" &&
                supportedPaymentGateways.includes(subItem.paymentGateway) && (
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
