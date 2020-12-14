/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { mount } from 'enzyme';
import { PureInnerPopupWrapper } from './InnerPopupWrapper';
import { DotStyled, HeaderTitleStyled } from './InnerPopupWrapperStyled';
import 'jest-styled-components';

jest.mock('containers/labeling', () => () => Component => props => (
  <Component t={k => k} {...props} />
));
jest.mock('react-i18next', () => ({
  withTranslation: () => Component => props => (
    <Component t={k => k} {...props} />
  )
}));
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
      const wrapper = mount(<PureInnerPopupWrapper {...defaultProps} />);
      expect(wrapper.find(DotStyled)).toHaveLength(2);
      expect(wrapper.find(HeaderTitleStyled).text()).toBe('title');
    });
  });
});
