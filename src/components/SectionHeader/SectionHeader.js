import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { FontColor, BigFont, BoldFont } from 'styles/variables';

const HeadingStyled = styled.h2.attrs(() => ({
  className: 'msd__section-header'
}))`
  padding-bottom: 25px;
  font-size: ${BigFont};
  font-weight: ${BoldFont};
  color: ${FontColor};
  text-transform: uppercase;
  ${props =>
    props.center &&
    css`
      text-align: center;
    `}
  ${props =>
    props.marginTop &&
    css`
      margin-top: ${props.marginTop};
    `}
`;

const SectionHeader = ({ children, center, marginTop }) => (
  <HeadingStyled center={center} marginTop={marginTop}>
    {children}
  </HeadingStyled>
);

export default SectionHeader;

SectionHeader.propTypes = {
  children: PropTypes.node,
  center: PropTypes.bool,
  marginTop: PropTypes.string
};

SectionHeader.defaultProps = {
  children: '',
  center: false,
  marginTop: null
};
