import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CouponInput from 'components/CouponInput';
import { MessageType } from './CouponInput.types';

const couponInputProps = (value: string) => {
  return {
    value,
    fullWidth: false,
    couponDetails: {
      showMessage: false,
      message: '',
      messageType: 'success' as MessageType
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
});
