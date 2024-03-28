import React from 'react';
import { useTranslation } from 'react-i18next';
import Button from 'components/Button';
import Auth from 'services/auth';

const Logout = () => {
  const { t } = useTranslation();
  return (
    <Button onClickFn={() => Auth.logout()} theme="navLink">
      {t('logout.back-button', 'Back to login')}
    </Button>
  );
};

export { Logout as PureLogout };

export default Logout;
