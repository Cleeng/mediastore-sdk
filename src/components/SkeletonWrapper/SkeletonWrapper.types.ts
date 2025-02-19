import React from 'react';
import { ThemeVariables } from 'types/generic.types';

export type SkeletonWrapperProps = {
  showChildren?: boolean;
  children?: React.ReactNode;
  margin?: string;
  width?: number | null;
  theme?: ThemeVariables;
  [x: string]: any;
};
