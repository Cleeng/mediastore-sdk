import React, { Component } from 'react';
import Card from 'components/Card';
import MyAccountInput from 'components/MyAccountInput/MyAccountInput';
import Button from 'components/Button';
import { WrapStyled, MyAccountButtonStyled } from './PasswordStyled';

class Password extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <WrapStyled>
        <Card>
          <MyAccountInput
            value="dummyPassword"
            type="password"
            label="Old password"
            disabled
          />
          <MyAccountInput type="password" label="New password" disabled />
          <MyAccountInput type="password" label="Confirm Password" disabled />
          <MyAccountButtonStyled>
            <Button>Edit Password</Button>
          </MyAccountButtonStyled>
        </Card>
      </WrapStyled>
    );
  }
}

export default Password;
