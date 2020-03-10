import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { HeadingColor } from 'styles/variables';

const HeadingStyled = styled.h2`
  margin-bottom: 24px;
  font-size: 14px;
  font-weight: 700;
  color: ${HeadingColor};
`;

const MyAccountHeading = ({ text }) => <HeadingStyled>{text}</HeadingStyled>;

export default MyAccountHeading;

MyAccountHeading.propTypes = {
  text: PropTypes.string
};

MyAccountHeading.defaultProps = {
  text: ''
};
