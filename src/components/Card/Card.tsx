import { CardProps } from 'types/components/Card.types';
import { WrapStyled } from './CardStyled';

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
