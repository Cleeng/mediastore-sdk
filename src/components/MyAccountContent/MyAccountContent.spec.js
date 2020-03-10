import React from 'react';
import { mount } from 'enzyme';
import MyAccountContent from './MyAccountContent';

describe('<MyAccountContent/>', () => {
  const wrapper = mount(<MyAccountContent />);

  describe('@renders', () => {
    it('should render initial state', () => {
      expect(wrapper.prop('children')).toBe('');
    });
  });
});
