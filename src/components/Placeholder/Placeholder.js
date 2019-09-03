import React from 'react';
import PropTypes from 'prop-types';
import PlaceholderStyled from './PlaceholderStyled';

const Placeholder = ({ label }) => (
  <PlaceholderStyled>This is {label} placeholder</PlaceholderStyled>
);
Placeholder.propTypes = {
  label: PropTypes.string
};
Placeholder.defaultProps = {
  label: ''
};

export default Placeholder;
