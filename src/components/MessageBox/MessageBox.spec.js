/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import { shallow } from 'enzyme';
import 'jest-styled-components';
import MessageBox from './MessageBox';
import {
  MessageBoxIconWrapStyled,
  MessageBoxMessageStyled
} from './MessageBoxStyled';

const message = 'test message';
const type = 'test type';

describe('<MessageBox/>', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe('@renders', () => {
    it('should render initial state', () => {
      const wrapper = shallow(<MessageBox message={message} type={type} />);

      expect(wrapper.find(MessageBoxIconWrapStyled)).toHaveLength(1);
      expect(wrapper.find(MessageBoxMessageStyled)).toHaveLength(1);
    });
  });
});
