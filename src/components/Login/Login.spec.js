import React from 'react';
import { shallow } from 'enzyme';
import Login from './Login';
import Button from '../Button/Button';

describe('Login', () => {
  it('renders', () => {
    const wrapper = shallow(<Login onLoginComplete={jest.fn()} />);
    expect(wrapper.find(Button)).toHaveLength(1);
  });
});
