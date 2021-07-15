/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { mount } from 'enzyme';
import InnerPopupWrapper from './InnerPopupWrapper';
import { DotStyled, HeaderTitleStyled } from './InnerPopupWrapperStyled';
import 'jest-styled-components';

const defaultProps = {
  steps: 2,
  popupTitle: 'title',
  currentStep: 1,
  children: <p>mock</p>,
  isError: false
};
describe('<InnerPopupWrapper/>', () => {
  afterEach(() => jest.clearAllMocks());
  describe('@renders', () => {
    it('should render initial state', () => {
      const wrapper = mount(<InnerPopupWrapper {...defaultProps} />);
      expect(wrapper.find(DotStyled)).toHaveLength(2);
      expect(wrapper.find(HeaderTitleStyled).text()).toBe('title');
    });
  });
});
