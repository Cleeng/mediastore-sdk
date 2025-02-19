import styled from 'styled-components';
import { ErrorColor } from 'styles/variables';

export const ConsentsWrapperStyled = styled.div`
  * {
    box-sizing: border-box;
  }
  box-sizing: border-box;
  position: relative;

  padding: 10px;

  font-weight: 300;

  & button {
    margin-top: 35px;
  }
  & a {
    font-weight: 600;
  }
`;

export const ConsentsErrorStyled = styled.div.attrs(() => ({
  className: 'msd__consents__error'
}))`
  width: 100%;
  height: 13px;

  color: ${(props) => props.theme.errorColor || ErrorColor};

  font-size: 13px;
`;

export const InvisibleLegend = styled.legend`
  position: absolute;
  clip: rect(0 0 0 0);

  height: 1px;
  width: 1px;

  margin: -1px;
  padding: 0;

  overflow: hidden;
`;

export const GeneralErrorStyled = styled.p`
  * {
    box-sizing: border-box;
  }
  box-sizing: border-box;
  margin-bottom: 30px;
  color: ${(props) => props.theme.errorColor || ErrorColor};
  font-size: 13px;
`;

export const FieldsetStyled = styled.fieldset`
  border: none;
`;
