import React from 'react';
import { mount } from 'enzyme';
import SectionHeader from './SectionHeader';

describe('<SectionHeader/>', () => {
  describe('@renders', () => {
    it('should render initial state', () => {
      const wrapper = mount(<SectionHeader>Test</SectionHeader>);
      expect(wrapper.prop('center')).toBe(false);
      expect(wrapper.text()).toEqual('Test');
    });
    it('should set center prop if passed', () => {
      const wrapper = mount(<SectionHeader center />);
      expect(wrapper.prop('center')).toBe(true);
    });
  });
});
