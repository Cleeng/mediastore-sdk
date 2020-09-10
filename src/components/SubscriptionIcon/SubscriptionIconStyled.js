import styled from 'styled-components';
import { mediaFrom } from 'styles/BreakPoints';
import { BoldFont } from 'styles/variables';

const WrapperStyled = styled.div`
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

export default WrapperStyled;
