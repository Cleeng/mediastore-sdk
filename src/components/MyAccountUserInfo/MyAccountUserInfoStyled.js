import styled, { css } from 'styled-components';
import { mediaFrom } from 'styles/BreakPoints';
import {
  MyAccountTextDark,
  MyAccountTextGray,
  MyAccountTextLightGray,
  MyAccountBorder
} from 'styles/variables';

import portrait from './img/avatar.svg';

export const WrapStyled = styled.header`
  display: flex;
  flex-direction: row;

  padding-bottom: 26px;
  border-bottom: 1px solid ${MyAccountBorder};

  ${mediaFrom.small`
    flex-direction: column;
    align-items: center;
    
    `}
`;

export const PhotoStyled = styled.div`
  width: 64px;
  height: 64px;

  border-radius: 50%;
  background-image: url(${portrait});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  ${mediaFrom.small`
    width: 84px;
    height: 84px;
    margin-bottom: 20px;
  `}
`;

export const NameStyled = styled.div`
  font-size: 24px;
  line-height: 29px;
  font-weight: 700;
  margin-bottom: 6px;

  ${mediaFrom.small`
    margin-bottom: 10px;
    text-align: center;

  `}
`;

export const MailStyled = styled.div`
  margin-bottom: 4px;
  font-size: 9px;
  font-weight: 500;
  color: ${MyAccountTextGray};
  margin-bottom: 6px;

  ${mediaFrom.small`
    margin-bottom: 14px;
  `}
`;

export const TextStyled = styled.div`
  padding: 5px 10px;
  background-color: ${MyAccountTextLightGray};
  border-radius: 10px;
  color: ${MyAccountTextGray};
  font-size: 9px;
  font-weight: 500;
  min-height: 19px;
`;

export const DetailsStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 100%;
  margin-left: 14px;

  color: ${MyAccountTextDark};

  ${props =>
    props.isEmpty &&
    css`
      ${NameStyled} {
        background-color: ${MyAccountTextLightGray};
        width: 100%;
        border-radius: 10px;

        min-height: 24px;
      }
      ${MailStyled} {
        background-color: ${MyAccountTextLightGray};
        width: 100%;
        min-height: 9px;
        border-radius: 5px;
      }
      ${TextStyled} {
        width: 100%;
      }
    `}

  ${mediaFrom.small`
    align-items: center;
  
    margin-left: 0;
  `}
`;
