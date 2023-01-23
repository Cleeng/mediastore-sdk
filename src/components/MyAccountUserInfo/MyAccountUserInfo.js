import React from 'react';
import PropTypes from 'prop-types';
import SkeletonWrapper from 'components/SkeletonWrapper';

import { useSelector } from 'react-redux';
import { withTranslation } from 'react-i18next';
import {
  WrapStyled,
  DetailsStyled,
  PhotoStyled,
  NameStyled,
  MailStyled,
  TextStyled
} from './MyAccountUserInfoStyled';
import labeling from '../../containers/labeling';

const MyAccountUserInfo = ({ t }) => {
  const { user } = useSelector(state => state.userProfile);
  const {
    currentPlan: [plan]
  } = useSelector(state => state.planDetails);
  const isDataLoaded = !!user;
  const subscription =
    plan && t(`offer-title-${plan.offerId}`, plan.offerTitle);

  const isNameSet = user?.firstName || user?.lastName;

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
      <DetailsStyled isEmpty={!user?.email}>
        <SkeletonWrapper showChildren={isDataLoaded} height={26}>
          {isNameSet && (
            <NameStyled>{`${user?.firstName} ${user?.lastName}`}</NameStyled>
          )}
        </SkeletonWrapper>
        <SkeletonWrapper showChildren={isDataLoaded}>
          <MailStyled bigger={!isNameSet}>{user?.email}</MailStyled>
        </SkeletonWrapper>
        <SkeletonWrapper showChildren={isDataLoaded} height={36} margin="0">
          {subscription && <TextStyled>{subscription}</TextStyled>}
        </SkeletonWrapper>
      </DetailsStyled>
    </WrapStyled>
  );
};

MyAccountUserInfo.propTypes = {
  t: PropTypes.func
};

MyAccountUserInfo.defaultProps = {
  t: k => k
};

export default withTranslation()(labeling()(MyAccountUserInfo));
