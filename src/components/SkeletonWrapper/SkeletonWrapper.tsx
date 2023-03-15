import { SkeletonTheme } from 'react-loading-skeleton';
import { LoaderColor } from 'styles/variables';
import 'react-loading-skeleton/dist/skeleton.css';
import { SkeletonWrapperStyled, StyledSkeleton } from './SkeletonWrapperStyled';
import { SkeletonWrapperProps } from './SkeletonWrapper.types';

const SkeletonWrapper = ({
  showChildren = false,
  children = null,
  margin = '',
  width = null,
  ...props
}: SkeletonWrapperProps) => {
  return showChildren ? (
    <>{children}</>
  ) : (
    <SkeletonWrapperStyled width={width} margin={margin}>
      <SkeletonTheme baseColor={LoaderColor}>
        <StyledSkeleton {...props} />
      </SkeletonTheme>
    </SkeletonWrapperStyled>
  );
};

export default SkeletonWrapper;
