import React from 'react';

export type SkeletonWrapperProps = {
  showChildren?: boolean;
  children?: React.ReactNode;
  margin?: string;
  width?: number | null;
  [x: string]: any;
};
