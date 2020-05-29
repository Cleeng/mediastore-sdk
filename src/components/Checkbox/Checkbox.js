import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  CheckboxStyled,
  CheckFrameStyled,
  CheckMarkStyled,
  ConsentDefinitionStyled
} from './CheckboxStyled';

class Checkbox extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      children,
      onClickFn,
      error,
      checked,
      required,
      isMyAccount,
      className,
      disabled,
      isRadioButton
    } = this.props;
    return (
      <CheckboxStyled
        onClick={e => onClickFn(e, disabled)}
        role="checkbox"
        tabIndex="-1"
        aria-checked="false"
        checked={checked}
        aria-label={children}
        className={className}
        disabled={disabled}
      >
        <CheckFrameStyled
          error={error && required && !checked}
          tabIndex="0"
          onKeyDown={e => {
            return e.keyCode === 32 ? onClickFn() : null;
          }}
          isMyAccount={isMyAccount}
          isRadioButton={isRadioButton}
          checked={checked}
        >
          {checked && (
            <CheckMarkStyled
              isMyAccount={isMyAccount}
              isRadioButton={isRadioButton}
            />
          )}
        </CheckFrameStyled>
        <ConsentDefinitionStyled
          dangerouslySetInnerHTML={{
            __html: `${children}${required && isMyAccount ? '*' : ''}`
          }}
          checked={checked}
        />
      </CheckboxStyled>
    );
  }
}

Checkbox.propTypes = {
  checked: PropTypes.bool,
  required: PropTypes.bool,
  onClickFn: PropTypes.func,
  error: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  isMyAccount: PropTypes.bool,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  isRadioButton: PropTypes.bool
};

Checkbox.defaultProps = {
  error: '',
  checked: false,
  required: false,
  onClickFn: () => {},
  children: '',
  isMyAccount: false,
  className: '',
  disabled: false,
  isRadioButton: false
};

export default Checkbox;
