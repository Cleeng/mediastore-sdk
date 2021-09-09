/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import { shallow, mount } from 'enzyme';
import getCustomerSubscriptionsRequest from 'api/Customer/getCustomerSubscriptions';
import { POPUP_TYPES } from 'redux/innerPopupReducer';

import UpdateSubscription from 'components/UpdateSubscription';

import { PureSubscriptions } from './Subscriptions.component';

jest.mock('api/Customer/getCustomerSubscriptions');
jest.mock('api/Customer/getAvailableSwitches');

jest.mock('containers/labeling', () => () => Component => props => (
  <Component t={k => k} {...props} />
));
jest.mock('react-i18next', () => ({
  withTranslation: () => Component => props => (
    <Component t={k => k} {...props} />
  ),
  useTranslation: () => ({
    t: key => key
  })
}));

const setCurrentPlanMock = jest.fn();
const showInnerPopupMock = jest.fn();
const hideInnerPopupMock = jest.fn();
const setOfferToSwitchMock = jest.fn();
const setSwitchSettingsMock = jest.fn();
const updateListMock = jest.fn();

const defaultProps = {
  setCurrentPlan: setCurrentPlanMock,
  showInnerPopup: showInnerPopupMock,
  hideInnerPopup: hideInnerPopupMock,
  setOfferToSwitch: setOfferToSwitchMock,
  setSwitchSettings: setSwitchSettingsMock,
  updateList: updateListMock
};
describe('<Subscriptions/>', () => {
  afterEach(() => jest.clearAllMocks());
  describe('@componentDidMount', () => {
    it('should set state when fetchSubscriptions return error', done => {
      getCustomerSubscriptionsRequest.mockResolvedValue({
        responseData: {},
        errors: ['error']
      });
      shallow(<PureSubscriptions {...defaultProps} />);
      setImmediate(() => {
        expect(setCurrentPlanMock).not.toHaveBeenCalled();
        done();
      });
    });
    it('should catch error when fetchSubscriptions fail', done => {
      getCustomerSubscriptionsRequest.mockRejectedValue(new Error('error'));
      shallow(<PureSubscriptions {...defaultProps} />);
      setImmediate(() => {
        expect(setCurrentPlanMock).not.toHaveBeenCalled();
        done();
      });
    });
    it('should hide survey on switch tabs', () => {
      mount(
        <PureSubscriptions
          {...defaultProps}
          planDetails={{ isSurveyShown: true, currentPlan: ['mock'] }}
          innerPopup={{ isOpen: true }}
        />
      );
      expect(hideInnerPopupMock).toHaveBeenCalled();
      expect(updateListMock).toHaveBeenCalled();
    });
  });
  describe('@actions', () => {
    it('should render updateSubscription popup', () => {
      const wrapper = shallow(
        <PureSubscriptions
          {...defaultProps}
          planDetails={{
            currentPlan: [1],
            switchSettings: { id: [{ mock: 'mock' }] },
            offerToSwitch: { offerId: 'id' },
            updateList: false
          }}
          innerPopup={{
            isOpen: true,
            type: POPUP_TYPES.updateSubscription,
            data: { action: 'resubscribe', offerData: { mock: 'mock' } }
          }}
        />
      );
      expect(wrapper.find(UpdateSubscription).exists()).toBe(true);
    });
  });
});
