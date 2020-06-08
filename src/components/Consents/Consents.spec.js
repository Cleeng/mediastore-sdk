import { shallow, mount } from 'enzyme';
import React from 'react';
import Checkbox from 'components/Checkbox';
import Loader from 'components/Loader';
import getConsentsRequest from 'api/Publisher/getConsents';
import ConsentsComponent from './Consents';
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
const mockConsentWithoutTag = [
  {
    name: 'name2',
    version: '2',
    required: false,
    label: 'No tags'
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
const mockConsentsLabelsAfterRegexWithoutTags = ['No tags'];

const mockPublisherId = '123456789';

jest.mock('api/Publisher/getConsents');

describe('<Consents/>', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
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
        getConsentsRequest.mockResolvedValue({
          responseData: { consents: mockConsent }
        });
        // simulate publisherId setup with delay
        const wrapper = mount(<ConsentsComponent publisherId="" />);
        wrapper.setProps({ publisherId: mockPublisherId });
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
      it('should translate consents without tags', done => {
        getConsentsRequest.mockResolvedValue({
          responseData: { consents: mockConsentWithoutTag }
        });
        const wrapper = mount(<ConsentsComponent publisherId="" />);
        wrapper.setProps({ publisherId: mockPublisherId });
        wrapper.update();
        expect(getConsentsRequest).toHaveBeenCalled();
        setImmediate(() => {
          expect(wrapper.state().consentLoaded).toBe(true);
          expect(wrapper.state().checked).toEqual([false]);
          expect(wrapper.state().consentsLabels).toEqual(
            mockConsentsLabelsAfterRegexWithoutTags
          );
          done();
        });
      });
      it('should catch error when fetch failed', done => {
        getConsentsRequest.mockRejectedValue(new Error('Error'));
        const wrapper = mount(<ConsentsComponent publisherId="" />);
        wrapper.setProps({ publisherId: mockPublisherId });
        wrapper.update();
        expect(getConsentsRequest).toHaveBeenCalled();
        setImmediate(() => {
          expect(wrapper.state().consentDefinitions).toEqual([]);
          expect(wrapper.state().consentLoaded).toBe(false);
          expect(wrapper.state().consentsLabels).toEqual([]);
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
