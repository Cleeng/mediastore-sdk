import React, { Component } from 'react';
import portrait from './img/man.png';

import {
  WrapStyled,
  DetailsStyled,
  PhotoStyled,
  NameStyled,
  MailStyled,
  TextStyled
} from './MyAccountUserInfoStyled';

class MyAccountUserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <WrapStyled>
        <PhotoStyled img={portrait} />
        <DetailsStyled>
          <NameStyled>John Doe</NameStyled>
          <MailStyled>john.doe@mail.com</MailStyled>
          <TextStyled>12 Month Premium with all workouts</TextStyled>
        </DetailsStyled>
      </WrapStyled>
    );
  }
}

export default MyAccountUserInfo;
