import { WrapStyled } from './CardStyled';
import { CardProps } from './Card.types';

const Card = ({
  as = 'article',
  className,
  children,
  withShadow,
  withBorder
}: CardProps) => (
  <WrapStyled
    as={as}
    $withShadow={withShadow}
    className={className}
    $withBorder={withBorder}
  >
    {children}
  </WrapStyled>
);

export default Card;
