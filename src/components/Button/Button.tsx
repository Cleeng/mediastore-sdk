import { ButtonProps } from 'types/Button.types';
import ButtonStyled from './ButtonStyled';

const Button = ({
  children,
  className,
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
      className={className}
      data-testid={testid}
      disabled={disabled}
      onClick={onClickFn}
      theme={theme}
      type={type}
      $fontSize={fontSize}
      $fontWeight={fontWeight}
      $icon={icon}
      $margin={margin}
      $padding={padding}
      $size={size}
      $theme={theme}
      $width={width}
    >
      {children}
    </ButtonStyled>
  );
};

export default Button;
