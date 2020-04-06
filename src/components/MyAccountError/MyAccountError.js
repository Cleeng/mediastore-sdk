import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  WrapStyled,
  TitleStyled,
  SubTitleStyled,
  IconStyled
} from './MyAccountErrorStyled';

class MyAccountError extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { title, subtitle, icon } = this.props;
    const IconComponent = icon;

    return (
      <WrapStyled>
        {icon && (
          <IconStyled>
            <IconComponent />
          </IconStyled>
        )}
        <TitleStyled>{title}</TitleStyled>
        <SubTitleStyled>{subtitle}</SubTitleStyled>
      </WrapStyled>
    );
  }
}

export default MyAccountError;

MyAccountError.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.any, PropTypes.string])
};

MyAccountError.defaultProps = {
  title: '',
  subtitle: '',
  icon: ''
};
