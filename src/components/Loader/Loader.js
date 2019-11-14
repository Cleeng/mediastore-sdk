import React from 'react';
import PropTypes from 'prop-types';
import { LoaderStyled } from './LoaderStyled';

const Loader = ({ buttonLoader }) => (
  <LoaderStyled buttonLoader={buttonLoader}>
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
  buttonLoader: PropTypes.bool
};

Loader.defaultProps = {
  buttonLoader: false
};

export default Loader;
