import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { LoaderColor } from 'styles/variables';

export const SkeletonWrapperStyled = styled.div.attrs(() => ({
  className: 'msd__skeleton'
}))`
  width: 100%;
  max-width: 100%;
  margin: 0 0 10px;
  overflow: hidden;
  text-align: center;

  ${props =>
    props.width &&
    css`
      width: ${props.width}px;
    `}

    ${props =>
      props.margin &&
      css`
        margin: ${props.margin};
      `}

  ${props =>
    props.align &&
    css`
      text-align: ${props.align};
    `}
`;

export const StyledSkeleton = styled(Skeleton)`
  border-radius: 16px !important;

  ${props =>
    props.circle &&
    css`
      border-radius: 50% !important;
    `}
`;

const SkeletonWrapper = ({
  showChildren,
  children,
  margin,
  width,
  ...props
}) => {
  return showChildren ? (
    children
  ) : (
    <SkeletonWrapperStyled width={width} margin={margin}>
      <SkeletonTheme baseColor={LoaderColor}>
        <StyledSkeleton {...props} />
      </SkeletonTheme>
    </SkeletonWrapperStyled>
  );
};

SkeletonWrapper.propTypes = {
  showChildren: PropTypes.bool,
  children: PropTypes.node,
  margin: PropTypes.string,
  width: PropTypes.number
};

SkeletonWrapper.defaultProps = {
  showChildren: false,
  children: '',
  margin: '',
  width: null
};

export default SkeletonWrapper;
