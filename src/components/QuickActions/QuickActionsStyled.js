import styled from 'styled-components';
import { FontColor } from 'styles/variables';

export const WrapStyled = styled.div``;

export const HeaderStyled = styled.div`
  color: ${(props) => props.theme.fontColor || FontColor};

  font-size: 14px;
  font-weight: 700;
`;
