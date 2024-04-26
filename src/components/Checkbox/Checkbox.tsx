import { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';

import {
  HiddenCheckboxInput,
  CheckboxStyled,
  CheckFrameStyled,
  CheckMarkStyled,
  ConsentDefinitionStyled,
  TermsLinkStyled
} from './CheckboxStyled';

export type CheckboxProps = {
  isChecked: boolean;
  required?: boolean;
  error?: string;
  isMyAccount?: boolean;
  className?: string;
  disabled?: boolean;
  isRadioButton?: boolean;
  termsUrl?: string;
  isPayPal?: boolean;
  id: string;
  children: string;
  onClickFn: (
    event?: ChangeEvent<HTMLInputElement>,
    isDisabled?: boolean
  ) => void;
};

const Checkbox = ({
  children,
  onClickFn,
  error,
  isChecked,
  required,
  isMyAccount,
  className = '',
  disabled = false,
  isRadioButton,
  termsUrl,
  isPayPal,
  id
}: CheckboxProps) => {
  const { t } = useTranslation();

  const spaceKey = ' ';

  return (
    <>
      <CheckboxStyled
        data-testid={`${id}-label`}
        htmlFor={id}
        aria-label={children}
        $className={className}
        $disabled={disabled}
      >
        <HiddenCheckboxInput
          id={id}
          type="checkbox"
          checked={isChecked}
          disabled={disabled}
          required={required}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            e.stopPropagation();
            onClickFn(e, disabled);
          }}
        />
        <CheckFrameStyled
          $error={!!error && required && !isChecked}
          tabIndex={0}
          onKeyDown={e => (e.key === spaceKey ? onClickFn() : null)}
          $isMyAccount={isMyAccount}
          $isRadioButton={isRadioButton}
          $checked={isChecked}
        >
          {isChecked && (
            <CheckMarkStyled
              data-testid="checkmark"
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
          target="_blank"
          rel="noreferrer"
          $checked={isChecked}
          $isPayPal={isPayPal}
        >
          {t('checkbox.terms-link', 'Terms & Conditions')}
        </TermsLinkStyled>
      )}
    </>
  );
};

export default Checkbox;
