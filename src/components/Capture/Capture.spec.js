/* eslint-disable no-unused-vars */
import React from 'react';
import { mount } from 'enzyme';
import Header from 'components/Header';
import Footer from 'components/Footer';
import Capture from './Capture';
import {
  CaptureStyled,
  CaptureContentStyled,
  CaptureTitle
} from './CaptureStyled';

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
    it('should render initial state', () => {
      const wrapper = mount(
        <Capture settings={captureSettings} redirectUrl={redirectUrl} />
      );
      const header = wrapper.find(Header);
      const footer = wrapper.find(Footer);

      expect(wrapper.props().settings).toBe(captureSettings);
      expect(wrapper.props().redirectUrl).toBe(redirectUrl);
      expect(header).toHaveLength(1);
      expect(footer).toHaveLength(1);
    });
  });
});
