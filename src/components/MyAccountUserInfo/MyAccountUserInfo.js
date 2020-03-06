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
    // eslint-disable-next-line no-bitwise
    const isNameSetted = !firstName & !lastName;

    return (
      <WrapStyled>
        <PhotoStyled />
        <DetailsStyled isEmpty={!email}>
          {!isNameSetted && (
            <NameStyled>{`${firstName} ${lastName}`}</NameStyled>
          )}
          <MailStyled bigger={isNameSetted}>{email}</MailStyled>
          {subscription && <TextStyled>{subscription}</TextStyled>}
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
