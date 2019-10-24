import styled from 'styled-components';
import * as colors from '../../styles/variables';

export const FooterStyled = styled.footer`
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  padding: 10px;

  background-color: ${colors.MediumGrey};
`;

export const ProductByStyled = styled.span`
  display: flex;
  align-items: center;

  color: ${colors.LighterGrey};

  font-size: 12px;
  font-family: 'Geomanist';
  font-weight: 300;
  & a {
    padding: 0 5px;
  }
`;

export const SecurityStyled = styled.div`
  color: ${colors.PassOffer};

  font-family: 'Geomanist';
  font-size: 14px;
  & img {
    padding-right: 5px;
  }
`;
