"use strict";

var _interopRequireDefault = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

var _objectSpread2 = _interopRequireDefault(require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectSpread2"));

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _MyAccountInput = _interopRequireDefault(require("components/MyAccountInput"));

var _updateCustomer = _interopRequireDefault(require("api/Customer/updateCustomer"));

var _updateCaptureAnswers = _interopRequireDefault(require("api/Customer/updateCaptureAnswers"));

var _ProfileDetails = require("./ProfileDetails");

/* eslint-disable react/jsx-props-no-spreading */
jest.mock('api/Customer/updateCustomer');
jest.mock('api/Customer/updateCaptureAnswers');
describe('<ProfileDetails/>', function () {
  afterEach(function () {
    jest.clearAllMocks();
  });
  var defaultProps = {
    firstName: 'Username',
    lastName: 'Lastname',
    email: 'user@example.com',
    birthDate: {
      key: 'birthDate',
      enabled: true,
      required: true,
      answer: '2000-02-02'
    },
    phoneNumber: {
      key: 'phoneNumber',
      enabled: true,
      required: true,
      answer: '123123123'
    },
    companyName: {
      key: 'companyName',
      enabled: true,
      required: true,
      answer: 'test company'
    }
  };
  var updatedProps = {
    firstName: 'Username2',
    lastName: 'Lastname2',
    email: 'user2@example.com',
    confirmationPassword: '123',
    birthDate: {
      key: 'birthDate',
      enabled: true,
      required: true,
      answer: '2000-02-02'
    },
    phoneNumber: {
      key: 'phoneNumber',
      enabled: true,
      required: true,
      answer: '123123123'
    },
    companyName: {
      key: 'companyName',
      enabled: true,
      required: true,
      answer: 'test company'
    }
  };
  describe('@lifecycle', function () {
    it('should set state on componentDidMount', function () {
      var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_ProfileDetails.PureProfileDetails, Object.assign({}, defaultProps, {
        isLoading: false
      })));
      expect(wrapper.state().updated.firstName).toEqual(defaultProps.firstName);
      expect(wrapper.state().updated.lastName).toEqual(defaultProps.lastName);
      expect(wrapper.state().updated.email).toEqual(defaultProps.email);
      expect(wrapper.state().updated.birthDate).toEqual(updatedProps.birthDate.answer);
      expect(wrapper.state().updated.phoneNumber).toEqual(updatedProps.phoneNumber.answer);
      expect(wrapper.state().updated.companyName).toEqual(updatedProps.companyName.answer);
    });
    it('should update state on componentDidUpdate', function () {
      var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_ProfileDetails.PureProfileDetails, defaultProps));
      wrapper.setProps(updatedProps);
      expect(wrapper.state().updated.firstName).toEqual(updatedProps.firstName);
      expect(wrapper.state().updated.lastName).toEqual(updatedProps.lastName);
      expect(wrapper.state().updated.email).toEqual(updatedProps.email);
      expect(wrapper.state().updated.birthDate).toEqual(updatedProps.birthDate.answer);
      expect(wrapper.state().updated.phoneNumber).toEqual(updatedProps.phoneNumber.answer);
      expect(wrapper.state().updated.companyName).toEqual(updatedProps.companyName.answer);
    });
  });
  describe('@action', function () {
    it('should update state on input change', function () {
      var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_ProfileDetails.PureProfileDetails, Object.assign({}, defaultProps, {
        isLoading: false
      })));
      wrapper.setState({
        isSectionDisabled: false
      });
      var nameInput = wrapper.find(_MyAccountInput.default).at(0);
      var lastNameInput = wrapper.find(_MyAccountInput.default).at(1);
      var emailInput = wrapper.find(_MyAccountInput.default).at(2);
      var passwordInput = wrapper.find(_MyAccountInput.default).at(3);
      var birthDateInput = wrapper.find(_MyAccountInput.default).at(4);
      var phoneNumberInput = wrapper.find(_MyAccountInput.default).at(5);
      var companyNumberInput = wrapper.find(_MyAccountInput.default).at(6);
      nameInput.props().onChange({
        target: {
          value: updatedProps.firstName
        }
      });
      lastNameInput.props().onChange({
        target: {
          value: updatedProps.lastName
        }
      });
      emailInput.props().onChange({
        target: {
          value: updatedProps.email
        }
      });
      passwordInput.props().onChange({
        target: {
          value: updatedProps.confirmationPassword
        }
      });
      birthDateInput.props().onChange({
        target: {
          value: updatedProps.birthDate.answer
        }
      });
      phoneNumberInput.props().onChange({
        target: {
          value: updatedProps.phoneNumber.answer
        }
      });
      companyNumberInput.props().onChange({
        target: {
          value: updatedProps.companyName.answer
        }
      });
      expect(wrapper.state().updated.firstName).toEqual(updatedProps.firstName);
      expect(wrapper.state().updated.lastName).toEqual(updatedProps.lastName);
      expect(wrapper.state().updated.email).toEqual(updatedProps.email);
      expect(wrapper.state().updated.birthDate).toEqual(updatedProps.birthDate.answer);
      expect(wrapper.state().updated.phoneNumber).toEqual(updatedProps.phoneNumber.answer);
      expect(wrapper.state().updated.companyName).toEqual(updatedProps.companyName.answer);
    });
    it('should clear state on Cancel button click', function () {
      var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_ProfileDetails.PureProfileDetails, Object.assign({}, defaultProps, {
        isLoading: false
      })));
      wrapper.setState({
        isSectionDisabled: false
      });
      var cancelButton = wrapper.find('button').at(0);
      cancelButton.simulate('click');
      expect(wrapper.state().isSectionDisabled).toBe(true);
      expect(wrapper.state().updated.confirmationPassword).toEqual('');
      expect(wrapper.state().updated.firstName).toEqual(defaultProps.firstName);
      expect(wrapper.state().updated.lastName).toEqual(defaultProps.lastName);
      expect(wrapper.state().updated.email).toEqual(defaultProps.email);
      expect(wrapper.state().updated.birthDate).toEqual(updatedProps.birthDate.answer);
      expect(wrapper.state().updated.phoneNumber).toEqual(updatedProps.phoneNumber.answer);
      expect(wrapper.state().updated.companyName).toEqual(updatedProps.companyName.answer);
      expect(wrapper.state().errors.confirmationPassword).toBe('');
      expect(wrapper.state().errors.email).toBe('');
    });
    it('should change status on click Edit Profile button', function () {
      var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_ProfileDetails.PureProfileDetails, defaultProps));
      var button = wrapper.find('button').at(0);
      button.simulate('click');
      expect(wrapper.state().isSectionDisabled).toBe(false);
    });
  });
  describe('@submit', function () {
    it('should validate fields and set errors in state', function () {
      var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_ProfileDetails.PureProfileDetails, defaultProps));
      wrapper.setState({
        isSectionDisabled: false
      });
      var emailInput = wrapper.find(_MyAccountInput.default).at(2);
      emailInput.props().onChange({
        target: {
          value: 'newUser@example.com'
        }
      });
      wrapper.instance().areEmailAndPasswordValid();
      expect(wrapper.state().errors.email).toBe('');
      expect(wrapper.state().errors.confirmationPassword).toBe('Please confirm your password to proceed with changing your email address.');
    });
    it('should set state on success', function (done) {
      var setCurrentUserMock = jest.fn();
      var responseObj = {
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
      var preventDefaultMock = jest.fn();

      _updateCustomer.default.mockResolvedValue({
        responseData: responseObj,
        errors: []
      });

      var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_ProfileDetails.PureProfileDetails, Object.assign({}, defaultProps, {
        isLoading: false,
        setCurrentUser: setCurrentUserMock
      })));
      wrapper.setState({
        isSectionDisabled: false,
        updated: (0, _objectSpread2.default)((0, _objectSpread2.default)({}, updatedProps), {}, {
          birthDate: updatedProps.birthDate.answer,
          phoneNumber: updatedProps.phoneNumber.answer,
          companyName: updatedProps.companyName.answer
        })
      });

      _updateCaptureAnswers.default.mockResolvedValue({
        responseData: {
          success: true
        },
        errors: []
      });

      wrapper.instance().updateProfile({
        preventDefault: preventDefaultMock
      });
      expect(wrapper.state().isSubmittingPending).toBe(true);
      setImmediate(function () {
        expect(wrapper.state().isSubmittingPending).toBe(false);
        expect(wrapper.state().isSectionDisabled).toBe(true);
        expect(setCurrentUserMock).toHaveBeenCalledWith(responseObj);
        done();
      });
    });
    it('should set errors when request faild', function (done) {
      var setCurrentUserMock = jest.fn();
      var preventDefaultMock = jest.fn();

      _updateCustomer.default.mockResolvedValue({
        errors: ['Incorrect e-mail']
      });

      _updateCaptureAnswers.default.mockResolvedValue({
        responseData: {
          success: true
        },
        errors: []
      });

      var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_ProfileDetails.PureProfileDetails, Object.assign({}, defaultProps, {
        setCurrentUser: setCurrentUserMock
      })));
      wrapper.setState({
        isSectionDisabled: false,
        updatedEmail: updatedProps.email,
        updatedFirstName: updatedProps.firstName,
        updatedLastName: updatedProps.lastName,
        confirmationPassword: updatedProps.confirmationPassword
      });
      wrapper.instance().updateProfile({
        preventDefault: preventDefaultMock
      });
      expect(wrapper.state().isSubmittingPending).toBe(true);
      setImmediate(function () {
        expect(wrapper.state().isSubmittingPending).toBe(false);
        expect(wrapper.state().errors.confirmationPassword).toEqual('');
        expect(wrapper.state().errors.email).toEqual('Incorrect e-mail');
        done();
      });
    });
  });
});