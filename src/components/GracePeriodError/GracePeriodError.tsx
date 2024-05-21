import React, { useEffect } from 'react';
import { ReactComponent as AlertIcon } from 'assets/images/errors/alert.svg';
import { Trans } from 'react-i18next';
import { fetchCustomerOffers, selectCurrentPlan } from 'redux/planDetailsSlice';
import { useAppDispatch, useAppSelector } from 'redux/store';
import { selectDisplayGracePeriodError } from 'redux/publisherConfigSlice';
import {
  GracePeriodErrorStyled,
  WarningMessageStyled,
  IconStyled
} from './GracePeriodErrorStyled';

const GracePeriodError = () => {
  const dispatch = useAppDispatch();
  const { data: currentPlan } = useAppSelector(selectCurrentPlan);
  const displayGracePeriodError = useAppSelector(selectDisplayGracePeriodError);

  useEffect(() => {
    if (displayGracePeriodError && currentPlan.length === 0) {
      dispatch(fetchCustomerOffers());
    }
  }, [displayGracePeriodError]);

  const isPeriodError =
    displayGracePeriodError &&
    currentPlan?.some(
      ({ status, expiresAt }) =>
        status === 'active' && new Date(expiresAt * 1000) < new Date()
    );

  if (!isPeriodError) return null;

  return (
    <GracePeriodErrorStyled data-testid='grace-period-error'>
      <IconStyled>
        <AlertIcon data-testid='alert-svg' />
      </IconStyled>
      <p>
        <Trans i18nKey='grace-period-error'>
          Your subscription couldn&apos;t be renewed due to a payment method
          issue. Please <WarningMessageStyled>update it</WarningMessageStyled>{' '}
          to avoid losing access to the content.
        </Trans>
      </p>
    </GracePeriodErrorStyled>
  );
};

export default GracePeriodError;
