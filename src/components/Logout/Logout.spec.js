import { mount } from 'enzyme';
import React from 'react';
import Auth from 'services/auth';
import { PureLogout } from './Logout';

describe('<Logout/>', () => {
  it('should call logout fn on click', () => {
    Auth.logout = jest.fn();
    const wrapper = mount(<PureLogout />);
    wrapper.find('button').simulate('click');
    expect(Auth.logout).toHaveBeenCalledTimes(1);
  });
});
