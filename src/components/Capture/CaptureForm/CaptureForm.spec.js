import React from 'react';
import { mount } from 'enzyme';
import CaptureForm from './CaptureForm';

const captureSettings = [
  {
    key: 'email',
    enabled: true,
    required: true,
    answer: 'test@test.com'
  },
  {
    key: 'firstNameLastName',
    enabled: true,
    required: true,
    answer: {
      firstName: null,
      lastName: null
    }
  },
  {
    key: 'birthDate',
    enabled: true,
    required: true,
    answer: null
  },
  {
    key: 'companyName',
    enabled: false,
    required: false,
    answer: null
  },
  {
    key: 'phoneNumber',
    enabled: true,
    required: true,
    answer: null
  },
  {
    key: 'address',
    enabled: false,
    required: true,
    answer: {
      address: null,
      address2: null,
      city: null,
      state: null,
      postCode: null,
      country: null
    }
  },
  {
    key: 'custom_1',
    enabled: true,
    required: true,
    value: 'option_1;option_2;option_3',
    question: 'What is the best option?',
    answer: null
  }
];

const redirectUrl = '/offer';

describe('Capture', () => {
  describe('@renders', () => {
    it('should render initial state without passed props', () => {
      const wrapper = mount(<CaptureForm />);

      expect(wrapper.props().settings).toStrictEqual([]);
      expect(wrapper.props().redirectUrl).toBe('');
    });
    it('should render initial state with passed props', () => {
      const wrapper = mount(
        <CaptureForm settings={captureSettings} redirectUrl={redirectUrl} />
      );

      expect(wrapper.props().settings).toStrictEqual(captureSettings);
      expect(wrapper.props().redirectUrl).toBe(redirectUrl);
    });
  });
});
