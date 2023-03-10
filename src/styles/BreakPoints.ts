/* istanbul ignore file */
import { css, FlattenSimpleInterpolation } from 'styled-components';

type BreakPoints = "smallest" | "small" | "medium" | "avarage" | "big" | "bigger" | "largest";

export const breakPoints: { [key in BreakPoints]: number } = {
  smallest: 480,
  small: 768,
  medium: 1024,
  avarage: 1200,
  big: 1280,
  bigger: 1440,
  largest: 1920
};

export const media = Object.keys(breakPoints).reduce((acc, label) => {
  acc[label as BreakPoints] = (literals: TemplateStringsArray, ...placeholders: any[]) => css`
    @media only screen and (max-width: ${breakPoints[label as BreakPoints]}px) {
      ${css(literals, ...placeholders)}
    }
  `;

  return acc;
}, {} as { [key in BreakPoints]: (l: TemplateStringsArray, ...p: any[]) => FlattenSimpleInterpolation });

export const mediaFrom = Object.keys(breakPoints).reduce((acc, label) => {
  acc[label as BreakPoints] = (literals: TemplateStringsArray, ...placeholders: any[]) => css`
    @media only screen and (min-width: ${breakPoints[label as BreakPoints]}px) {
      ${css(literals, ...placeholders)}
    }
  `;

  return acc;
}, {} as { [key in BreakPoints]: (l: TemplateStringsArray, ...p: any[]) => FlattenSimpleInterpolation });
