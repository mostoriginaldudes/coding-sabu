import styled from '@emotion/styled';
import { colors, media } from 'styles/theme';

export const UnitListContainer = styled.ol`
  width: 30%;
  height: 100%;
  max-height: 100vh;
  padding-right: var(--element-gap);
  position: sticky;
  top: 83px;
  font-size: 0.8rem;
  color: ${colors.gray[7]};
  ${media.tablet`
    display: none;
  `}
`;

export const UnitList = styled.li`
  margin-bottom: var(--element-gap);
  cursor: pointer;

  & > a {
    display: inline-block;
    width: 100%;
    height: 100%;
    color: ${colors.gray[6]};
    transition: all 500ms ease-in-out;
    word-break: break-word;
    &.active {
      font-size: 1.1rem;
      color: ${colors.black};
      text-decoration: underline 2px ${colors.yellow[4]};
      transition: font-size 500ms ease-in-out;
    }
  }
`;
