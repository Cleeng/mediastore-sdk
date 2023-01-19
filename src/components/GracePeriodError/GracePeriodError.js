import React, { useEffect } from 'react';
import { ReactComponent as AlertIcon } from 'assets/images/errors/alert.svg';
import { Trans } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCustomerOffers } from 'redux/planDetailsSlice';
import {
  GracePeriodErrorStyled,
  WarningMessageStyled,
  IconStyled
} from './GracePeriodErrorStyled';

const GracePeriodError = () => {
  const dispatch = useDispatch();
  const currentPlan = useSelector(state => state.plan.currentPlan);
  const displayGracePeriodError = useSelector(
    state => state.publisherConfig.displayGracePeriodError
  );

  useEffect(() => {
    if (displayGracePeriodError && !currentPlan) {
      dispatch(fetchCustomerOffers());
    }
  }, [displayGracePeriodError]);

  const isPeriodError =
    displayGracePeriodError &&
    currentPlan?.some(
      ({ status, expiresAt }) =>
        status === 'active' && new Date(expiresAt) < new Date()
    );

  if (!isPeriodError) return null;

  return (
    <GracePeriodErrorStyled data-testid="grace-period-error">
      <IconStyled>
        <AlertIcon data-testid="alert-svg" />
      </IconStyled>
      <p>
        <Trans i18nKey="grace-period-error">
          Your payment method has expired. Please{' '}
          <WarningMessageStyled>make sure to update</WarningMessageStyled> it to
          avoid losing access to your subscription.
        </Trans>
      </p>
    </GracePeriodErrorStyled>
  );
};

export default GracePeriodError;
