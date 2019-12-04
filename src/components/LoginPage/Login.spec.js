/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { mount } from 'enzyme';
import { PureLogin } from './Login';

const mockUrlProps = {
  location: { search: '?offer=123123' }
};

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

describe('Login', () => {
  describe('@renders', () => {
    it('should set state when offer error occurred', () => {
      const wrapper = mount(<PureLogin urlProps={mockUrlProps} />);
      wrapper.instance().setOfferError(true);
      expect(wrapper.state().isOfferError).toBe(true);
    });
  });
});
