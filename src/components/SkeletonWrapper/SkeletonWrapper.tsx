import { SkeletonTheme } from 'react-loading-skeleton';
import { LoaderColor } from 'styles/variables';
import { withTheme } from 'styled-components';
import { SkeletonWrapperStyled, StyledSkeleton } from './SkeletonWrapperStyled';
import { SkeletonWrapperProps } from './SkeletonWrapper.types';

const SkeletonWrapper = ({
  showChildren = false,
  children = null,
  margin = '',
  width = null,
  theme,
  ...props
}: SkeletonWrapperProps) =>
  showChildren ? (
    <>{children}</>
  ) : (
    <SkeletonWrapperStyled $width={width} $margin={margin}>
      <SkeletonTheme baseColor={theme?.loaderColor || LoaderColor}>
        <StyledSkeleton {...props} />
      </SkeletonTheme>
    </SkeletonWrapperStyled>
  );

export default withTheme(SkeletonWrapper);
