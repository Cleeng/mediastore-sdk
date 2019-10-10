import React from 'react';
import { shallow } from 'enzyme';
import ThankYouPage from './ThankYouPage';
import Button from '../Button/Button';

describe('<ThankYouPage/>', () => {
  const wrapper = shallow(<ThankYouPage />);

  describe('@renders', () => {
    it('should render initial state', () => {
      expect(wrapper.find(Button).exists()).toEqual(true);
    });
  });
});
