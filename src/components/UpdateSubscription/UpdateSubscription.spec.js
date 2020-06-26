import React from 'react';
import { mount, shallow } from 'enzyme';
import Checkbox from 'components/Checkbox';
import Button from 'components/Button';
import updateSubscriptionRequest from 'api/Customer/updateSubscription';
import { PureUpdateSubscription } from './UpdateSubscription';
import { HeaderStyled, SubTitleStyled } from './UpdateSubscriptionStyled';

jest.mock('api/Customer/updateSubscription');
const hideSurveyMock = jest.fn();
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
  describe('error', () => {
    it('should render correct message when error occured', () => {
      const wrapper = mount(
        <PureUpdateSubscription
          hideSurvey={hideSurveyMock}
          updateList={updateListMock}
          action={actionUnsubscribeMock}
          offerDetails={offerDetailsMock}
        />
      );
      wrapper.setState({ isError: true });
      expect(wrapper.find(SubTitleStyled).text()).toEqual(
        'Please try again in a few moments.'
      );
    });
    it('should hide error message on button click', () => {
      const wrapper = mount(
        <PureUpdateSubscription
          hideSurvey={hideSurveyMock}
          updateList={updateListMock}
          action={actionUnsubscribeMock}
          offerDetails={offerDetailsMock}
        />
      );
      wrapper.setState({ isError: true });
      expect(wrapper.find(SubTitleStyled).text()).toEqual(
        'Please try again in a few moments.'
      );
      wrapper.find(Button).simulate('click');
      expect(hideSurveyMock).toHaveBeenCalled();
      expect(hideSurveyMock).toHaveBeenCalledTimes(1);
      expect(updateListMock).toHaveBeenCalled();
      expect(updateListMock).toHaveBeenCalledTimes(1);
    });
  });
  describe('@renders', () => {
    it('should render default layout', () => {
      const wrapper = mount(
        <PureUpdateSubscription
          hideSurvey={hideSurveyMock}
          updateList={updateListMock}
          action={actionUnsubscribeMock}
          offerDetails={offerDetailsMock}
        />
      );
      expect(wrapper.state('layout')).toBe('confirm');
      expect(wrapper.state('checkedReason')).toBe('');
      expect(wrapper.state('isError')).toBe(false);
      expect(wrapper.state('isLoading')).toBe(false);
      expect(wrapper.find(HeaderStyled).text()).toEqual(
        'We’re sorry to see you go.'
      );
    });

    it('should render success layout', () => {
      const wrapper = mount(
        <PureUpdateSubscription
          hideSurvey={hideSurveyMock}
          updateList={updateListMock}
          action={actionUnsubscribeMock}
          offerDetails={offerDetailsMock}
        />
      );
      expect(wrapper.state('layout')).toBe('confirm');
      wrapper.setState({ layout: 'success' });
      expect(wrapper.find(HeaderStyled).text()).toEqual('Miss you already.');
    });

    describe('@actions', () => {
      it('should set in state checked reason', () => {
        const wrapper = mount(
          <PureUpdateSubscription
            hideSurvey={hideSurveyMock}
            updateList={updateListMock}
            action={actionUnsubscribeMock}
            offerDetails={offerDetailsMock}
          />
        );
        expect(wrapper.state('layout')).toBe('confirm');
        expect(wrapper.state('checkedReason')).toBe('');

        const checkbox = wrapper.find(Checkbox).first();
        expect(checkbox.exists()).toBe(true);

        checkbox.simulate('click');
        expect(wrapper.state('checkedReason')).toBe('Poor customer support');
      });

      it('should call unsubscribe fn on button click', () => {
        const wrapper = mount(
          <PureUpdateSubscription
            hideSurvey={hideSurveyMock}
            updateList={updateListMock}
            action={actionUnsubscribeMock}
            offerDetails={offerDetailsMock}
          />
        );
        wrapper.instance().unsubscribe = jest.fn();
        expect(wrapper.state('layout')).toBe('confirm');
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
            hideSurvey={hideSurveyMock}
            updateList={updateListMock}
            action={actionResubscribeMock}
            offerDetails={offerDetailsMock}
          />
        );
        wrapper.instance().resubscribe = jest.fn();
        wrapper.instance().forceUpdate();
        expect(wrapper.state('layout')).toBe('confirm');
        const resubButton = wrapper.find(Button).last();
        resubButton.simulate('click');
        expect(wrapper.instance().resubscribe).toHaveBeenCalled();
      });

      it('should hide survey when on button click', () => {
        const wrapper = mount(
          <PureUpdateSubscription
            hideSurvey={hideSurveyMock}
            updateList={updateListMock}
            action={actionUnsubscribeMock}
            offerDetails={offerDetailsMock}
          />
        );
        wrapper.setState({ layout: 'success' });
        wrapper.find(Button).simulate('click');
        expect(hideSurveyMock).toHaveBeenCalled();
        expect(hideSurveyMock).toHaveBeenCalledTimes(1);
        expect(updateListMock).toHaveBeenCalled();
        expect(updateListMock).toHaveBeenCalledTimes(1);
      });
    });
    describe('@functions', () => {
      describe('unsubscribe', () => {
        it('should change layout and switch off loader if request success', done => {
          updateSubscriptionRequest.mockResolvedValue({
            responseData: {},
            errors: []
          });
          const wrapper = shallow(
            <PureUpdateSubscription
              hideSurvey={hideSurveyMock}
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
            expect(wrapper.state('layout')).toBe('success');
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
              hideSurvey={hideSurveyMock}
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
            expect(wrapper.state('layout')).toBe('confirm');
            expect(wrapper.state('isLoading')).toBe(false);
            done();
          });
        });
        it('should set error if request fail', done => {
          updateSubscriptionRequest.mockRejectedValue(new Error('error'));
          const wrapper = shallow(
            <PureUpdateSubscription
              hideSurvey={hideSurveyMock}
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
            expect(wrapper.state('layout')).toBe('confirm');
            expect(wrapper.state('isLoading')).toBe(false);
            done();
          });
        });
      });
      describe('resubscribe', () => {
        it('should change layout and switch off loader if request success', done => {
          updateSubscriptionRequest.mockResolvedValue({
            responseData: {},
            errors: []
          });
          const wrapper = shallow(
            <PureUpdateSubscription
              hideSurvey={hideSurveyMock}
              updateList={updateListMock}
              action={actionUnsubscribeMock}
              offerDetails={offerDetailsMock}
            />
          );
          wrapper.instance().resubscribe();
          expect(wrapper.state('isLoading')).toBe(true);
          setImmediate(() => {
            expect(wrapper.state('isError')).toBe(false);
            expect(wrapper.state('layout')).toBe('success');
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
              hideSurvey={hideSurveyMock}
              updateList={updateListMock}
              action={actionUnsubscribeMock}
              offerDetails={offerDetailsMock}
            />
          );
          wrapper.instance().resubscribe();
          expect(wrapper.state('isLoading')).toBe(true);
          setImmediate(() => {
            expect(wrapper.state('isError')).toBe(true);
            expect(wrapper.state('layout')).toBe('confirm');
            expect(wrapper.state('isLoading')).toBe(false);
            done();
          });
        });
        it('should set error if request fail', done => {
          updateSubscriptionRequest.mockResolvedValue(new Error('error'));
          const wrapper = shallow(
            <PureUpdateSubscription
              hideSurvey={hideSurveyMock}
              updateList={updateListMock}
              action={actionUnsubscribeMock}
              offerDetails={offerDetailsMock}
            />
          );
          wrapper.instance().resubscribe();
          expect(wrapper.state('isLoading')).toBe(true);
          setImmediate(() => {
            expect(wrapper.state('isError')).toBe(true);
            expect(wrapper.state('layout')).toBe('confirm');
            expect(wrapper.state('isLoading')).toBe(false);
            done();
          });
        });
      });
    });
  });
});
