import React from 'react';
import { ReactComponent as AlertIcon } from 'assets/images/errors/alert.svg';
import {
  GracePeriodErrorStyled,
  WarningMessageStyled,
  IconStyled,
  GracePeriodWrapperStyled
} from './GracePeriodErrorStyled';

const GracePeriodError = () => (
  <GracePeriodWrapperStyled data-testid="grace-period-error">
    <GracePeriodErrorStyled>
      <IconStyled>
        <AlertIcon data-testid="alert-svg" />
      </IconStyled>
      <p>
        Your payment method has expired. Please{' '}
        <WarningMessageStyled>make sure to update</WarningMessageStyled> it to
        avoid losing access to your NFL+ subscription.
      </p>
    </GracePeriodErrorStyled>
  </GracePeriodWrapperStyled>
);

export default GracePeriodError;
