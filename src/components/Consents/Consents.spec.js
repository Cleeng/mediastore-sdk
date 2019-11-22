import { shallow, mount } from 'enzyme';
import React from 'react';
import Loader from '../Loader';
import Checkbox from '../Checkbox';
import ConsentsComponent from './Consents';
import getConsentsRequest from '../../api/getConsents';
import { ConsentsErrorStyled } from './ConsentsStyled';
import 'jest-styled-components';

const mockConsent = [
  {
    name: 'name',
    version: '1',
    required: false,
    label: '<a>Terms</a>'
  }
];
const mockConsentDefinitions = [
  {
    name: 'name',
    version: '1',
    required: false
  }
];
const mockConsentsLabels = ['<a>Terms</a>'];
const mockConsentsLabelsAfterRegex = ['{{htmltag}}Terms{{endhtmltag}}'];

const mockOfferId = '123123_PL';

jest.mock('../../api/getConsents');
const mockConsentsFetch = jest.fn();

describe('<Consents/>', () => {
  describe('@renders', () => {
    it('should render initial state', () => {
      const wrapper = shallow(<ConsentsComponent />);
      const loader = wrapper.find(Loader);
      expect(loader).toHaveLength(1);
    });
    it('should render consents after fetching', () => {
      const wrapper = shallow(<ConsentsComponent />);
      wrapper.setState({
        consentLoaded: true,
        consentDefinitions: mockConsent,
        consentsLabels: mockConsentsLabels,
        checked: [false]
      });
      expect(wrapper.exists('Checkbox')).toBe(true);
      expect(wrapper.find(Checkbox)).toHaveLength(1);
      expect(wrapper.find(Checkbox).props().checked).toEqual(false);
      expect(wrapper.find(Checkbox).props().required).toEqual(
        mockConsent[0].required
      );
      expect(wrapper.find(Checkbox).props().children).toEqual(
        mockConsentsLabels[0]
      );
    });
    it('should render error', () => {
      const errorValue = 'error text';
      const wrapper = shallow(<ConsentsComponent error={errorValue} />);
      expect(wrapper.find(ConsentsErrorStyled).exists()).toBe(true);
      expect(wrapper.find(ConsentsErrorStyled).text()).toEqual(errorValue);
    });
  });
  describe('@lifecycle', () => {
    describe('constructor', () => {
      it('should set default state values', () => {
        const wrapper = shallow(<ConsentsComponent />);
        expect(wrapper.state().consentDefinitions).toEqual([]);
        expect(wrapper.state().consentsLabels).toEqual([]);
        expect(wrapper.state().checked).toEqual([]);
        expect(wrapper.state().consentLoaded).toBe(false);
      });
    });
    describe('componentDidMount', () => {
      it('should get consents definitions and init values', done => {
        getConsentsRequest.mockImplementationOnce(
          mockConsentsFetch.mockResolvedValue({
            responseData: { consents: mockConsent }
          })
        );
        // simulate offerId setup with delay
        const wrapper = mount(<ConsentsComponent offerId="" />);
        wrapper.setProps({ offerId: mockOfferId });
        wrapper.update();
        expect(getConsentsRequest).toHaveBeenCalled();
        setImmediate(() => {
          expect(wrapper.state().consentDefinitions).toEqual(
            mockConsentDefinitions
          );
          expect(wrapper.state().consentLoaded).toBe(true);
          expect(wrapper.state().checked).toEqual([false]);
          expect(wrapper.state().consentsLabels).toEqual(
            mockConsentsLabelsAfterRegex
          );
          done();
        });
      });
    });
    describe('actions', () => {
      it('change consent state on click', () => {
        const wrapper = mount(<ConsentsComponent />);
        wrapper.setState({
          consentLoaded: true,
          consentDefinitions: mockConsent,
          consentsLabels: mockConsentsLabels,
          checked: [false]
        });
        expect(wrapper.exists('Checkbox')).toBe(true);
        expect(wrapper.find(Checkbox)).toHaveLength(1);
        expect(wrapper.state().checked[0]).toEqual(false);
        wrapper.find(Checkbox).simulate('click');
        expect(wrapper.state().checked[0]).toEqual(true);
      });
    });
  });
});
