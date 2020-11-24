/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { mount } from 'enzyme';
import MyAccountInput from 'components/MyAccountInput';
import updateCustomerRequest from 'api/Customer/updateCustomer';
import { PureProfileDetails } from './ProfileDetails';

jest.mock('api/Customer/updateCustomer');

describe('<ProfileDetails/>', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  const defaultProps = {
    firstName: 'Username',
    lastName: 'Lastname',
    email: 'user@example.com'
  };
  const updatedProps = {
    firstName: 'Username2',
    lastName: 'Lastname2',
    email: 'user2@example.com',
    confirmationPassword: '123'
  };
  describe('@lifecycle', () => {
    it('should set state on componentDidMount', () => {
      const wrapper = mount(
        <PureProfileDetails {...defaultProps} isLoading={false} />
      );
      expect(wrapper.state().updated).toEqual(defaultProps);
    });
    it('should update state on componentDidUpdate', () => {
      const wrapper = mount(<PureProfileDetails {...defaultProps} />);
      wrapper.setProps(updatedProps);
      expect(wrapper.state().updated.firstName).toEqual(updatedProps.firstName);
      expect(wrapper.state().updated.lastName).toEqual(updatedProps.lastName);
      expect(wrapper.state().updated.email).toEqual(updatedProps.email);
    });
  });
  describe('@action', () => {
    it('should update state on input change', () => {
      const wrapper = mount(
        <PureProfileDetails {...defaultProps} isLoading={false} />
      );
      wrapper.setState({
        isSectionDisabled: false
      });
      const nameInput = wrapper.find(MyAccountInput).at(0);
      const lastNameInput = wrapper.find(MyAccountInput).at(1);
      const emailInput = wrapper.find(MyAccountInput).at(2);
      const passwordInput = wrapper.find(MyAccountInput).at(3);

      nameInput.props().onChange({
        target: { value: updatedProps.firstName }
      });
      lastNameInput.props().onChange({
        target: { value: updatedProps.lastName }
      });
      emailInput.props().onChange({
        target: { value: updatedProps.email }
      });
      passwordInput.props().onChange({
        target: { value: updatedProps.confirmationPassword }
      });
      expect(wrapper.state().updated).toEqual(updatedProps);
    });
    it('should clear state on Cancel button click', () => {
      const wrapper = mount(
        <PureProfileDetails {...defaultProps} isLoading={false} />
      );
      wrapper.setState({
        isSectionDisabled: false
      });
      const cancelButton = wrapper.find('button').at(0);

      cancelButton.simulate('click');
      expect(wrapper.state().isSectionDisabled).toBe(true);
      expect(wrapper.state().updated).toEqual({
        ...defaultProps,
        confirmationPassword: ''
      });
      expect(wrapper.state().errors.confirmationPassword).toBe('');
      expect(wrapper.state().errors.email).toBe('');
    });
    it('should change status on click Edit Profile button', () => {
      const wrapper = mount(<PureProfileDetails {...defaultProps} />);
      const button = wrapper.find('button').at(0);

      button.simulate('click');
      expect(wrapper.state().isSectionDisabled).toBe(false);
    });
  });
  describe('@submit', () => {
    it('should validate fields and set errors in state', () => {
      const wrapper = mount(<PureProfileDetails {...defaultProps} />);
      wrapper.setState({
        isSectionDisabled: false
      });
      const emailInput = wrapper.find(MyAccountInput).at(2);
      emailInput.props().onChange({
        target: { value: 'newUser@example.com' }
      });
      wrapper.instance().areEmailAndPasswordValid();
      expect(wrapper.state().errors.email).toBe('');
      expect(wrapper.state().errors.confirmationPassword).toBe(
        'Please confirm your password to proceed with changing your email address.'
      );
    });
    it('should set state on success', done => {
      const setCurrentUserMock = jest.fn();
      const responseObj = {
        email: updatedProps.email,
        firstName: updatedProps.firstName,
        lastName: updatedProps.lastName,
        country: 'GB',
        regDate: '2020-02-12 15:18:56',
        lastLoginDate: '2020-02-21 07:13:49',
        lastUserIp: '213.156.120.102',
        externalId: '',
        externalData: null
      };
      const preventDefaultMock = jest.fn();
      updateCustomerRequest.mockResolvedValue({
        responseData: responseObj,
        errors: []
      });
      const wrapper = mount(
        <PureProfileDetails
          {...defaultProps}
          isLoading={false}
          setCurrentUser={setCurrentUserMock}
        />
      );
      wrapper.setState({
        isSectionDisabled: false,
        updated: updatedProps
      });
      wrapper.instance().updateProfile({ preventDefault: preventDefaultMock });
      expect(wrapper.state().isSubmittingPending).toBe(true);
      setImmediate(() => {
        expect(wrapper.state().isSubmittingPending).toBe(false);
        expect(wrapper.state().isSectionDisabled).toBe(true);
        expect(setCurrentUserMock).toHaveBeenCalledWith(responseObj);
        done();
      });
    });
    it('should set errors when request faild', done => {
      const setCurrentUserMock = jest.fn();
      const preventDefaultMock = jest.fn();
      updateCustomerRequest.mockResolvedValue({
        errors: ['Incorrect e-mail']
      });
      const wrapper = mount(
        <PureProfileDetails
          {...defaultProps}
          setCurrentUser={setCurrentUserMock}
        />
      );
      wrapper.setState({
        isSectionDisabled: false,
        updatedEmail: updatedProps.email,
        updatedFirstName: updatedProps.firstName,
        updatedLastName: updatedProps.lastName,
        confirmationPassword: updatedProps.confirmationPassword
      });
      wrapper.instance().updateProfile({ preventDefault: preventDefaultMock });
      expect(wrapper.state().isSubmittingPending).toBe(true);
      setImmediate(() => {
        expect(wrapper.state().isSubmittingPending).toBe(false);
        expect(wrapper.state().errors.confirmationPassword).toEqual('');
        expect(wrapper.state().errors.email).toEqual('Incorrect e-mail');
        done();
      });
    });
  });
});
