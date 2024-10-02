import { ButtonProps } from './Button.types';
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
  variant,
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
      type={type}
      $fontSize={fontSize}
      $fontWeight={fontWeight}
      $icon={icon}
      $margin={margin}
      $padding={padding}
      $size={size}
      $variant={variant}
      $width={width}
    >
      {children}
    </ButtonStyled>
  );
};

export default Button;
