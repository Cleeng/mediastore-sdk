"use strict";

var _interopRequireDefault = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

require("jest-styled-components");

var _Input = _interopRequireDefault(require("./Input"));

var _InputStyled = require("./InputStyled");

jest.useFakeTimers();
describe('Input', function () {
  describe('@renders', function () {
    it('should render initial state', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_Input.default, null));
      var inputElement = wrapper.find(_InputStyled.InputElementStyled);
      expect(inputElement).toHaveLength(1);
      expect(inputElement.props().type).toBe('text');
      expect(inputElement.props().autoComplete).toBe('off');
    });
  });
  describe('@events', function () {
    it('should call onChange cb when input change', function () {
      var onChangeMock = jest.fn();
      var MockInputValue = 'MOCKVALUE';
      var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_Input.default, {
        onChange: onChangeMock
      }));
      var input = wrapper.find(_InputStyled.InputElementStyled);
      input.simulate('change', {
        target: {
          value: MockInputValue
        }
      });
      expect(onChangeMock).toHaveBeenCalledWith(MockInputValue);
    });
  });
});