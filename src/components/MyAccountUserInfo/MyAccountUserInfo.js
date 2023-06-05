import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import SkeletonWrapper from 'components/SkeletonWrapper';
import {
  WrapStyled,
  DetailsStyled,
  PhotoStyled,
  NameStyled,
  MailStyled,
  TextStyled
} from './MyAccountUserInfoStyled';

const MyAccountUserInfo = () => {
  const { user } = useSelector(state => state.userProfile);

  const {
    currentPlan: [plan]
  } = useSelector(state => state.planDetails);
  const { t } = useTranslation();

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
        {/* TODO: fix contrast issue */}
        <SkeletonWrapper showChildren={isDataLoaded} height={36} margin="0">
          {subscription && <TextStyled>{subscription}</TextStyled>}
        </SkeletonWrapper>
      </DetailsStyled>
    </WrapStyled>
  );
};

export default MyAccountUserInfo;
