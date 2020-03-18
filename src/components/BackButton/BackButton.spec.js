/* eslint-disable react/jsx-props-no-spreading */
import { mount } from 'enzyme';
import React from 'react';
import { PureBackButton } from './BackButton';

jest.mock('containers/labeling', () => () => Component => props => (
  <Component t={k => k} {...props} />
));
jest.mock('react-i18next', () => ({
  withTranslation: () => Component => props => (
    <Component t={k => k} {...props} />
  )
}));

jest.mock('react-router-dom', () => {
  return {
    Link: () => {
      return <div />;
    }
  };
});

describe('<BackButton/>', () => {
  describe('@renders', () => {
    it('should render initial state', () => {
      const wrapper = mount(<PureBackButton />);
      expect(wrapper.prop('isMyAccount')).toBe(false);
    });
    it('should change pathname when isMyAccount', () => {
      const wrapper = mount(<PureBackButton isMyAccount />);
      expect(wrapper.prop('isMyAccount')).toBe(true);
    });
  });
});
