import userEvent from '@testing-library/user-event';
import { orderInitialState } from 'appRedux/orderSlice';
import { setupStore } from 'appRedux/rootReducer';
import renderWithProviders from 'util/testHelpers';
import CouponInput from 'components/CouponInput';
import {
  MESSAGE_TYPE_SUCCESS,
  MESSAGE_TYPE_FAIL
} from 'components/InputLegacy/InputConstants';
import * as Colors from 'styles/variables';

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

setupStore({
  order: orderInitialState
});

describe('CouponInput component', () => {
  test('render input with correct value', async () => {
    const { getByRole, getByTestId } = renderWithProviders(
      <CouponInput {...couponInputProps('coupon')} />
    );
    await userEvent.click(getByTestId('redeem-btn'));
    expect(getByRole('input')).toHaveValue('coupon');
  });

  test('show success message', async () => {
    const { getByText, getByTestId } = renderWithProviders(
      <CouponInput {...couponInputProps('', true, 'Success')} />
    );
    await userEvent.click(getByTestId('redeem-btn'));
    expect(getByText('Success')).toHaveStyle(`color: ${Colors.ConfirmColor}`);
  });

  test('show error message', async () => {
    const { getByText, getByTestId } = renderWithProviders(
      <CouponInput {...couponInputProps('', true, 'Error', messageFail)} />
    );
    await userEvent.click(getByTestId('redeem-btn'));
    expect(getByText('Error')).toHaveStyle(`color: ${Colors.ErrorColor}`);
  });

  test('check input with fullWidth props', async () => {
    const { getByTestId } = renderWithProviders(
      <CouponInput {...couponInputProps('', false, '', messageSuccess, true)} />
    );
    expect(getByTestId('inputcomponent')).toHaveStyle(`max-width: 300px;`);
    await userEvent.click(getByTestId('redeem-btn'));
    expect(getByTestId('inputcomponent')).toHaveStyle(`max-width: 100%`);
  });

  test('check input without fullWidth props', async () => {
    const { getByTestId } = renderWithProviders(
      <CouponInput
        {...couponInputProps('', false, '', messageSuccess, false)}
      />
    );
    await userEvent.click(getByTestId('redeem-btn'));
    expect(getByTestId('inputcomponent')).toHaveStyle(`max-width: 300px;`);
  });

  test('calls the onSubmit function after redeeming a coupon', async () => {
    const onSubmit = vi.fn();
    const { getByPlaceholderText, getByRole, getByTestId } =
      renderWithProviders(
        <CouponInput
          {...couponInputProps('', false, '', messageSuccess, false)}
          onSubmit={onSubmit}
        />
      );

    await userEvent.click(getByTestId('redeem-btn'));
    await userEvent.type(getByPlaceholderText('Your coupon'), 'couponCode');
    await userEvent.click(getByRole('button', { name: /Redeem/i }));

    expect(onSubmit).toHaveBeenCalled();
  });
});
