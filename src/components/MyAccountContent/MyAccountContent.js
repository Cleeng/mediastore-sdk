import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Scrollbars } from 'react-custom-scrollbars';
import { WrapStyled } from './MyAccountContentStyled';

class MyAccountContent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { children } = this.props;
    return (
      <Scrollbars style={{ flexGrow: '1', width: 'unset' }}>
        <WrapStyled>{children}</WrapStyled>
      </Scrollbars>
    );
  }
}

export default MyAccountContent;

MyAccountContent.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
};

MyAccountContent.defaultProps = {
  children: ''
};
