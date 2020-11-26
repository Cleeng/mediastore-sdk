import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import labeling from 'containers/labeling';
import Button from 'components/Button';
import Auth from 'services/auth';

const Logout = ({ t }) => {
  return (
    <Button onClickFn={() => Auth.logout()} theme="navLink">
      {t('Back to login')}
    </Button>
  );
};

Logout.propTypes = {
  t: PropTypes.func
};

Logout.defaultProps = {
  t: k => k
};

export { Logout as PureLogout };

export default withTranslation()(labeling()(Logout));
