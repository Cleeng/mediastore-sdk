"use strict";

var _interopRequireDefault = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _welcome = _interopRequireDefault(require("./images/welcome.svg"));

var _icon_terms = _interopRequireDefault(require("./images/icon_terms.svg"));

var popupData = {
  notCheckedTerms: {
    steps: [{
      headerTitle: 'Terms & Conditions',
      icon: _welcome.default,
      title: 'Hi there!',
      text: 'Your brand new account is waiting for you. Just one last step. We would like you to review our terms and conditions before continuing to your account.',
      buttonText: 'Let’s do it',
      buttonAction: 'renderNextStep'
    }, {
      headerTitle: 'Terms & Conditions',
      icon: _welcome.default,
      title: 'Terms & Conditions',
      text: 'Please accept our terms and conditions before continuing to your account.',
      buttonText: 'Continue',
      buttonAction: 'handleSubmitConsents'
    }]
  },
  termsUpdateRequired: {
    steps: [{
      headerTitle: 'Terms update',
      icon: _icon_terms.default,
      title: 'A change in our terms',
      text: 'One of our mandatory terms has been updated. Review the changes to continue.',
      buttonText: 'Okey, Go next',
      buttonAction: 'renderNextStep'
    }, {
      headerTitle: 'Terms update',
      icon: null,
      title: 'Update to terms & conditions',
      text: 'Please review and accept our updated terms and conditions before continuing to your account.',
      buttonText: 'Continue',
      buttonAction: 'handleSubmitConsents'
    }]
  },
  consentsUpdateRequired: {
    steps: [{
      headerTitle: 'Terms update',
      icon: _icon_terms.default,
      title: 'Update to terms & conditions',
      text: "We have updated our terms and conditions. Please take a few minutes to review the changes in your profile section.",
      buttonText: 'Continue',
      buttonAction: 'handleSubmitConsents'
    }]
  },
  complexUpdate: {
    steps: [{
      headerTitle: 'Terms update',
      icon: _icon_terms.default,
      title: 'A change in our terms',
      text: "One of our mandatory terms has been updated. We\u2019ve also updated our Consents Details which you can find in Update Profile tab.",
      secondText: 'Review the changes to continue.',
      buttonText: 'Okey, Go next!',
      buttonAction: 'renderNextStep'
    }, {
      headerTitle: 'Terms update',
      icon: null,
      title: 'Update to terms & conditions',
      text: "Please review and accept our updated terms and conditions before continuing to your account.",
      buttonText: 'Continue',
      buttonAction: 'handleSubmitConsents'
    }]
  }
};
var _default = popupData;
exports.default = _default;