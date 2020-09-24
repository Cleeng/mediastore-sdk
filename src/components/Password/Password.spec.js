/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import { shallow, mount } from 'enzyme';
import { PurePassword } from './Password';
import { WrapStyled } from './PasswordStyled';

jest.mock('containers/labeling', () => () => Component => props => (
  <Component t={k => k} {...props} />
));
jest.mock('react-i18next', () => ({
  withTranslation: () => Component => props => (
    <Component t={k => k} {...props} />
  )
}));

describe('<Password/>', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe('@renders', () => {
    const showResetPassword = jest.fn();
    it('should render initial state', () => {
      const wrapper = shallow(
        <PurePassword showResetPassword={showResetPassword} />
      );
      expect(wrapper.find(WrapStyled)).toHaveLength(1);
    });
    it('should call showPopup on button click', () => {
      const wrapper = mount(
        <PurePassword showResetPassword={showResetPassword} />
      );
      wrapper.find('button').simulate('click');
      expect(showResetPassword).toHaveBeenCalledTimes(1);
    });
  });
});
