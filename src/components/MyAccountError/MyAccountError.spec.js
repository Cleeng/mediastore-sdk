/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import { shallow } from 'enzyme';
import 'jest-styled-components';
import MyAccountError from './MyAccountError';
import { IconStyled } from './MyAccountErrorStyled';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: key => key
  })
}));

describe('<MyAccountError/>', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe('@renders', () => {
    it('should render initial state', () => {
      const wrapper = shallow(<MyAccountError />);
      expect(wrapper.find(IconStyled).exists()).toBe(false);
    });
  });
});
