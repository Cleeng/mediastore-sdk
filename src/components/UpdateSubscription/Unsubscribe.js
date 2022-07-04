/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withTranslation, Trans } from 'react-i18next';
import labeling from 'containers/labeling';

import updateSubscription from 'api/Customer/updateSubscription';
import { dateFormat } from 'util/planHelper';
import checkmarkIcon from 'assets/images/checkmarkBase';

import Button from 'components/Button';
import Checkbox from 'components/Checkbox';
import InnerPopupWrapper from 'components/InnerPopupWrapper';
import Loader from 'components/Loader';

import {
  ContentStyled,
  TitleStyled,
  TextStyled,
  ButtonWrapperStyled
} from 'components/InnerPopupWrapper/InnerPopupWrapperStyled';
import { ReasonsWrapper, StyledItem } from './UpdateSubscriptionStyled';

const Unsubscribe = ({
  offerDetails,
  hideInnerPopup,
  updateList,
  customCancellationReasons,
  t
}) => {
  const [checkedReason, setCheckedReason] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const defaultCancellationReasons = [
    { value: 'Poor customer support', key: 'support' },
    { value: 'Switch to a different service', key: 'service' },
    { value: 'Subscription is too expensive', key: 'expensive' },
    { value: 'Video streaming issues', key: 'issues' },
    { value: 'Not enough interesting content', key: 'content' },
    { value: 'Service is hard to use', key: 'hardUse' },
    { value: 'Content I like has ended', key: 'end' }
  ];

  const calcellationReasonsToShow =
    customCancellationReasons || defaultCancellationReasons;

  const unsubscribe = async () => {
    window.dispatchEvent(
      new CustomEvent('MSSDK:unsubscribe-action-confirmed', {
        detail: {
          offerId: offerDetails.offerId
        }
      })
    );
    try {
      setIsLoading(true);
      const response = await updateSubscription({
        offerId: offerDetails.offerId,
        status: 'cancelled',
        cancellationReason: checkedReason
      });
      if (response.errors.length) {
        setIsError(true);
        setIsLoading(false);
      } else {
        setCurrentStep(2);
        setIsLoading(false);
      }
    } catch {
      setIsError(true);
      setIsLoading(false);
    }
  };

  const { offerTitle, expiresAt } = offerDetails;
  const formattedExpiresAt = dateFormat(expiresAt);

  return (
    <InnerPopupWrapper
      steps={2}
      popupTitle={t('Manage your plan')}
      isError={isError}
      currentStep={currentStep}
    >
      {currentStep === 1 ? (
        <>
          <ContentStyled>
            <TitleStyled>{t('We’re sorry to see you go')}</TitleStyled>
            <TextStyled>
              <Trans>
                Your <strong>{{ offerTitle }}</strong>
              </Trans>{' '}
              {offerDetails.inTrial
                ? t('free trial will end on ')
                : t('subscription is paid until ')}
              <Trans>
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                <strong>{{formattedExpiresAt}}</strong>. If you would like to proceed with cancelling your subscription, please select 'Unsubscribe' below, and your subscription will be cancelled as of <strong>{{formattedExpiresAt}}</strong>. Until then, you will continue to have access to all of your current subscription features. Before you go, please let us know why you're leaving.
              </Trans>
            </TextStyled>
            {calcellationReasonsToShow && (
              <ReasonsWrapper>
                {calcellationReasonsToShow.map(reason => (
                  <StyledItem key={reason.key}>
                    <Checkbox
                      isRadioButton
                      onClickFn={() => setCheckedReason(reason.value)}
                      checked={reason.value === checkedReason}
                    >
                      {t(reason.value)}
                    </Checkbox>
                  </StyledItem>
                ))}
              </ReasonsWrapper>
            )}
          </ContentStyled>
          <ButtonWrapperStyled removeMargin>
            <Button theme="simple" onClickFn={hideInnerPopup}>
              {t('No, thanks')}
            </Button>
            <Button
              theme="confirm"
              onClickFn={unsubscribe}
              disabled={checkedReason === '' || isLoading}
            >
              {(isLoading && <Loader buttonLoader color="#ffffff" />) ||
                t('Unsubscribe')}
            </Button>
          </ButtonWrapperStyled>
        </>
      ) : (
        <ContentStyled>
          <img src={checkmarkIcon} alt="checkmark icon" />
          <TitleStyled>{t('Miss you already.')}</TitleStyled>
          <TextStyled>
            {t(
              'You have been successfully unsubscribed. Your current plan will expire on'
            )}{' '}
            <b>{dateFormat(offerDetails.expiresAt)}</b>.
          </TextStyled>
          <Button
            width="auto"
            margin="30px auto 0 auto"
            onClickFn={() => {
              hideInnerPopup();
              updateList();
            }}
          >
            {t('Back to settings')}
          </Button>
        </ContentStyled>
      )}
    </InnerPopupWrapper>
  );
};

Unsubscribe.propTypes = {
  hideInnerPopup: PropTypes.func.isRequired,
  updateList: PropTypes.func.isRequired,
  offerDetails: PropTypes.objectOf(PropTypes.any).isRequired,
  customCancellationReasons: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    })
  ),
  t: PropTypes.func
};

Unsubscribe.defaultProps = {
  customCancellationReasons: null,
  t: k => k
};

export default withTranslation()(labeling()(Unsubscribe));
