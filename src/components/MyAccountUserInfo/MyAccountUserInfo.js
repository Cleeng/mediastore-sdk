import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  WrapStyled,
  DetailsStyled,
  PhotoStyled,
  NameStyled,
  MailStyled,
  TextStyled
} from './MyAccountUserInfoStyled';

class MyAccountUserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { firstName, lastName, email, subscription } = this.props;

    return (
      <WrapStyled>
        <PhotoStyled />
        <DetailsStyled isEmpty={!email}>
          <NameStyled>{`${firstName} ${lastName}`}</NameStyled>
          <MailStyled>{email}</MailStyled>
          <TextStyled>{subscription}</TextStyled>
        </DetailsStyled>
      </WrapStyled>
    );
  }
}

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
