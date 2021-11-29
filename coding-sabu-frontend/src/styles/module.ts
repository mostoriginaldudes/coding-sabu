import styled from '@emotion/styled';
import { css } from '@emotion/react';

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
