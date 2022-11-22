"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _react = _interopRequireDefault(require("react"));
var _react2 = require("@testing-library/react");
var _userEvent = _interopRequireDefault(require("@testing-library/user-event"));
require("@testing-library/jest-dom");
var _index = _interopRequireDefault(require("./index"));
describe('Input component', function () {
  test('should render correctly without props', function () {
    (0, _react2.render)( /*#__PURE__*/_react.default.createElement(_index.default, null));
    expect(_react2.screen.getByTestId('input')).toBeInTheDocument();
  });
  test('should have correct id and label when placeholder is passed', function () {
    var testPlaceholder = 'test-input';
    (0, _react2.render)( /*#__PURE__*/_react.default.createElement(_index.default, {
      placeholder: testPlaceholder
    }));
    var inputEl = _react2.screen.getByTestId('input');
    var inputLabelEl = _react2.screen.getByTestId('input-label');
    expect(inputEl).toBeInTheDocument();
    expect(inputEl).toHaveAttribute('id', testPlaceholder);
    expect(inputLabelEl).toBeInTheDocument();
    expect(inputLabelEl).toHaveTextContent(testPlaceholder);
  });
  test('should show visibility icon when showVisibilityIcon is passed', function () {
    (0, _react2.render)( /*#__PURE__*/_react.default.createElement(_index.default, {
      showVisibilityIcon: true
    }));
    expect(_react2.screen.getByTestId('input')).toBeInTheDocument();
    expect(_react2.screen.getByTestId('input-visibility-icon')).toBeInTheDocument();
  });
  test('should be calling passed onChange function when user change something', /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
    var onChangeFunction;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            onChangeFunction = jest.fn();
            (0, _react2.render)( /*#__PURE__*/_react.default.createElement(_index.default, {
              onChange: onChangeFunction
            }));
            _context.next = 4;
            return _userEvent.default.type(_react2.screen.getByTestId('input'), 'Text');
          case 4:
            expect(onChangeFunction).toHaveBeenCalledTimes(4);
          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  test('should be calling passed handleClickShowPassword function when user click on toggle button', /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
    var showPasswordFunction;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            showPasswordFunction = jest.fn();
            (0, _react2.render)( /*#__PURE__*/_react.default.createElement(_index.default, {
              showVisibilityIcon: true,
              handleClickShowPassword: showPasswordFunction
            }));
            expect(_react2.screen.getByTestId('input-visibility-icon')).toBeInTheDocument();
            _context2.next = 5;
            return _userEvent.default.click(_react2.screen.getByTestId('input-visibility-icon'));
          case 5:
            expect(showPasswordFunction).toHaveBeenCalledTimes(1);
          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  })));
});