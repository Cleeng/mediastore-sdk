import styled from 'styled-components';
import { InputLabelColor } from 'styles/variables';

export const WrapStyled = styled.div`
  position: relative;
  max-width: 320px;

  padding: 18px;
  margin: 0 auto 32px auto;

  text-align: center;
  line-height: 1.4;
`;

export const TitleStyled = styled.div`
  margin-bottom: 5px;

  color: ${InputLabelColor};

  font-size: 17px;
  font-weight: 700;
`;

export const SubTitleStyled = styled.div`
  color: ${InputLabelColor};

  font-size: 14px;
`;

export const IconStyled = styled.div`
  margin: 0 auto 10px auto;
`;
