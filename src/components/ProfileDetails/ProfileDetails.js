import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import labeling from 'containers/labeling';
import Card from 'components/Card';
import MyAccountInput from 'components/MyAccountInput/MyAccountInput';
// import Button from 'components/Button';
import Loader from 'components/Loader/Loader';
import { WrapStyled } from './ProfileDetailsStyled';

const ProfileDetails = ({ firstName, lastName, email, isLoading, t }) =>
  isLoading ? (
    <Loader isMyAccount />
  ) : (
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
        <MyAccountInput id="email" value={email} label="e-mail" disabled />
        {/* <MyAccountButtonStyled>
        <Button>Edit Details</Button>
      </MyAccountButtonStyled> */}
      </Card>
    </WrapStyled>
  );

ProfileDetails.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  email: PropTypes.string,
  isLoading: PropTypes.bool,
  t: PropTypes.func
};

ProfileDetails.defaultProps = {
  firstName: '',
  lastName: '',
  email: '',
  isLoading: false,
  t: k => k
};

export { ProfileDetails as PureProfileDetails };

export default withTranslation()(labeling()(ProfileDetails));
