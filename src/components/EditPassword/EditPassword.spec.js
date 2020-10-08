/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import { mount } from 'enzyme';
import Button from 'components/Button';
import { PureEditPassword } from './EditPassword';

jest.mock('containers/labeling', () => () => Component => props => (
  <Component t={k => k} {...props} />
));
jest.mock('react-i18next', () => ({
  withTranslation: () => Component => props => (
    <Component t={k => k} {...props} />
  )
}));

const hideResetPassword = jest.fn();

describe('<EditPassword/>', () => {
  afterEach(() => jest.clearAllMocks());
  describe('@renders', () => {
    it('should render initial state', () => {
      const wrapper = mount(
        <PureEditPassword hideResetPassword={hideResetPassword} />
      );
      expect(wrapper.state('step')).toBe(1);
      expect(wrapper.state('isLoading')).toBe(false);
      expect(wrapper.state('isError')).toBe(false);
    });
  });
  describe('@actions', () => {
    it('should call hideResetPassword on no,thanks button', () => {
      const wrapper = mount(
        <PureEditPassword hideResetPassword={hideResetPassword} />
      );
      const buttons = wrapper.find(Button);
      const cancelButton = buttons.filterWhere(button => {
        return button.prop('theme') === 'simple';
      });
      expect(cancelButton).toHaveLength(1);
      cancelButton.simulate('click');
      expect(hideResetPassword).toHaveBeenCalledTimes(1);
    });
  });
  it('should call hideResetPassword when on step 2 and confirm button click', () => {
    const wrapper = mount(
      <PureEditPassword hideResetPassword={hideResetPassword} />
    );
    const buttons = wrapper.find(Button);
    const confirmButton = buttons.filterWhere(button => {
      return button.prop('theme') === 'confirm';
    });
    expect(confirmButton).toHaveLength(1);
    wrapper.setState({ step: 2 });

    expect(wrapper.state('step')).toBe(2);
    confirmButton.simulate('click');
    expect(hideResetPassword).toHaveBeenCalledTimes(1);
  });
});
