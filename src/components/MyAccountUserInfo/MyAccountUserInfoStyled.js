import styled from 'styled-components';
import { mediaFrom } from 'styles/BreakPoints';
import { MyAccountTextColor } from 'styles/variables';
import portrait from './img/man.png';

export const WrapStyled = styled.header`
  display: flex;
  flex-direction: row;

  padding-bottom: 26px;
  border-bottom: 1px solid rgba(256, 256, 256, 0.3);

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

export const DetailsStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  margin-left: 14px;

  color: ${MyAccountTextColor};

  ${mediaFrom.small`
    align-items: center;

    margin-left: 0;
  `}
`;

export const NameStyled = styled.div`
  font-size: 24px;
  font-weight: 700;

  ${mediaFrom.small`
    margin-bottom: 10px;
  `}
`;

export const MailStyled = styled.div`
  font-size: 9px;
  font-weight: 700;

  ${mediaFrom.small`
    margin-bottom: 14px;
  `}
`;

export const TextStyled = styled.div`
  font-size: 9px;
  font-weight: 500;
`;
