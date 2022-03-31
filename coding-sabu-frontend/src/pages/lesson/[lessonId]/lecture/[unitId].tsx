import { NextPage } from 'next';
import { useEffect } from 'react';
import styled from '@emotion/styled';
import UnderlineTitle from 'components/UnderlineTitle';
import LectureUnitList from 'components/LectureUnitList';
import LectureContent from 'components/LectureContent';
import Loader from 'components/Loader';
import PageHead from 'components/PageHead';
import useRedux from 'hooks/useRedux';
import { store, wrapper } from 'store';
import { fetchLecture } from 'store/lecture';
import type { Lecture, Lesson } from 'types';

const LectureWrapper = styled.div`
  display: flex;
`;

interface Props {
  lessonId: number;
  unitId: number;
  lessons: Lesson[] | null;
  loading: boolean;
  lecture: Lecture[] | null;
}

const LecturePage: NextPage<Props> = ({ lessonId, unitId, lessons, loading, lecture }) => {
  const { useAppDispatch } = useRedux();
  const dispatch = useAppDispatch();

  const lesson = () => lessons?.find((lesson: Lesson) => lesson.id === lessonId || '');

  const content = () => lecture?.find(unit => unit.id === unitId)?.content;

  useEffect(() => {
    dispatch(fetchLecture(lessonId));
  }, []);

  return (
    <div>
      <PageHead title="수련 비급" />
      <Loader loading={loading} />
      {lesson() && lecture && (
        <>
          <UnderlineTitle title={lesson()!.title || ''} />
          <LectureWrapper>
            <LectureUnitList lecture={lecture} lessonId={lessonId} />
            <LectureContent key={unitId} content={content()} />
          </LectureWrapper>
        </>
      )}
    </div>
  );
};

export default LecturePage;

export const getStaticProps = wrapper.getStaticProps(store => async ({ params }) => {
  const lessonId = params?.lessonId as string;
  const unitId = params?.unitId as string;

  const { data: lessons } = store.getState().lesson.lessons;
  const { loading, data: lecture } = store.getState().lecture.lectureUnits;

  const lessonIdNumber = parseInt(lessonId);
  store.dispatch(fetchLecture(lessonIdNumber));

  return {
    props: {
      lessonId: lessonIdNumber,
      unitId: parseInt(unitId),
      lessons,
      loading,
      lecture
    }
  };
});

export const getStaticPaths = () => {
  const { data: lessons } = store.getState().lesson.lessons;
  const { data: lectureUnits } = store.getState().lecture.lectureUnits;

  const paths = lessons && lectureUnits ? getRouteParams(lessons, lectureUnits) : [];

  return {
    paths,
    fallback: true
  };
};

function getRouteParams(lessons: Lesson[], lectureUnits: Lecture[]) {
  const paths: Array<{ params: { lessonId: number; unitId: number } }> = [];
  for (const lesson of lessons) {
    paths.push(
      ...lectureUnits
        .filter(({ id }) => id === lesson.id)
        .map(({ id }) => ({ params: { lessonId: lesson.id, unitId: id } }))
    );
  }
  return paths;
}
