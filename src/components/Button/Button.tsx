import { ButtonProps } from 'types/Button.types';
import ButtonStyled from './ButtonStyled';

const Button = ({
  children,
  disabled,
  fontSize,
  fontWeight,
  icon,
  label,
  margin,
  onClickFn,
  padding,
  size,
  testid,
  theme,
  type,
  width
}: ButtonProps) => {
  return (
    <ButtonStyled
      aria-label={label}
      data-testid={testid}
      disabled={disabled}
      onClick={onClickFn}
      type={type}
      $size={size}
      $theme={theme}
      $fontSize={fontSize}
      $margin={margin}
      $fontWeight={fontWeight}
      $width={width}
      $icon={icon}
      $padding={padding}
    >
      {children}
    </ButtonStyled>
  );
};

export default Button;
