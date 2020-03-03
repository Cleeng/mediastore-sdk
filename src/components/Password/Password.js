import React from 'react';
import Card from 'components/Card';
import MyAccountInput from 'components/MyAccountInput/MyAccountInput';
import Button from 'components/Button';
import { WrapStyled, MyAccountButtonStyled } from './PasswordStyled';

const Password = () => (
  <WrapStyled>
    <Card>
      <MyAccountInput
        id="currentPassword"
        value="dummyPassword"
        type="password"
        label="Old password"
        disabled
      />
      <MyAccountInput
        id="newPassword"
        type="password"
        label="New password"
        disabled
      />
      <MyAccountInput
        id="newPasswordRepeat"
        type="password"
        label="Confirm Password"
        disabled
      />
      <MyAccountButtonStyled>
        <Button>Edit Password</Button>
      </MyAccountButtonStyled>
    </Card>
  </WrapStyled>
);

export default Password;
