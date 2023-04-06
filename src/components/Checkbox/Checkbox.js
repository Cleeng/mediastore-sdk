import React, { useEffect, useState } from 'react';
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
  isMyAccount,
  className,
  disabled,
  isRadioButton
}) => {
  const [isChecked, setIsChecked] = useState(checked);

  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  return (
    <CheckboxStyled
      onClick={e => onClickFn(e, disabled, setIsChecked)}
      role="checkbox"
      tabIndex="-1"
      aria-checked={isChecked}
      checked={isChecked}
      aria-label={children}
      className={className}
      disabled={disabled}
    >
      <CheckFrameStyled
        error={error && required && !isChecked}
        tabIndex="0"
        onKeyDown={e => (e.keyCode === 32 ? onClickFn() : null)}
        isMyAccount={isMyAccount}
        isRadioButton={isRadioButton}
        checked={isChecked}
      >
        {isChecked && (
          <CheckMarkStyled
            data-testid="checkmark"
            isMyAccount={isMyAccount}
            isRadioButton={isRadioButton}
          />
        )}
      </CheckFrameStyled>
      <ConsentDefinitionStyled
        dangerouslySetInnerHTML={{
          __html: `${children}${required && isMyAccount ? '*' : ''}`
        }}
        checked={isChecked}
      />
    </CheckboxStyled>
  );
};

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
