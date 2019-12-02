import React from 'react';
import PropTypes from 'prop-types';
import { LoaderStyled } from './LoaderStyled';

const Loader = ({ buttonLoader, smallLoader }) => (
  <LoaderStyled buttonLoader={buttonLoader} smallLoader={smallLoader}>
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
  smallLoader: PropTypes.bool
};

Loader.defaultProps = {
  buttonLoader: false,
  smallLoader: false
};

export default Loader;
