import React from 'react';
import { shallow } from 'enzyme';
import MyAccountUserInfo from './MyAccountUserInfo';
import { DetailsStyled, PhotoStyled } from './MyAccountUserInfoStyled';

describe('<MyAccountUserInfo/>', () => {
  const wrapper = shallow(<MyAccountUserInfo />);

  describe('@renders', () => {
    it('should render initial state', () => {
      expect(wrapper.find(DetailsStyled)).toHaveLength(1);
      expect(wrapper.find(PhotoStyled)).toHaveLength(1);
    });
  });
});
