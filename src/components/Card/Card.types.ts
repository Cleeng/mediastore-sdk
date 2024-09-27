import { ReactNode } from 'react';

export type CardProps = {
  as?: keyof JSX.IntrinsicElements;
  className?: 'msd__account__card';
  children?: ReactNode;
  withShadow?: boolean;
  withBorder?: boolean;
};
