import React from 'react';
import PropTypes from 'prop-types';

import {
  WrapStyled,
  DetailsStyled,
  PhotoStyled,
  NameStyled,
  MailStyled,
  TextStyled
} from './MyAccountUserInfoStyled';

const MyAccountUserInfo = ({ firstName, lastName, email, subscription }) => {
  const isNameSetted = firstName || lastName;
  return (
    <WrapStyled>
      <PhotoStyled />
      <DetailsStyled isEmpty={!email}>
        {isNameSetted && <NameStyled>{`${firstName} ${lastName}`}</NameStyled>}
        <MailStyled bigger={!isNameSetted}>{email}</MailStyled>
        {subscription && <TextStyled>{subscription}</TextStyled>}
      </DetailsStyled>
    </WrapStyled>
  );
};

export default MyAccountUserInfo;

MyAccountUserInfo.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  email: PropTypes.string,
  subscription: PropTypes.string
};

MyAccountUserInfo.defaultProps = {
  firstName: '',
  lastName: '',
  email: '',
  subscription: ''
};
