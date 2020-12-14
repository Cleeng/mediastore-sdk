/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import { mount, shallow } from 'enzyme';
import Checkbox from 'components/Checkbox';
import Button from 'components/Button';
import updateSubscriptionRequest from 'api/Customer/updateSubscription';
import { TitleStyled } from 'components/InnerPopupWrapper/InnerPopupWrapperStyled';
import { PureUpdateSubscription } from './UpdateSubscription';

jest.mock('api/Customer/updateSubscription');

jest.mock('containers/labeling', () => () => Component => props => (
  <Component t={k => k} {...props} />
));
jest.mock('react-i18next', () => ({
  withTranslation: () => Component => props => (
    <Component t={k => k} {...props} />
  )
}));

const hideInnerPopupMock = jest.fn();
const updateListMock = jest.fn();
const actionUnsubscribeMock = 'unsubscribe';
const actionResubscribeMock = 'resubscribe';

const offerDetailsMock = {
  offerId: '1234',
  price: '12$',
  expiresAt: 54356757
};

describe('<UpdateSubscription/>', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe('@renders', () => {
    it('should render default state', () => {
      const wrapper = mount(
        <PureUpdateSubscription
          hideInnerPopup={hideInnerPopupMock}
          updateList={updateListMock}
          action={actionUnsubscribeMock}
          offerDetails={offerDetailsMock}
        />
      );
      expect(wrapper.state('checkedReason')).toBe('');
      expect(wrapper.state('isError')).toBe(false);
      expect(wrapper.state('isLoading')).toBe(false);
      expect(wrapper.state('currentStep')).toBe(1);
      expect(wrapper.find(TitleStyled).text()).toEqual(
        'We’re sorry to see you go.'
      );
    });

    describe('@actions', () => {
      it('should set in state checked reason', () => {
        const wrapper = mount(
          <PureUpdateSubscription
            hideInnerPopup={hideInnerPopupMock}
            updateList={updateListMock}
            action={actionUnsubscribeMock}
            offerDetails={offerDetailsMock}
          />
        );
        expect(wrapper.state('currentStep')).toBe(1);
        expect(wrapper.state('checkedReason')).toBe('');

        const checkbox = wrapper.find(Checkbox).first();
        expect(checkbox.exists()).toBe(true);

        checkbox.simulate('click');
        expect(wrapper.state('checkedReason')).toBe('Poor customer support');
      });

      it('should call unsubscribe fn on button click', () => {
        const wrapper = mount(
          <PureUpdateSubscription
            hideInnerPopup={hideInnerPopupMock}
            updateList={updateListMock}
            action={actionUnsubscribeMock}
            offerDetails={offerDetailsMock}
          />
        );
        wrapper.instance().unsubscribe = jest.fn();
        expect(wrapper.state('currentStep')).toBe(1);
        const checkbox = wrapper.find(Checkbox).first();
        checkbox.simulate('click');
        expect(wrapper.state('checkedReason')).toBe('Poor customer support');
        const unsubButton = wrapper.find(Button).last();
        unsubButton.simulate('click');
        expect(wrapper.instance().unsubscribe).toHaveBeenCalled();
      });

      it('should call resubscribe fn on button click', () => {
        const wrapper = mount(
          <PureUpdateSubscription
            hideInnerPopup={hideInnerPopupMock}
            updateList={updateListMock}
            action={actionResubscribeMock}
            offerDetails={offerDetailsMock}
          />
        );
        wrapper.instance().resubscribe = jest.fn();
        wrapper.instance().forceUpdate();
        expect(wrapper.state('currentStep')).toBe(1);
        const resubButton = wrapper.find(Button).last();
        resubButton.simulate('click');
        expect(wrapper.instance().resubscribe).toHaveBeenCalled();
      });

      it('should hide survey when on button click', () => {
        const wrapper = mount(
          <PureUpdateSubscription
            hideInnerPopup={hideInnerPopupMock}
            updateList={updateListMock}
            action={actionUnsubscribeMock}
            offerDetails={offerDetailsMock}
          />
        );
        wrapper.setState({ currentStep: 2 });
        wrapper
          .find(Button)
          .first()
          .simulate('click');
        expect(hideInnerPopupMock).toHaveBeenCalledTimes(1);
        expect(updateListMock).toHaveBeenCalledTimes(1);
        expect(updateListMock).toHaveBeenCalledTimes(1);
      });
    });
    describe('@functions', () => {
      describe('unsubscribe', () => {
        it('should change currentStep and switch off loader if request success', done => {
          updateSubscriptionRequest.mockResolvedValue({
            responseData: {},
            errors: []
          });
          const wrapper = shallow(
            <PureUpdateSubscription
              hideInnerPopup={hideInnerPopupMock}
              updateList={updateListMock}
              action={actionUnsubscribeMock}
              offerDetails={offerDetailsMock}
            />
          );
          wrapper.setState({ chekedReason: 'mock reason' });
          wrapper.instance().unsubscribe();
          expect(wrapper.state('isLoading')).toBe(true);
          setImmediate(() => {
            expect(wrapper.state('isError')).toBe(false);
            expect(wrapper.state('currentStep')).toBe(2);
            expect(wrapper.state('isLoading')).toBe(false);
            done();
          });
        });
        it('should set error if request returns errors', done => {
          updateSubscriptionRequest.mockResolvedValue({
            responseData: {},
            errors: ['error']
          });
          const wrapper = shallow(
            <PureUpdateSubscription
              hideInnerPopup={hideInnerPopupMock}
              updateList={updateListMock}
              action={actionUnsubscribeMock}
              offerDetails={offerDetailsMock}
            />
          );
          wrapper.setState({ chekedReason: 'mock reason' });
          wrapper.instance().unsubscribe();
          expect(wrapper.state('isLoading')).toBe(true);
          setImmediate(() => {
            expect(wrapper.state('isError')).toBe(true);
            expect(wrapper.state('currentStep')).toBe(1);
            expect(wrapper.state('isLoading')).toBe(false);
            done();
          });
        });
        it('should set error if request fail', done => {
          updateSubscriptionRequest.mockRejectedValue(new Error('error'));
          const wrapper = shallow(
            <PureUpdateSubscription
              hideInnerPopup={hideInnerPopupMock}
              updateList={updateListMock}
              action={actionUnsubscribeMock}
              offerDetails={offerDetailsMock}
            />
          );
          wrapper.setState({ chekedReason: 'mock reason' });
          wrapper.instance().unsubscribe();
          expect(wrapper.state('isLoading')).toBe(true);
          setImmediate(() => {
            expect(wrapper.state('isError')).toBe(true);
            expect(wrapper.state('currentStep')).toBe(1);
            expect(wrapper.state('isLoading')).toBe(false);
            done();
          });
        });
      });
      describe('resubscribe', () => {
        it('should change currentStep and switch off loader if request success', done => {
          updateSubscriptionRequest.mockResolvedValue({
            responseData: {},
            errors: []
          });
          const wrapper = shallow(
            <PureUpdateSubscription
              hideInnerPopup={hideInnerPopupMock}
              updateList={updateListMock}
              action={actionUnsubscribeMock}
              offerDetails={offerDetailsMock}
            />
          );
          wrapper.instance().resubscribe();
          expect(wrapper.state('isLoading')).toBe(true);
          setImmediate(() => {
            expect(wrapper.state('isError')).toBe(false);
            expect(wrapper.state('currentStep')).toBe(2);
            expect(wrapper.state('isLoading')).toBe(false);
            done();
          });
        });
        it('should set error if request returns errors', done => {
          updateSubscriptionRequest.mockResolvedValue({
            responseData: {},
            errors: ['error']
          });
          const wrapper = shallow(
            <PureUpdateSubscription
              hideInnerPopup={hideInnerPopupMock}
              updateList={updateListMock}
              action={actionUnsubscribeMock}
              offerDetails={offerDetailsMock}
            />
          );
          wrapper.instance().resubscribe();
          expect(wrapper.state('isLoading')).toBe(true);
          setImmediate(() => {
            expect(wrapper.state('isError')).toBe(true);
            expect(wrapper.state('currentStep')).toBe(1);
            expect(wrapper.state('isLoading')).toBe(false);
            done();
          });
        });
        it('should set error if request fail', done => {
          updateSubscriptionRequest.mockResolvedValue(new Error('error'));
          const wrapper = shallow(
            <PureUpdateSubscription
              hideInnerPopup={hideInnerPopupMock}
              updateList={updateListMock}
              action={actionUnsubscribeMock}
              offerDetails={offerDetailsMock}
            />
          );
          wrapper.instance().resubscribe();
          expect(wrapper.state('isLoading')).toBe(true);
          setImmediate(() => {
            expect(wrapper.state('isError')).toBe(true);
            expect(wrapper.state('currentStep')).toBe(1);
            expect(wrapper.state('isLoading')).toBe(false);
            done();
          });
        });
      });
    });
  });
});
