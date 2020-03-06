import React from 'react';
import PropTypes from 'prop-types';
import { LoaderStyled } from './LoaderStyled';

const Loader = ({ buttonLoader, smallLoader, white }) => (
  <LoaderStyled
    buttonLoader={buttonLoader}
    smallLoader={smallLoader}
    white={white}
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
  white: PropTypes.bool
};

Loader.defaultProps = {
  buttonLoader: false,
  smallLoader: false,
  white: false
};

export default Loader;
