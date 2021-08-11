/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { shallow } from 'enzyme';
import Adyen from './Adyen';

jest.mock('containers/labeling', () => () => Component => props => (
  <Component t={k => k} {...props} />
));
jest.mock('react-i18next', () => ({
  withTranslation: () => Component => props => (
    <Component t={k => k} {...props} />
  )
}));

const mockOnSubmit = jest.fn();
const mockOnChange = jest.fn();

class MockAdyenCheckout {
  constructor(configuration) {
    expect(configuration).toStrictEqual({
      environment: 'test',
      onSubmit: mockOnSubmit,
      onChange: mockOnChange,
      clientKey: 'test_I4OFGUUCEVB5TI222AS3N2Y2LY6PJM3K',
      showPayButton: false
    });
  }

  create = paymentMethod => {
    expect(paymentMethod).toBe('card');
    return {
      mount: componentContainerId =>
        expect(componentContainerId).toBe('#component-container')
    };
  };
}

describe('Adyen', () => {
  it('calls Adyen API', () => {
    window.AdyenCheckout = MockAdyenCheckout;
    window.ENVIRONMENT_CONFIGURATION = {
      ADYEN_CLIENT_KEY: 'foo'
    };
    shallow(<Adyen onSubmit={mockOnSubmit} onChange={mockOnChange} />); // assertions are inside the mock class functions
  });
});
