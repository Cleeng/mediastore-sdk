import React from 'react';
import Button from '../Button/Button';
import Auth from '../../services/auth';

const Logout = () => {
  return (
    <Button onClickFn={() => Auth.logout()} variant="back">
      Log out
    </Button>
  );
};

export default Logout;
