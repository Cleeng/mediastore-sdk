import React from 'react';
import SkeletonWrapper from 'components/SkeletonWrapper';
import {
  WrapperStyled,
  InnerWrapper,
  PriceWrapperStyled
} from './OfferSwitchCardStyled';

const OfferSwitchCardLoader = () => {
  return (
    <WrapperStyled>
      <SkeletonWrapper showChildren={false} width={50} height={50} />
      <InnerWrapper>
        <SkeletonWrapper
          showChildren={false}
          width={200}
          margin="0 10px 10px 10px"
        />
        <SkeletonWrapper
          showChildren={false}
          width={300}
          margin="0 10px 10px 10px"
        />
      </InnerWrapper>
      <PriceWrapperStyled>
        <SkeletonWrapper showChildren={false} width={80} height={30} />
      </PriceWrapperStyled>
    </WrapperStyled>
  );
};

export default OfferSwitchCardLoader;
