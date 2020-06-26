import styled from 'styled-components';
import { media } from 'styles/BreakPoints';
import * as colors from 'styles/variables';

export const HeaderStyled = styled.header`
  display: flex;
  position: relative;

  padding: 0;
  margin: 0 35px;

  border-bottom: 1px ${colors.MediumGrey} solid;

  text-align: center;

  ${media.small`
    margin: 0 10px;
  `}
`;

export const LogoStyled = styled.div`
  margin: 40px auto;
  width: 100%;
  img {
    width: auto;
    height: 100%;
    margin-left: 50px;
    ${media.small`
      margin: 0;
  `}
  }
`;
