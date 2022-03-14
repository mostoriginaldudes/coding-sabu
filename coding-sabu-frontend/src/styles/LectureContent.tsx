import styled from '@emotion/styled';
import { colors, media } from 'styles/modules/theme';

export const ContentWrapper = styled.div`
  width: 100%;
  min-height: calc(100vh - 300px);
  padding-left: var(--element-gap);
  border-left: 1px solid ${colors.black};
  line-height: 1.5em;
  ${media.tablet`
    padding-left: 0;
    border-left: none;
  `}
`;
