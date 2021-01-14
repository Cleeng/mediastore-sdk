/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import { shallow } from 'enzyme';
import 'jest-styled-components';
import { PureSubscriptionManagement as SubscriptionManagement } from './SubscriptionManagement';
import {
  ManageButtonWrapStyled,
  SubscriptionActionsStyled
} from './SubscriptionManagementStyled';

describe('<MessageBox/>', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe('@renders', () => {
    it('should render initial state', () => {
      const wrapper = shallow(<SubscriptionManagement />);

      expect(wrapper.find(ManageButtonWrapStyled)).toHaveLength(1);
      expect(wrapper.find(SubscriptionActionsStyled)).toHaveLength(0);
    });
    it('should render children when isOpened prop is true', () => {
      // eslint-disable-next-line react/jsx-boolean-value
      const wrapper = shallow(<SubscriptionManagement isOpened={true} />);

      expect(wrapper.find(SubscriptionActionsStyled)).toHaveLength(1);
    });
  });
});
