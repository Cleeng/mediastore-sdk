import styled from 'styled-components';
import { mediaFrom } from 'styles/BreakPoints';
import { White, BackgroundColor } from 'styles/variables';

export const WrapperStyled = styled.div.attrs(() => ({
  className: 'msd__account-wrapper'
}))`
  position: relative;
  display: flex;
  flex-direction: column;

  height: 100%;
  min-height: 100vh;

  padding-top: 44px;

  background-color: ${White};

  ${mediaFrom.small`
    flex-direction: row;
    min-height: ${props => (props.hosted ? '100vh' : 'unset')};
    height: ${props => (props.hosted ? '100vh' : '700px')};

    padding: 0;
  `}
`;

export const HeaderStyled = styled.div.attrs(() => ({
  className: 'msd__account-sidebar'
}))`
  position: relative;
  padding: 0 26px;
  overflow: hidden;

  background: ${BackgroundColor};

  footer {
    display: none;
  }

  ${mediaFrom.small`
    width: 288px;
    padding: 30px 34px;

    footer {
      display: block;
      padding: 23px 34px;
    }
  `}
`;

export const ScrollBarWrapper = styled.div`
  width: 100%;
`;
