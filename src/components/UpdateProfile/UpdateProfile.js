import React, { Component } from 'react';
import { WrapStyled, HeaderStyled } from './UpdateProfileStyled';

class UpdateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <WrapStyled>
        <HeaderStyled>Profile Details</HeaderStyled>
      </WrapStyled>
    );
  }
}

export default UpdateProfile;
