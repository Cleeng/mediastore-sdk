/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import { shallow } from 'enzyme';
import 'jest-styled-components';
import { PureMyAccountError } from './MyAccountError';
import { IconStyled } from './MyAccountErrorStyled';

jest.mock('containers/labeling', () => () => Component => props => (
  <Component t={k => k} {...props} />
));
jest.mock('react-i18next', () => ({
  withTranslation: () => Component => props => (
    <Component t={k => k} {...props} />
  )
}));

describe('<MyAccountError/>', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe('@renders', () => {
    it('should render initial state', () => {
      const wrapper = shallow(<PureMyAccountError />);
      expect(wrapper.find(IconStyled).exists()).toBe(false);
    });
  });
});
