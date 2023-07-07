import { render, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import CouponInput from 'components/CouponInput';
import {
  MESSAGE_TYPE_SUCCESS,
  MESSAGE_TYPE_FAIL
} from 'components/Input/InputConstants';
import userEvent from '@testing-library/user-event';
import * as Colors from 'styles/variables';
import { MessageType } from './CouponInput.types';

const messageSuccess = MESSAGE_TYPE_SUCCESS as MessageType;
const messageFail = MESSAGE_TYPE_FAIL as MessageType;

const couponInputProps = (
  value = '',
  showMessage = true,
  message = '',
  messageType = messageSuccess,
  fullWidth = false
) => {
  return {
    value,
    fullWidth,
    couponDetails: {
      showMessage,
      message,
      messageType
    },
    onSubmit: (k: string) => k,
    onChange: (k: string) => k,
    couponLoading: false,
    source: '' as const
  };
};

describe('CouponInput component', () => {
  test('render input with correct value', async () => {
    render(<CouponInput {...couponInputProps('coupon')} />);
    expect(screen.getByRole('input')).toHaveValue('coupon');
  });

  test('show success message', async () => {
    render(<CouponInput {...couponInputProps('', true, 'Success')} />);
    await userEvent.click(screen.getByTestId('redeem-btn'));
    expect(screen.getByText('Success')).toHaveStyle(
      `color: ${Colors.ConfirmColor}`
    );
  });

  test('show error message', async () => {
    render(
      <CouponInput {...couponInputProps('', true, 'Error', messageFail)} />
    );
    await userEvent.click(screen.getByTestId('redeem-btn'));
    expect(screen.getByText('Error')).toHaveStyle(
      `color: ${Colors.ErrorColor}`
    );
  });

  test('check input with fullWidth props', async () => {
    render(
      <CouponInput {...couponInputProps('', false, '', messageSuccess, true)} />
    );
    expect(screen.getByTestId('inputcomponent')).toHaveStyle(
      `max-width: 300px;`
    );
    await userEvent.click(screen.getByTestId('redeem-btn'));
    expect(screen.getByTestId('inputcomponent')).toHaveStyle(`max-width: 100%`);
  });

  test('check input without fullWidth props', async () => {
    render(
      <CouponInput
        {...couponInputProps('', false, '', messageSuccess, false)}
      />
    );
    await userEvent.click(screen.getByTestId('redeem-btn'));
    expect(screen.getByTestId('inputcomponent')).toHaveStyle(
      `max-width: 300px;`
    );
  });
});
