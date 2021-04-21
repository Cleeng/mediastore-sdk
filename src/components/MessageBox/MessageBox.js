import React from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as SuccessIcon } from 'assets/images/success.svg';

import {
  MessageBoxStyled,
  MessageBoxIconWrapStyled,
  MessageBoxMessageStyled
} from './MessageBoxStyled';

const MessageBox = ({ type, message }) => {
  return (
    <MessageBoxStyled type={type}>
      <MessageBoxIconWrapStyled>
        {SuccessIcon && <SuccessIcon />}
      </MessageBoxIconWrapStyled>
      <MessageBoxMessageStyled>{message}</MessageBoxMessageStyled>
    </MessageBoxStyled>
  );
};

MessageBox.propTypes = {
  type: PropTypes.string,
  message: PropTypes.string
};

MessageBox.defaultProps = {
  type: 'success',
  message: ''
};

export default MessageBox;
