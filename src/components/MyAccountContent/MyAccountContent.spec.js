import React from 'react';
import { shallow } from 'enzyme';
import MyAccountContent from './MyAccountContent';

describe('<MyAccountContent/>', () => {
  const wrapper = shallow(<MyAccountContent />);

  describe('@renders', () => {
    it('should render initial state', () => {
      expect(wrapper.prop('children')).toBe('');
    });
  });
});
