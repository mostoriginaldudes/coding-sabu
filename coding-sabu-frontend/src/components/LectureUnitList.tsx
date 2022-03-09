import { FC } from 'react';
import Link from 'next/link';
import { Lecture as LectureInfo } from 'types';
import * as Styled from 'styles/LectureUnitList';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { useCallback } from 'react';
interface Props {
  readonly lecture: LectureInfo[];
  readonly lessonId: number;
}

const LectureUnitList: FC<Props> = ({ lecture, lessonId }) => {
  const { asPath } = useRouter();

  const activeClassName = useCallback(
    (id: number) => (asPath === `/lesson/${lessonId}/lecture/${id}` ? 'active' : ''),
    [asPath]
  );

  return (
    <Styled.UnitListContainer>
      {lecture.map(({ id, unit }: LectureInfo) => (
        <Styled.UnitList key={id}>
          <Link href={`/lesson/${lessonId}/lecture/${id}`}>
            <a className={activeClassName(id)}>{unit}</a>
          </Link>
        </Styled.UnitList>
      ))}
    </Styled.UnitListContainer>
  );
};

export default LectureUnitList;
