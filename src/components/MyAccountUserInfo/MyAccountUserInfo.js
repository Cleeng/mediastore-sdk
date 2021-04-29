import React from 'react';
import PropTypes from 'prop-types';
import SkeletonWrapper from 'components/SkeletonWrapper';

import {
  WrapStyled,
  DetailsStyled,
  PhotoStyled,
  NameStyled,
  MailStyled,
  TextStyled
} from './MyAccountUserInfoStyled';

const MyAccountUserInfo = ({
  firstName,
  lastName,
  email,
  subscription,
  isDataLoaded
}) => {
  const isNameSetted = firstName || lastName;
  return (
    <WrapStyled>
      <SkeletonWrapper
        showChildren={isDataLoaded}
        circle
        width={80}
        height={80}
      >
        <PhotoStyled />
      </SkeletonWrapper>
      <DetailsStyled isEmpty={!email}>
        <SkeletonWrapper showChildren={isDataLoaded} height={26}>
          {isNameSetted && (
            <NameStyled>{`${firstName} ${lastName}`}</NameStyled>
          )}
        </SkeletonWrapper>
        <SkeletonWrapper showChildren={isDataLoaded}>
          <MailStyled bigger={!isNameSetted}>{email}</MailStyled>
        </SkeletonWrapper>
        <SkeletonWrapper showChildren={isDataLoaded} height={36} margin="0px">
          <TextStyled>{subscription}</TextStyled>
        </SkeletonWrapper>
      </DetailsStyled>
    </WrapStyled>
  );
};

export default MyAccountUserInfo;

MyAccountUserInfo.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  email: PropTypes.string,
  subscription: PropTypes.string,
  isDataLoaded: PropTypes.bool
};

MyAccountUserInfo.defaultProps = {
  firstName: '',
  lastName: '',
  email: '',
  subscription: '',
  isDataLoaded: false
};
