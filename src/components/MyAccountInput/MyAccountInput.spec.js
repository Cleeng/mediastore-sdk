import React from 'react';
import { shallow } from 'enzyme';
import MyAccountInput from './MyAccountInput';
import { WrapStyled } from './MyAccountInputStyled';

describe('<MyAccountInput/>', () => {
  describe('@renders', () => {
    it('should render initial state', () => {
      const wrapper = shallow(<MyAccountInput />);
      expect(wrapper.find(WrapStyled)).toHaveLength(1);
    });
  });
});
