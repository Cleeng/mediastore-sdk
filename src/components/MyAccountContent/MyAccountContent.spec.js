/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { mount } from 'enzyme';
import MyAccountContent from './MyAccountContent';

describe('<MyAccountContent/>', () => {
  const wrapper = mount(<MyAccountContent />);

  jest.mock('containers/labeling', () => () => Component => props => (
    <Component t={k => k} {...props} />
  ));
  jest.mock('react-i18next', () => ({
    withTranslation: () => Component => props => (
      <Component t={k => k} {...props} />
    )
  }));

  describe('@renders', () => {
    it('should render initial state', () => {
      expect(wrapper.prop('children')).toBe('');
    });
  });
});
