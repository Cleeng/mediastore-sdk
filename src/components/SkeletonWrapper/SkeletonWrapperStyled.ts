import styled, { css } from 'styled-components';
import Skeleton from 'react-loading-skeleton';

type SkeletonWrapperProps = {
  $width: number | null;
  $margin: string;
  $align?: string;
};
export const SkeletonWrapperStyled = styled.div.attrs<SkeletonWrapperProps>(
  () => ({
    className: 'msd__skeleton'
  })
)<SkeletonWrapperProps>`
  width: 100%;
  max-width: 100%;
  margin: 0 0 10px;
  overflow: hidden;
  text-align: center;

  ${(props) =>
    props.$width &&
    css`
      width: ${props.$width}px;
    `}

  ${(props) =>
    props.$margin &&
    css`
      margin: ${props.$margin};
    `}

  ${(props) =>
    props.$align &&
    css`
      text-align: ${props.$align};
    `}
`;

export const StyledSkeleton = styled(Skeleton)`
  border-radius: 16px !important;

  ${(props) =>
    props.circle &&
    css`
      border-radius: 50% !important;
    `}
`;
