/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { mount } from 'enzyme';
import MyAccountConsents from 'components/MyAccountConsents';
import getCustomerConsentsRequest from 'api/Customer/getCustomerConsents';
import submitConsentsRequest from 'api/Customer/submitConsents';

import { PurePopup } from './Popup';
import 'jest-styled-components';

jest.mock('api/Customer/submitConsents');
jest.mock('api/Customer/getCustomerConsents');

jest.mock('containers/labeling', () => () => Component => props => (
  <Component t={k => k} {...props} />
));

jest.mock('react-i18next', () => ({
  withTranslation: () => Component => props => (
    <Component t={k => k} {...props} />
  )
}));

describe('<Popup/>', () => {
  const setConsentsMock = jest.fn();

  afterEach(() => jest.clearAllMocks());
  describe('@renders', () => {
    it('should render initial state on componentDidMount and not allow to press button if terms not accepted', () => {
      const consents = [
        {
          customerId: '338816933',
          name: 'broadcaster_marketing',
          required: false,
          state: 'accepted',
          version: '1',
          needsUpdate: false,
          label:
            'Yes, I want to receive Very important company and d3.ru updates by email. TEST',
          value:
            'Yes, I want to receive Very important company and d3.ru updates by email. TEST',
          newestVersion: '1',
          date: 1589366394
        },
        {
          customerId: '338816933',
          name: 'broadcaster_terms',
          required: true,
          state: 'declined',
          version: '1',
          needsUpdate: true,
          label:
            'I accept <a href="https://cleeng.com/privacy" target="_blank">Terms and Conditions</a> of pride&prejudice.',
          value: 'https://cleeng.com/privacy',
          newestVersion: '1',
          date: 1589777684
        }
      ];
      const wrapper = mount(
        <PurePopup
          setConsents={setConsentsMock}
          consents={consents}
          popupType="notCheckedTerms"
          hidePopup={jest.fn()}
        />
      );
      expect(wrapper.state('updatedConsents')).toEqual(consents);
      expect(wrapper.state('allowSubmitConsents')).toBe(false);
    });
    it('should render initial state on componentDidMount and allow to press button if terms not accepted', () => {
      const consents = [
        {
          customerId: '338816933',
          name: 'broadcaster_marketing',
          required: false,
          state: 'accepted',
          version: '1',
          needsUpdate: false,
          label:
            'Yes, I want to receive Very important company and d3.ru updates by email. TEST',
          value:
            'Yes, I want to receive Very important company and d3.ru updates by email. TEST',
          newestVersion: '1',
          date: 1589366394
        },
        {
          customerId: '338816933',
          name: 'broadcaster_terms',
          required: true,
          state: 'accpeted',
          version: '1',
          needsUpdate: true,
          label:
            'I accept <a href="https://cleeng.com/privacy" target="_blank">Terms and Conditions</a> of pride&prejudice.',
          value: 'https://cleeng.com/privacy',
          newestVersion: '2',
          date: 1589777684
        }
      ];
      const wrapper = mount(
        <PurePopup
          setConsents={setConsentsMock}
          consents={consents}
          popupType="termsUpdateRequired"
          hidePopup={jest.fn()}
        />
      );
      expect(wrapper.state('updatedConsents')).toEqual(consents);
      expect(wrapper.state('allowSubmitConsents')).toBe(true);
    });
  });
  describe('@actions', () => {
    it('should render next step on button click', () => {
      const consents = [
        {
          customerId: '338816933',
          name: 'broadcaster_marketing',
          required: true,
          state: 'accepted',
          version: '1',
          needsUpdate: true,
          label:
            'Yes, I want to receive Very important company and d3.ru updates by email. TEST',
          value:
            'Yes, I want to receive Very important company and d3.ru updates by email. TEST',
          newestVersion: '2',
          date: 1589366394
        }
      ];
      const wrapper = mount(
        <PurePopup
          setConsents={setConsentsMock}
          consents={consents}
          popupType="termsUpdateRequired"
          hidePopup={jest.fn()}
        />
      );
      wrapper.find('button').simulate('click');
      expect(wrapper.state('step')).toBe(2);
    });
    it('should submit consents on button click', done => {
      const consents = [
        {
          customerId: '338816933',
          name: 'broadcaster_marketing',
          required: true,
          state: 'declined',
          version: '1',
          needsUpdate: true,
          label:
            'Yes, I want to receive Very important company and d3.ru updates by email. TEST',
          value:
            'Yes, I want to receive Very important company and d3.ru updates by email. TEST',
          newestVersion: '2',
          date: 1589366394
        }
      ];
      const changedConsent = [
        {
          customerId: '338816933',
          name: 'broadcaster_marketing',
          required: true,
          state: 'accepted',
          version: '1',
          needsUpdate: true,
          label:
            'Yes, I want to receive Very important company and d3.ru updates by email. TEST',
          value:
            'Yes, I want to receive Very important company and d3.ru updates by email. TEST',
          newestVersion: '2',
          date: 1589366394
        }
      ];
      submitConsentsRequest.mockResolvedValue({
        responseData: {},
        errors: []
      });
      getCustomerConsentsRequest.mockResolvedValue({
        responseData: { consents: changedConsent },
        errors: []
      });
      const wrapper = mount(
        <PurePopup
          setConsents={setConsentsMock}
          consents={consents}
          popupType="termsUpdateRequired"
          hidePopup={jest.fn()}
        />
      );
      wrapper.find('button').simulate('click');
      expect(wrapper.state('step')).toBe(2);
      expect(wrapper.find(MyAccountConsents).exists()).toBe(true);
      wrapper
        .find(MyAccountConsents)
        .props()
        .saveConsents(changedConsent);
      expect(wrapper.state('updatedConsents')).toEqual(changedConsent);
      expect(wrapper.state('allowSubmitConsents')).toEqual(true);
      wrapper.find('button').simulate('click');
      setImmediate(() => {
        expect(submitConsentsRequest).toHaveBeenCalledWith(
          [],
          [],
          [
            {
              name: 'broadcaster_marketing',
              version: '2',
              state: 'accepted'
            }
          ]
        );
        expect(getCustomerConsentsRequest).toHaveBeenCalled();
        expect(setConsentsMock).toHaveBeenCalledWith(changedConsent);
        done();
      });
    });
  });
});
