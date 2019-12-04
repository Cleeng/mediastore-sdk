/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { mount } from 'enzyme';
import { PureRegister } from './Register';

jest.mock('react-router-dom', () => {
  return {
    Link: () => {
      return <div />;
    }
  };
});

jest.mock('containers/labeling', () => () => Component => props => (
  <Component t={k => k} {...props} />
));

jest.mock('react-i18next', () => ({
  withTranslation: () => Component => props => (
    <Component t={k => k} {...props} />
  )
}));

const mockUrlProps = {
  location: { search: '?123123' }
};

describe('Register Page', () => {
  describe('@renders', () => {
    it('should update state when offer not exist', () => {
      const wrapper = mount(<PureRegister urlProps={mockUrlProps} />);
      wrapper.instance().setOfferError(true);
      expect(wrapper.state().isOfferError).toBe(true);
    });
  });
});
