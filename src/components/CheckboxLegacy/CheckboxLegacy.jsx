import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import {
  CheckboxStyled,
  CheckFrameStyled,
  CheckMarkStyled,
  ConsentDefinitionStyled,
  HiddenCheckboxInput,
  TermsLinkStyled
} from './CheckboxLegacyStyled';

const CheckboxLegacy = ({
  children,
  onClickFn,
  error,
  checked,
  required,
  isMyAccount,
  className,
  disabled,
  isRadioButton,
  termsUrl,
  isPayPal,
  id
}) => {
  const [isChecked, setIsChecked] = useState(checked);
  const { t } = useTranslation();

  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  const spaceKey = ' ';

  return (
    <>
      <CheckboxStyled
        onClick={(e) => {
          e.stopPropagation();
          onClickFn(e, disabled, setIsChecked);
        }}
        tabIndex='-1'
        aria-checked={isChecked}
        checked={isChecked}
        aria-label={children}
        className={className}
        $disabled={disabled}
        data-testid='checkbox-legacy'
      >
        <HiddenCheckboxInput
          id={id}
          type='checkbox'
          checked={isChecked}
          disabled={disabled}
          required={required}
        />
        <CheckFrameStyled
          $error={error && required && !isChecked}
          tabIndex='0'
          checked={isChecked}
          onKeyDown={(e) =>
            e.key === spaceKey ? onClickFn(e, disabled, setIsChecked) : null
          }
          $isMyAccount={isMyAccount}
          $isRadioButton={isRadioButton}
          $checked={isChecked}
        >
          {isChecked && (
            <CheckMarkStyled
              data-testid='checkmark'
              $isMyAccount={isMyAccount}
              $isRadioButton={isRadioButton}
            />
          )}
        </CheckFrameStyled>
        <ConsentDefinitionStyled
          dangerouslySetInnerHTML={{
            __html: `${children}${required && isMyAccount ? '*' : ''}`
          }}
          $checked={isChecked}
        />
      </CheckboxStyled>
      {termsUrl && (
        <TermsLinkStyled
          href={termsUrl}
          target='_blank'
          rel='noreferrer'
          $checked={isChecked}
          $isPayPal={isPayPal}
        >
          {t('checkbox.terms-link', 'Terms & Conditions')}
        </TermsLinkStyled>
      )}
    </>
  );
};

CheckboxLegacy.propTypes = {
  checked: PropTypes.bool,
  required: PropTypes.bool,
  onClickFn: PropTypes.func,
  error: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  isMyAccount: PropTypes.bool,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  isRadioButton: PropTypes.bool,
  termsUrl: PropTypes.string,
  isPayPal: PropTypes.bool,
  id: PropTypes.string
};

CheckboxLegacy.defaultProps = {
  error: '',
  checked: false,
  required: false,
  onClickFn: (t) => t,
  children: '',
  isMyAccount: false,
  className: '',
  disabled: false,
  isRadioButton: false,
  termsUrl: '',
  isPayPal: false,
  id: null
};

export default CheckboxLegacy;
