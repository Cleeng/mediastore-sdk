import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import labeling from 'containers/labeling';
import Card from 'components/Card';
import MyAccountInput from 'components/MyAccountInput/MyAccountInput';
// import Button from 'components/Button';
import { WrapStyled } from './ProfileDetailsStyled';

const ProfileDetails = ({ firstName, lastName, mail, t }) => (
  <WrapStyled>
    <Card>
      <MyAccountInput
        id="firstName"
        value={firstName}
        label={t('First name')}
        disabled
      />
      <MyAccountInput
        id="lastName"
        value={lastName}
        label={t('Last name')}
        disabled
      />
      <MyAccountInput id="email" value={mail} label="Mail" disabled />
      {/* <MyAccountButtonStyled>
        <Button>Edit Details</Button>
      </MyAccountButtonStyled> */}
    </Card>
  </WrapStyled>
);

ProfileDetails.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  mail: PropTypes.string,
  t: PropTypes.func
};

ProfileDetails.defaultProps = {
  firstName: '',
  lastName: '',
  mail: '',
  t: k => k
};

export { ProfileDetails as PureProfileDetails };

export default withTranslation()(labeling()(ProfileDetails));
