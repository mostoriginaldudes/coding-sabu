import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { media } from './theme';

export const flexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const positionFixed = css`
  position: fixed;
  top: 0;
  left: 0;
`;

export const FlexRow = styled.div`
  ${flexCenter}
`;

export const FlexCol = styled.div`
  ${flexCenter}
  flex-direction: column;
`;

export const Row = styled.div`
  ${flexCenter}
  justify-content: space-between;
  width: 100%;
  margin: 1em 0;

  ${media.tablet`
    flex-direction: column;
  `}

  & > div {
    width: 100%;
  }

  & > button {
    width: 45%;

    ${media.tablet`
      width: 100%;
      margin: 5px 0;
    `}
  }
`;
