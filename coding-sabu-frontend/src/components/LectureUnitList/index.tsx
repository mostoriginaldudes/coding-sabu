import React from 'react';
import { NavLink } from 'react-router-dom';
import { Lecture as LectureInfo } from 'types';
import * as Styled from './LectureUnitList.style';
interface Props {
  readonly lecture: LectureInfo[];
  readonly lessonId: number;
}

const LectureUnitList: React.FC<Props> = ({ lecture, lessonId }) => {
  return (
    <Styled.UnitListContainer>
      {lecture.map(({ id, unit }: LectureInfo) => (
        <Styled.UnitList key={id}>
          <NavLink to={`/lesson/${lessonId}/lecture/${id}`}>{unit}</NavLink>
        </Styled.UnitList>
      ))}
    </Styled.UnitListContainer>
  );
};

export default LectureUnitList;
