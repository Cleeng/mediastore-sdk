import React from 'react';
import PropTypes from 'prop-types';

import { WrapStyled } from './MyAccountContentStyled';

const MyAccountContent = ({ children }) => <WrapStyled>{children}</WrapStyled>;

export default MyAccountContent;

MyAccountContent.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
};

MyAccountContent.defaultProps = {
  children: ''
};
