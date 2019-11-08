import React from 'react';
import { shallow } from 'enzyme';
import ErrorPage from './ErrorPage';
import { IconStyled } from './ErrorPageStyled';

const mockErrorType = 'offerNotExist';

describe('ErrorPage', () => {
  describe('@renders', () => {
    it('renders whoops page on default', () => {
      const wrapper = shallow(<ErrorPage />);
      expect(wrapper.text()).toMatch('Whoops');
      expect(wrapper.find(IconStyled).exists()).toBe(true);
    });
    it('renders specified type of error', () => {
      const wrapper = shallow(<ErrorPage type={mockErrorType} />);
      expect(wrapper.text()).toMatch('Offer does not exist.');
      expect(wrapper.find(IconStyled).exists()).toBe(true);
    });
    it('renders error message ', () => {
      const errorMessage = 'Some error';
      const wrapper = shallow(<ErrorPage error={errorMessage} />);
      expect(wrapper.text()).toMatch(errorMessage);
    });
  });
});
