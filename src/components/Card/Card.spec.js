import React from 'react';
import { shallow } from 'enzyme';
import Card from './Card';
import { WrapStyled } from './CardStyled';

describe('<Card/>', () => {
  describe('@renders', () => {
    it('should render initial state', () => {
      const wrapper = shallow(<Card />);
      expect(wrapper.find(WrapStyled)).toHaveLength(1);
    });
  });
});
