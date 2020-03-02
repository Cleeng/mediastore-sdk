import React from 'react';
import { shallow } from 'enzyme';
import MyAccountInput from 'components/MyAccountInput/MyAccountInput';
import Password from './Password';
import { WrapStyled, MyAccountButtonStyled } from './PasswordStyled';

describe('<Password/>', () => {
  describe('@renders', () => {
    it('should render initial state', () => {
      const wrapper = shallow(<Password />);
      expect(wrapper.find(WrapStyled)).toHaveLength(1);
      expect(wrapper.find(MyAccountInput)).toHaveLength(3);
      expect(wrapper.find(MyAccountButtonStyled)).toHaveLength(1);
    });
  });
});
