import React from 'react';
import PropTypes from 'prop-types';
import { LoaderStyled } from './LoaderStyled';

const Loader = ({ buttonLoader, smallLoader, color }) => (
  <LoaderStyled
    buttonLoader={buttonLoader}
    smallLoader={smallLoader}
    color={color}
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
  color: PropTypes.string
};

Loader.defaultProps = {
  buttonLoader: false,
  smallLoader: false,
  color: null
};

export default Loader;
