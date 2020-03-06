import React from 'react';
import PropTypes from 'prop-types';
import Card from 'components/Card';
import MyAccountInput from 'components/MyAccountInput/MyAccountInput';
// import Button from 'components/Button';
import { WrapStyled } from './ProfileDetailsStyled';

const ProfileDetails = ({ firstName, lastName, mail }) => (
  <WrapStyled>
    <Card>
      <MyAccountInput
        id="firstName"
        value={firstName}
        label="First name"
        disabled
      />
      <MyAccountInput
        id="lastName"
        value={lastName}
        label="Last name"
        disabled
      />
      <MyAccountInput id="email" value={mail} label="Mail" disabled />
      {/* <MyAccountButtonStyled>
        <Button>Edit Details</Button>
      </MyAccountButtonStyled> */}
    </Card>
  </WrapStyled>
);

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
