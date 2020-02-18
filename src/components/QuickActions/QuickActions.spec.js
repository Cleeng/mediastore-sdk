import React from 'react';
import { mount } from 'enzyme';
import QuickActions from './QuickActions';
import { HeaderStyled } from './QuickActionsStyled';

describe('<QuickActions/>', () => {
  const wrapper = mount(<QuickActions />);

  describe('@renders', () => {
    it('should render initial state', () => {
      expect(wrapper.find(HeaderStyled)).toHaveLength(1);
    });
  });
});
