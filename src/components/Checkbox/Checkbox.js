import React from 'react';
import PropTypes from 'prop-types';
import {
  CheckboxStyled,
  CheckFrameStyled,
  CheckMarkStyled,
  ConsentDefinitionStyled
} from './CheckboxStyled';

const Checkbox = ({
  children,
  onClickFn,
  error,
  checked,
  required,
  isMyAccount
}) => (
  <CheckboxStyled
    onClick={onClickFn}
    role="checkbox"
    tabIndex="-1"
    aria-checked="false"
    checked={checked}
    aria-label={children}
  >
    <CheckFrameStyled
      error={error && required && !checked}
      tabIndex="0"
      onKeyDown={e => {
        return e.keyCode === 32 ? onClickFn() : null;
      }}
      isMyAccount={isMyAccount}
      checked={checked}
    >
      {checked && <CheckMarkStyled isMyAccount={isMyAccount} />}
    </CheckFrameStyled>
    <ConsentDefinitionStyled
      dangerouslySetInnerHTML={{ __html: children }}
      checked={checked}
    />
  </CheckboxStyled>
);

Checkbox.propTypes = {
  checked: PropTypes.bool,
  required: PropTypes.bool,
  onClickFn: PropTypes.func,
  error: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  isMyAccount: PropTypes.bool
};

Checkbox.defaultProps = {
  error: '',
  checked: false,
  required: false,
  onClickFn: () => {},
  children: '',
  isMyAccount: false
};

export default Checkbox;
