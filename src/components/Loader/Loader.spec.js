import { shallow } from 'enzyme';
import React from 'react';
import Loader from './Loader';
import { LoaderStyled } from './LoaderStyled';

describe('<Loader/>', () => {
  describe('@renders', () => {
    it('should render initial state', () => {
      const wrapper = shallow(<Loader />);
      const loaderElement = wrapper.find(LoaderStyled);
      expect(loaderElement).toHaveLength(1);
    });
  });
});
