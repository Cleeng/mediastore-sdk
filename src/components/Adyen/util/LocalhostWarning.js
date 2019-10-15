/* istanbul ignore file */
import React from 'react';
import styled from 'styled-components';

const LOCALHOST = 'localhost';
const DEV_CLEENG_COM = 'dev.cleeng.com';

const ParagraphStyled = styled.p`
  margin: 10px;
`;
const LinkStyled = styled.a`
  color: #1a0dab;
`;

const LocalhostWarning = () => {
  const {
    location: { hostname, href }
  } = window.top;

  if (hostname !== LOCALHOST) {
    return null;
  }

  const redirectHref = href.replace(LOCALHOST, DEV_CLEENG_COM);
  return (
    <div
      style={{
        background: 'lightyellow',
        border: 'solid 1px black',
        marginBottom: 40
      }}
    >
      <ParagraphStyled>
        Ayden will not work when accessed via http://localhost/.
      </ParagraphStyled>
      <ParagraphStyled>
        Make sure you have added &quot;127.0.0.1 dev.cleeng.com&quot; to
        /etc/hosts
      </ParagraphStyled>
      <ParagraphStyled>
        Then go to: <LinkStyled href={redirectHref}>{redirectHref}</LinkStyled>
      </ParagraphStyled>
    </div>
  );
};
export default LocalhostWarning;
