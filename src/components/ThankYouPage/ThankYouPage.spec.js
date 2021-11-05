/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import Header from 'components/Header';
import { mount } from 'enzyme';

import ThankYouPage from './ThankYouPage';

jest.mock('containers/labeling', () => () => Component => props => (
  <Component t={k => k} {...props} />
));
jest.mock('react-i18next', () => ({
  withTranslation: () => Component => props => (
    <Component t={k => k} {...props} />
  )
}));

describe('<ThankYouPage/>', () => {
  describe('@renders', () => {
    it('should render initial state', () => {
      const wrapper = mount(<ThankYouPage />);
      expect(wrapper.find(Header).exists()).toEqual(true);
    });
  });
});
