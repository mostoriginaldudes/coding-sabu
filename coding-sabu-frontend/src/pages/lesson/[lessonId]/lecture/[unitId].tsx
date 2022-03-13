import { NextPage } from 'next';
import { useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import styled from '@emotion/styled';
import { RootState, ThunkAsyncState } from 'store';
import { fetchLecture } from 'store/lecture';
import { Lecture, Lesson } from 'types';
import UnderlineTitle from 'components/UnderlineTitle';
import LectureUnitList from 'components/LectureUnitList';
import LectureContent from 'components/LectureContent';
import Loader from 'components/Loader';
import Head from 'next/head';

const LectureWrapper = styled.div`
  display: flex;
`;

const Lecture: NextPage = () => {
  const { lessons, lecture } = useSelector((state: RootState) => ({
    lessons: state.lesson.myTeachingLessons as ThunkAsyncState<Lesson[]>,
    lecture: state.lecture.lectureUnits as ThunkAsyncState<Lecture[]>
  }));
  const dispatch = useDispatch();

  const router = useRouter();
  const { lessonId, unitId } = router.query as { lessonId: string; unitId: string };

  const lesson = useMemo(
    () => lessons.data?.find((lesson: Lesson) => lesson.id === parseInt(lessonId)),
    [lessons, lessonId]
  );

  const content = useMemo(
    () => lecture.data?.find(unit => unit.id === parseInt(unitId))?.content,
    [lecture, unitId]
  );

  useEffect(() => {
    dispatch(fetchLecture(parseInt(lessonId)));
  }, []);

  return (
    <div>
      <Head>
        <title>수련 비급 | 코딩사부</title>
      </Head>
      <Loader loading={lecture.loading} />
      {lesson && lecture.data && (
        <>
          <UnderlineTitle title={lesson?.title} />
          <LectureWrapper>
            <LectureUnitList lecture={lecture.data} lessonId={parseInt(lessonId)} />
            <LectureContent key={unitId} content={content} />
          </LectureWrapper>
        </>
      )}
    </div>
  );
};

export default Lecture;

export async function getServerSideProps() {
  return {
    props: {}
  };
}
