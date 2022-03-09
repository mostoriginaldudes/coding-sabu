import styled from '@emotion/styled';
import { media } from 'styles/modules/theme';
import { flexCenter } from 'styles/modules/common';

export const LessonListContainer = styled.ol`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;
  margin-bottom: 20px;
  ${media.tablet`
    grid-template-columns: repeat(1, 1fr);
  `}
`;

export const LessonListElement = styled.li`
  ${flexCenter}
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
`;

export const TargetElement = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
