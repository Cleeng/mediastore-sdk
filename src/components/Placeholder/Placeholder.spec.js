import React from 'react';
import { shallow } from 'enzyme';
import Placeholder from './Placeholder';

describe('Placeholder', () => {
  it('renders with label', () => {
    const label = 'MY_LABEL';
    const wrapper = shallow(<Placeholder label={label} />);
    expect(wrapper.text()).toMatch(label);
  });
});
