/* istanbul ignore file */
import { css } from 'styled-components';

export const breakPoints = {
  smallest: 480,
  small: 768,
  medium: 1024,
  avarage: 1200,
  big: 1280,
  bigger: 1440,
  largest: 1920
};

export const media = Object.keys(breakPoints).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media only screen and (max-width: ${breakPoints[label]}px) {
      ${css(...args)}
    }
  `;

  return acc;
}, {});

export const mediaFrom = Object.keys(breakPoints).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media only screen and (min-width: ${breakPoints[label]}px) {
      ${css(...args)}
    }
  `;

  return acc;
}, {});
