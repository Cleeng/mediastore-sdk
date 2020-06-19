import styled from 'styled-components';
import * as colors from 'styles/variables';

export const PaymentStyled = styled.div`
  padding: 40px 35px 50px 35px;
  width: 100%;
  margin-top: 20px;
`;

export const PaymentErrorStyled = styled.div`
  font-size: 15px;
  color: ${colors.ErrorColor};
  font-family: 'Geomanist';
  position: absolute;
`;

export const TitleStyled = styled.div`
  font-family: 'Geomanist';
  font-weight: 600;
  font-size: 22px;
  padding: 20px 0;
  text-align: center;
`;

export const MethodsWrapperStyled = styled.div`
  margin-bottom: 10px;
  font-size: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  button {
    flex: 1 0 21%;
    margin: 0 14px 14px;

    :not(:disabled):hover,
    :active,
    :focus {
      background-color: ${colors.MediumGrey};
    }
  }
`;

export const ButtonImageStyled = styled.img`
  max-height: 50%;
  margin: 0 auto;
`;
