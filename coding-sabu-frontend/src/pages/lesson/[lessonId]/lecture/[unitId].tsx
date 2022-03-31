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
import type { Lesson } from 'types';

const LectureWrapper = styled.div`
  display: flex;
`;

interface Props {
  lessonId: number;
  unitId: number;
}

const LecturePage: NextPage<Props> = ({ lessonId, unitId }) => {
  const { useAppDispatch, useAppSelector } = useRedux();
  const dispatch = useAppDispatch();
  const { lessons, lecture } = useAppSelector(state => ({
    lessons: state.lesson.lessons,
    lecture: state.lecture.lectureUnits
  }));

  const lesson = () => lessons.data?.find((lesson: Lesson) => lesson.id === lessonId || '');

  const content = () => lecture.data?.find(unit => unit.id === unitId)?.content;

  useEffect(() => {
    dispatch(fetchLecture(lessonId));
  }, []);

  return (
    <div>
      <PageHead title="수련 비급" />
      <Loader loading={lecture.loading} />
      {lesson() && lecture.data && (
        <>
          <UnderlineTitle title={lesson()!.title || ''} />
          <LectureWrapper>
            <LectureUnitList lecture={lecture.data} lessonId={lessonId} />
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

  const lessonIdNumber = parseInt(lessonId);
  store.dispatch(fetchLecture(lessonIdNumber));

  return {
    props: {
      lessonId: lessonIdNumber,
      unitId: parseInt(unitId)
    }
  };
});

export const getStaticPaths = () => {
  const { lessons } = store.getState().lesson;
  const { lectureUnits } = store.getState().lecture;

  type Paths = Array<{ params: { lessonId: number; unitId: number } }>;
  let paths: Paths = [];

  if (lessons.data && lectureUnits.data) {
    for (const lesson of lessons.data) {
      paths.concat(
        lectureUnits.data
          .filter(({ id }) => id === lesson.id)
          .map(({ id }) => ({
            params: {
              lessonId: lesson.id,
              unitId: id
            }
          }))
      );
    }
  }

  return {
    paths,
    fallback: true
  };
};
