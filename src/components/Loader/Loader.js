import React from 'react';
import PropTypes from 'prop-types';
import { LoaderStyled } from './LoaderStyled';

const Loader = ({
  buttonLoader,
  smallLoader,
  centered,
  color,
  isMyAccount
}) => (
  <LoaderStyled
    buttonLoader={buttonLoader}
    smallLoader={smallLoader}
    centered={centered}
    color={color}
    isMyAccount={isMyAccount}
  >
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
  </LoaderStyled>
);

Loader.propTypes = {
  buttonLoader: PropTypes.bool,
  smallLoader: PropTypes.bool,
  centered: PropTypes.bool,
  color: PropTypes.string,
  isMyAccount: PropTypes.bool
};

Loader.defaultProps = {
  buttonLoader: false,
  smallLoader: false,
  centered: false,
  color: null,
  isMyAccount: false
};

export default Loader;
