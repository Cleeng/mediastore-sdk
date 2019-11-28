import React from 'react';
import { mount } from 'enzyme';
import CouponInput from './CouponInput';
import { InputElementStyled } from '../Input/InputStyled';
import Input from '../Input';

jest.useFakeTimers();

const onSubmit = jest.fn().mockResolvedValue({});

describe('CouponInput', () => {
  describe('@renders', () => {
    it('should render initial state', () => {
      const wrapper = mount(<CouponInput onSubmit={onSubmit} />);
      const inputComponent = wrapper.find(Input);
      expect(inputComponent).toHaveLength(1);
      expect(inputComponent.props().clearMessageAfterDelay).toBe(true);
      expect(inputComponent.props().clearMessageOnFocus).toBe(true);
      expect(inputComponent.props().blurOnSubmit).toBe(true);
      expect(inputComponent.props().icon).toBe('test-file-stub');
      expect(inputComponent.props().couponLoading).toBe(false);

      const inputElement = wrapper.find(InputElementStyled);
      expect(inputElement).toHaveLength(1);
      expect(inputElement.props().type).toBe('text');
      expect(inputElement.props().placeholder).toBe('Redeem coupon');
      expect(inputElement.props().autoComplete).toBe('off');
    });
  });
});
