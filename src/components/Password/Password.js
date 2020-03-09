import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import labeling from 'containers/labeling';
import Card from 'components/Card';
import MyAccountInput from 'components/MyAccountInput/MyAccountInput';
// import Button from 'components/Button';
import { WrapStyled } from './PasswordStyled';

const Password = ({ t }) => (
  <WrapStyled>
    <Card>
      <MyAccountInput
        id="currentPassword"
        value="dummyPassword"
        type="password"
        label={t('Old password')}
        disabled
      />
      <MyAccountInput
        id="newPassword"
        type="password"
        label={t('New password')}
        disabled
      />
      <MyAccountInput
        id="newPasswordRepeat"
        type="password"
        label={t('Confirm password')}
        disabled
      />
      {/* <MyAccountButtonStyled>
        <Button>Edit Password</Button>
      </MyAccountButtonStyled> */}
    </Card>
  </WrapStyled>
);

Password.propTypes = {
  t: PropTypes.func
};

Password.defaultProps = {
  t: k => k
};

export default withTranslation()(labeling()(Password));
