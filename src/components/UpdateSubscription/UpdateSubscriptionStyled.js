import styled from 'styled-components';
import { MainColor, LineColor } from 'styles/variables';
import { media } from 'styles/BreakPoints';
import Card from 'components/Card';

export const SurveyCard = styled(Card)`
  border: 1px solid ${LineColor};
  height: 100%;
  min-height: 500px;
  display: flex;
  ${media.small`
    display: flex;
    align-items: flex-start;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    overflow-y: scroll;
  `};
`;

export const WrapperStyled = styled.div`
  padding: 30px 10px;
  margin: auto;
`;

export const ReasonsWrapper = styled.ul`
  margin: 30px 0;
`;

export const StyledItem = styled.li`
  margin: 0 0 20px 0;
  color: ${MainColor};

  font-size: 13px;
`;

export const Loader = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-color: #5cb85c;
  position: relative;
  display: inline-block;
  vertical-align: top;
  border-radius: 50%;
  width: 7em;
  height: 7em;
  transition: border 500ms ease-out;
  margin-bottom: 20px;
`;

export const StrongStyled = styled.strong`
  text-transform: uppercase;
`;
