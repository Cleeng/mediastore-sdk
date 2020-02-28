import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from 'components/Card';
import MyAccountInput from 'components/MyAccountInput/MyAccountInput';
import Button from 'components/Button';
import { WrapStyled, MyAccountButtonStyled } from './ProfileDetailsStyled';

class ProfileDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { firstName, lastName, mail } = this.props;
    return (
      <WrapStyled>
        <Card>
          <MyAccountInput value={firstName} label="First name" disabled />
          <MyAccountInput value={lastName} label="Last name" disabled />
          <MyAccountInput value={mail} label="Mail" disabled />
          <MyAccountButtonStyled>
            <Button>Edit Details</Button>
          </MyAccountButtonStyled>
        </Card>
      </WrapStyled>
    );
  }
}

export default ProfileDetails;

ProfileDetails.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  mail: PropTypes.string
};

ProfileDetails.defaultProps = {
  firstName: '',
  lastName: '',
  mail: ''
};
