import styled from '@emotion/styled';
import { css } from '@emotion/react';

export const flexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FlexRow = styled.div`
  ${flexCenter}
`;

export const FlexCol = styled.div`
  ${flexCenter}
  flex-direction: column;
`;
