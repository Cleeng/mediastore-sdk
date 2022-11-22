"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _react = _interopRequireDefault(require("react"));
var _react2 = require("@testing-library/react");
var _userEvent = _interopRequireDefault(require("@testing-library/user-event"));
require("@testing-library/jest-dom");
var _index = _interopRequireDefault(require("./index"));
describe('Checkbox component', function () {
  test('should render correctly without props', function () {
    (0, _react2.render)( /*#__PURE__*/_react.default.createElement(_index.default, null));
    expect(_react2.screen.getByRole('checkbox')).toBeInTheDocument();
  });
  test('should render correctly with children', function () {
    (0, _react2.render)( /*#__PURE__*/_react.default.createElement(_index.default, null, "Test label"));
    expect(_react2.screen.getByRole('checkbox')).toBeInTheDocument();
    expect(_react2.screen.getByRole('checkbox')).toHaveTextContent('Test label');
  });
  test('should render as radio button when isRadioButton prop is passed', function () {
    var _render = (0, _react2.render)( /*#__PURE__*/_react.default.createElement(_index.default, {
        isRadioButton: true
      })),
      container = _render.container;
    expect(_react2.screen.getByRole('checkbox')).toBeInTheDocument();
    expect(container.getElementsByClassName('msd__consents__frame--radio').length).toBe(1);
  });
  test('should be disabled when disabled prop is passed', function () {
    (0, _react2.render)( /*#__PURE__*/_react.default.createElement(_index.default, {
      disabled: true
    }));
    expect(_react2.screen.getByRole('checkbox')).toBeInTheDocument();
    expect(_react2.screen.getByRole('checkbox')).toHaveClass('msd__consents--disabled');
  });
  test('should be checked when checked prop is true', function () {
    (0, _react2.render)( /*#__PURE__*/_react.default.createElement(_index.default, {
      checked: true
    }));
    expect(_react2.screen.getByRole('checkbox')).toBeInTheDocument();
    expect(_react2.screen.getByTestId('checkmark')).toBeInTheDocument();
  });
  test('should be calling onClick when user click', /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
    var onClickFunction;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            onClickFunction = jest.fn();
            (0, _react2.render)( /*#__PURE__*/_react.default.createElement(_index.default, {
              onClickFn: onClickFunction
            }));
            _context.next = 4;
            return _userEvent.default.click(_react2.screen.getByRole('checkbox'));
          case 4:
            expect(_react2.screen.getByRole('checkbox')).toBeInTheDocument();
            expect(onClickFunction).toHaveBeenCalledTimes(1);
          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
});