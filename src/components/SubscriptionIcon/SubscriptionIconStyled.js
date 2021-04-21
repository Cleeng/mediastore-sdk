import styled from 'styled-components';
import { mediaFrom } from 'styles/BreakPoints';
import { BoldFont, MainColor, White, ConfirmColor } from 'styles/variables';

export const WrapperStyled = styled.div`
  position: relative;
  padding: 10px;
  margin-right: 10px;
  border-radius: 8px;
  flex: 0 0 40px;

  max-width: 50px;

  font-size: 16px;
  font-weight: ${BoldFont};
  text-align: center;

  background-color: ${props => props.bg};
  color: ${props => props.color};
  border: 1px solid ${props => props.border};

  ${mediaFrom.small`
    flex: 0 0 50px;
    margin-right: 15px;
    padding: 14px 10px;
    
    font-size: 20px;
  `}
`;

export const LabelStyled = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: 0;
  left: 50%;
  height: 18px;
  width: 48px;

  background: ${props => (props.label === 'New' ? ConfirmColor : MainColor)};
  border-radius: 10px;

  color: ${White};
  font-size: 9px;
  font-weight: 600;

  transform: translate(-50%, -10px);
`;
