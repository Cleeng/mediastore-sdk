import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import * as Colors from 'styles/variables';
import CouponInput from 'components/CouponInput';
import {
  MESSAGE_TYPE_SUCCESS,
  MESSAGE_TYPE_FAIL
} from 'components/InputLegacy/InputConstants';
import userEvent from '@testing-library/user-event';
import { orderInitialState } from 'redux/orderSlice';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { CouponInputProps, MessageType } from './CouponInput.types';

const messageSuccess = MESSAGE_TYPE_SUCCESS as MessageType;
const messageFail = MESSAGE_TYPE_FAIL as MessageType;

const couponInputProps = (
  value = '',
  showMessage = true,
  message = '',
  messageType = messageSuccess,
  fullWidth = false
): CouponInputProps => {
  return {
    value,
    fullWidth,
    couponDetails: {
      showMessage,
      message,
      messageType,
      couponCode: '',
      translationKey: ''
    },
    onSubmit: (k: string) => k,
    onChange: (k: string) => k,
    couponLoading: false,
    source: '' as const
  };
};

const middleware = [thunk];
const mockStore = configureStore(middleware);

describe('CouponInput component', () => {
  test('render input with correct value', async () => {
    render(
      <Provider store={mockStore(orderInitialState)}>
        <CouponInput {...couponInputProps('coupon')} />
      </Provider>
    );
    await userEvent.click(screen.getByTestId('redeem-btn'));
    expect(screen.getByRole('input')).toHaveValue('coupon');
  });

  test('show success message', async () => {
    render(
      <Provider store={mockStore(orderInitialState)}>
        <CouponInput {...couponInputProps('', true, 'Success')} />
      </Provider>
    );
    await userEvent.click(screen.getByTestId('redeem-btn'));
    expect(screen.getByText('Success')).toHaveStyle(
      `color: ${Colors.ConfirmColor}`
    );
  });

  test('show error message', async () => {
    render(
      <Provider store={mockStore(orderInitialState)}>
        <CouponInput {...couponInputProps('', true, 'Error', messageFail)} />
      </Provider>
    );
    await userEvent.click(screen.getByTestId('redeem-btn'));
    expect(screen.getByText('Error')).toHaveStyle(
      `color: ${Colors.ErrorColor}`
    );
  });

  test('check input with fullWidth props', async () => {
    render(
      <Provider store={mockStore(orderInitialState)}>
        <CouponInput
          {...couponInputProps('', false, '', messageSuccess, true)}
        />
      </Provider>
    );
    expect(screen.getByTestId('inputcomponent')).toHaveStyle(
      `max-width: 300px;`
    );
    await userEvent.click(screen.getByTestId('redeem-btn'));
    expect(screen.getByTestId('inputcomponent')).toHaveStyle(`max-width: 100%`);
  });

  test('check input without fullWidth props', async () => {
    render(
      <Provider store={mockStore(orderInitialState)}>
        <CouponInput
          {...couponInputProps('', false, '', messageSuccess, false)}
        />
      </Provider>
    );
    await userEvent.click(screen.getByTestId('redeem-btn'));
    expect(screen.getByTestId('inputcomponent')).toHaveStyle(
      `max-width: 300px;`
    );
  });

  test('calls the onSubmit function after redeeming a coupon', async () => {
    const onSubmit = jest.fn();
    render(
      <Provider store={mockStore(orderInitialState)}>
        <CouponInput
          {...couponInputProps('', false, '', messageSuccess, false)}
          onSubmit={onSubmit}
        />
      </Provider>
    );

    await userEvent.click(
      screen.getByRole('button', { name: /Redeem coupon/i })
    );
    await userEvent.type(
      screen.getByPlaceholderText('Your coupon'),
      'couponCode'
    );
    await userEvent.click(screen.getByRole('button', { name: /Redeem/i }));

    expect(onSubmit).toHaveBeenCalled();
  });
});
