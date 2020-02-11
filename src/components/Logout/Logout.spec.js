import { mount } from 'enzyme';
import React from 'react';
import Logout from './Logout';
import Auth from '../../services/auth';

describe('<Logout/>', () => {
  it('should call logout fn on click', () => {
    Auth.logout = jest.fn();
    const wrapper = mount(<Logout />);
    wrapper.find('button').simulate('click');
    expect(Auth.logout).toHaveBeenCalledTimes(1);
  });
});
