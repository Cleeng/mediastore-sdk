import styled, { css } from 'styled-components';
import { mediaFrom } from 'styles/BreakPoints';
import {
  FontColor,
  MyAccountTextLightGray,
  LineColor,
  SmallFont,
  MediumFontWeight
} from 'styles/variables';

import portrait from './img/avatarBase64';

export const WrapStyled = styled.header.attrs(() => ({
  className: 'msd__account-header'
}))`
  display: flex;
  flex-direction: row;

  padding-bottom: 10px;

  ${mediaFrom.small`
    flex-direction: column;
    align-items: center;
    border-bottom: 1px solid ${LineColor};
    padding-bottom: 26px;
  `}
`;

export const PhotoStyled = styled.div.attrs(() => ({
  className: 'msd__account-header__avatar'
}))`
  width: 64px;
  height: 64px;
  min-width: 64px;

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

export const NameStyled = styled.div.attrs(() => ({
  className: 'msd__account-header__name'
}))`
  max-width: 100%;

  margin-bottom: 6px;

  font-size: 20px;
  line-height: 24px;
  font-weight: 700;
  color: ${FontColor};
  text-overflow: ellipsis;
  overflow: hidden;

  ${mediaFrom.small`
    font-size: 26px;
    line-height: 29px;
    margin-bottom: 10px;
    text-align: center;
  `};
`;

export const MailStyled = styled.div.attrs(() => ({
  className: 'msd__account-header__mail'
}))`
  max-width: 100%;

  margin-bottom: 6px;

  color: ${FontColor};

  font-size: ${SmallFont};
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.2;

  ${props =>
    props.$bigger &&
    css`
      font-size: 14px;
      font-weight: 700;
    `}

  ${mediaFrom.small`
    margin-bottom: 14px;
  `}
`;

export const TextStyled = styled.div.attrs(() => ({
  className: 'msd__account-header__label'
}))`
  padding: 5px 16px;
  background-color: #f0f0ff;
  border-radius: 14px;
  border: 1px solid #d7d7f5;
  color: #7172c9;
  font-size: 9px;
  line-height: 12px;
  text-align: center;
  font-weight: ${MediumFontWeight};
  min-height: 19px;
  max-width: max-content;
`;

export const DetailsStyled = styled.div.attrs(() => ({
  className: 'msd__account-header__wrapper'
}))`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: center;

  max-width: calc(100% - 78px);
  margin-left: 14px;

  color: ${FontColor};

  ${props =>
    props.$isEmpty &&
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
        border-radius: 5px;
      }
      ${TextStyled} {
        width: 100%;
      }
    `}

  ${mediaFrom.small`
    width: 100%;
    max-width: unset;
    align-items: center;
  
    margin-left: 0;
  `}
`;
