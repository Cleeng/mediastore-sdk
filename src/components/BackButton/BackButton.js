import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import Button from 'components/Button';
import labeling from 'containers/labeling';

const BackButton = ({ isMyAccount, onClickFn, t }) => {
  return (
    <Button
      isLink={!onClickFn}
      to={{
        pathname: isMyAccount ? '/my-account/login' : '/login'
      }}
      onClickFn={onClickFn}
      theme="navLink"
    >
      {t('Back to login')}
    </Button>
  );
};

BackButton.propTypes = {
  isMyAccount: PropTypes.bool,
  onClickFn: PropTypes.func,
  t: PropTypes.func
};
BackButton.defaultProps = {
  isMyAccount: false,
  onClickFn: null,
  t: k => k
};

export { BackButton as PureBackButton };

export default withTranslation()(labeling()(BackButton));
