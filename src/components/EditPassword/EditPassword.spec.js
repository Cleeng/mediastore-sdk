/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import { mount } from 'enzyme';
import Button from 'components/Button';
import resetPasswordRequest from 'api/Auth/resetPassword';
import { PureEditPassword } from './EditPassword';

jest.mock('api/Auth/resetPassword');

jest.mock('containers/labeling', () => () => Component => props => (
  <Component t={k => k} {...props} />
));
jest.mock('react-i18next', () => ({
  withTranslation: () => Component => props => (
    <Component t={k => k} {...props} />
  )
}));

const hideInnerPopupMock = jest.fn();

describe('<EditPassword/>', () => {
  afterEach(() => jest.clearAllMocks());
  describe('@renders', () => {
    it('should render initial state', () => {
      const wrapper = mount(
        <PureEditPassword hideInnerPopup={hideInnerPopupMock} />
      );
      expect(wrapper.state('step')).toBe(1);
      expect(wrapper.state('isLoading')).toBe(false);
      expect(wrapper.state('isError')).toBe(false);
    });
  });
  describe('@actions', () => {
    it('should close popup on "no,thanks" button click', () => {
      const wrapper = mount(
        <PureEditPassword hideInnerPopup={hideInnerPopupMock} />
      );
      const buttons = wrapper.find(Button);
      const cancelButton = buttons.filterWhere(button => {
        return button.prop('theme') === 'simple';
      });
      expect(cancelButton).toHaveLength(1);
      cancelButton.simulate('click');
      expect(hideInnerPopupMock).toHaveBeenCalledTimes(1);
    });
    it('should reset password on button click', done => {
      resetPasswordRequest.mockResolvedValue({
        responseData: {},
        errors: []
      });
      const wrapper = mount(
        <PureEditPassword hideInnerPopup={hideInnerPopupMock} />
      );
      const buttons = wrapper.find(Button);
      wrapper.setState({ step: 1 });
      const confirmButton = buttons.filterWhere(button => {
        return button.prop('theme') === 'confirm';
      });
      confirmButton.simulate('click');
      setImmediate(() => {
        expect(resetPasswordRequest).toHaveBeenCalledTimes(1);
        expect(wrapper.state('step')).toBe(2);
        expect(wrapper.state('isLoading')).toBe(false);
        done();
      });
    });
    it('should logout customer on click button in step 2', () => {
      const wrapper = mount(
        <PureEditPassword hideInnerPopup={hideInnerPopupMock} />
      );
      const buttons = wrapper.find(Button);
      const confirmButton = buttons.filterWhere(button => {
        return button.prop('theme') === 'confirm';
      });
      expect(confirmButton).toHaveLength(1);
      wrapper.setState({ step: 2 });

      expect(wrapper.state('step')).toBe(2);
      confirmButton.simulate('click');
      expect(hideInnerPopupMock).toHaveBeenCalledTimes(1);
    });
  });
});
