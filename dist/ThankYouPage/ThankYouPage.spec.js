"use strict";

var _interopRequireDefault = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

var _Button = _interopRequireDefault(require("components/Button"));

var _testComponentHelper = require("test/testComponentHelper");

var _ThankYouPage = _interopRequireDefault(require("./ThankYouPage"));

/* eslint-disable react/jsx-props-no-spreading */
var renderComponent = (0, _testComponentHelper.mountComponentHelper)(_ThankYouPage.default);
describe('<ThankYouPage/>', function () {
  var _renderComponent = renderComponent(),
      wrapper = _renderComponent.wrapper;

  describe('@renders', function () {
    it('should render initial state', function () {
      expect(wrapper.find(_Button.default).exists()).toEqual(true);
    });
  });
});