import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from '@emotion/styled';
import { colors, media } from 'styles/theme';
import { Lecture as LectureInfo } from 'types';

const UnitListContainer = styled.ol`
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

const UnitList = styled.li`
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

interface Props {
  readonly lecture: LectureInfo[];
  readonly lessonId: number;
}

const LectureUnitList: React.FC<Props> = ({ lecture, lessonId }) => {
  return (
    <UnitListContainer>
      {lecture.map(({ id, unit }: LectureInfo) => (
        <UnitList key={id}>
          <NavLink to={`/lesson/${lessonId}/lecture/${id}`}>{unit}</NavLink>
        </UnitList>
      ))}
    </UnitListContainer>
  );
};

export default LectureUnitList;
