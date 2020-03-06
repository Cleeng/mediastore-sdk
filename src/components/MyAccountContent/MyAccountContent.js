import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { WrapStyled } from './MyAccountContentStyled';

class MyAccountContent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { children } = this.props;
    return <WrapStyled>{children}</WrapStyled>;
  }
}

export default MyAccountContent;

MyAccountContent.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
};

MyAccountContent.defaultProps = {
  children: ''
};
