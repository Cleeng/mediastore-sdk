import styled from 'styled-components';
import {
  MyAccountTextGray,
  MyAccountContentColor,
  MyAccountTextDark2,
  InputLabelColor
} from 'styles/variables';

export const WrapStyled = styled.div`
  position: relative;

  margin-bottom: 20px;
`;

export const InfoMessageStyled = styled.div`
  color: ${MyAccountTextGray};
  font-size: 13px;
`;

export const InsideWrapperStyled = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: no-wrap;

  padding: 18px 0;
  border-bottom: 2px solid ${MyAccountContentColor};

  &:first-child {
    padding: 0 0 18px 0;
  }
  &:last-child {
    padding: 18px 0 0 0;
    border-bottom: none;
  }
`;

export const LeftBoxStyled = styled.div``;

export const RightBoxStyled = styled.div`
  flex-shrink: 0;
  margin-left: 20px;
  text-align: right;
`;

export const TitleStyled = styled.h3`
  color: ${MyAccountTextDark2};

  font-size: 13px;
  font-weight: 700;
`;
export const SubTitleStyled = styled.div`
  margin-top: 6px;

  color: ${InputLabelColor};

  font-size: 12px;
  font-style: italic;
  font-weight: 600;
`;

export const IdStyled = styled.div`
  color: ${MyAccountTextDark2};

  font-size: 13px;
  font-weight: 600;
`;
export const DateStyled = styled.div`
  margin-top: 6px;

  color: ${InputLabelColor};

  font-size: 12px;
  font-weight: 600;
`;
