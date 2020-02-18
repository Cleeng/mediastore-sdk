import React from 'react';
import { mount } from 'enzyme';
import UpdateProfile from './UpdateProfile';
import { HeaderStyled } from './UpdateProfileStyled';

describe('<UpdateProfile/>', () => {
  const wrapper = mount(<UpdateProfile />);

  describe('@renders', () => {
    it('should render initial state', () => {
      expect(wrapper.find(HeaderStyled)).toHaveLength(1);
    });
  });
});
