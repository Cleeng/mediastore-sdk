import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const PlaceholderStyled = styled.div`
  display: flex;

  justify-content: center;

  padding: 40px;

  border: solid 1px black;
`;

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
