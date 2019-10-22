import React from 'react';
import { shallow } from 'enzyme';
import Button from 'components/Button/Button';
import ThankYouPage from './ThankYouPage';

describe('<ThankYouPage/>', () => {
  const wrapper = shallow(<ThankYouPage />);

  describe('@renders', () => {
    it('should render initial state', () => {
      expect(wrapper.find(Button).exists()).toEqual(true);
    });
  });
});
