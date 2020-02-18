import React from 'react';
import PropTypes from 'prop-types';
import {
  CheckboxStyled,
  CheckFrameStyled,
  CheckMarkStyled,
  ConsentDefinitionStyled
} from './CheckboxStyled';

const Checkbox = ({ children, onClickFn, error, checked, required }) => (
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
    >
      {checked && <CheckMarkStyled />}
    </CheckFrameStyled>
    <ConsentDefinitionStyled dangerouslySetInnerHTML={{ __html: children }} />
  </CheckboxStyled>
);

Checkbox.propTypes = {
  checked: PropTypes.bool,
  required: PropTypes.bool,
  onClickFn: PropTypes.func,
  error: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
};

Checkbox.defaultProps = {
  error: '',
  checked: false,
  required: false,
  onClickFn: () => {},
  children: ''
};

export default Checkbox;
