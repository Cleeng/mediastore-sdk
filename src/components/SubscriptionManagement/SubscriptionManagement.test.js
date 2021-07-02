/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import { mount, shallow } from 'enzyme';
import 'jest-styled-components';
import { PureSubscriptionManagement } from './SubscriptionManagement';
import {
  ManageButtonWrapStyled,
  SubscriptionActionsStyled,
  SimpleButtonStyled,
  FullWidthButtonStyled
} from './SubscriptionManagementStyled';

jest.mock('containers/labeling', () => () => Component => props => (
  <Component t={k => k} {...props} />
));
jest.mock('react-i18next', () => ({
  withTranslation: () => Component => props => (
    <Component t={k => k} {...props} />
  )
}));

describe('<MessageBox/>', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  const subscriptionMock = {
    offerId: 'S937144802_UA',
    status: 'active',
    expiresAt: 1582706082,
    nextPaymentPrice: 14.4,
    nextPaymentCurrency: 'EUR',
    paymentGateway: 'adyen',
    paymentMethod: 'mc',
    offerTitle: 'Monthly subscription with 7 days trial',
    period: 'month'
  };
  const subscriptionCancelledMock = {
    offerId: 'S937144802_UA',
    status: 'cancelled',
    expiresAt: 1582706082,
    nextPaymentPrice: 14.4,
    nextPaymentCurrency: 'EUR',
    paymentGateway: 'adyen',
    paymentMethod: 'mc',
    offerTitle: 'Monthly subscription with 7 days trial',
    period: 'month'
  };
  const updateListMock = jest.fn();
  const showInnerPopupMock = jest.fn();
  const showMessageBoxMock = jest.fn();
  describe('@renders', () => {
    it('should render initial state', () => {
      const wrapper = shallow(<PureSubscriptionManagement />);

      expect(wrapper.find(ManageButtonWrapStyled)).toHaveLength(1);
      expect(wrapper.find(SubscriptionActionsStyled)).toHaveLength(1);
    });
  });
  describe('@actions', () => {
    it('should call showInnerPopup on click unsubscribe', () => {
      const wrapper = mount(
        <PureSubscriptionManagement
          subscription={subscriptionMock}
          showInnerPopup={showInnerPopupMock}
          updateList={updateListMock}
          showMessageBox={showMessageBoxMock}
        />
      );

      wrapper.find(SimpleButtonStyled).simulate('click');

      expect(showInnerPopupMock).toHaveBeenCalledTimes(1);
      expect(showInnerPopupMock).toHaveBeenCalledWith({
        type: 'updateSubscription',
        data: {
          action: 'unsubscribe',
          offerData: {
            offerId: 'S937144802_UA',
            expiresAt: 1582706082
          }
        }
      });
    });
    it('should call showInnerPopup on click resubscribe', () => {
      const wrapper = mount(
        <PureSubscriptionManagement
          subscription={subscriptionCancelledMock}
          showInnerPopup={showInnerPopupMock}
          updateList={updateListMock}
          showMessageBox={showMessageBoxMock}
        />
      );
      wrapper.find(FullWidthButtonStyled).simulate('click');

      expect(showInnerPopupMock).toHaveBeenCalledTimes(1);
      expect(showInnerPopupMock).toHaveBeenCalledWith({
        type: 'updateSubscription',
        data: {
          action: 'resubscribe',
          offerData: {
            offerId: subscriptionCancelledMock.offerId,
            expiresAt: subscriptionCancelledMock.expiresAt,
            price: `14.4€`
          }
        }
      });
    });
  });
});
