import React from 'react';
import { shallow } from 'enzyme';
import Button from 'components/Button/Button';
import Login from './Login';

describe('Login', () => {
  it('renders', () => {
    const wrapper = shallow(<Login onLoginComplete={jest.fn()} />);
    expect(wrapper.find(Button)).toHaveLength(1);
  });
});
