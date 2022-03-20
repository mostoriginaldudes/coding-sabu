import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useEffect } from 'react';
import styled from '@emotion/styled';
import UnderlineTitle from 'components/UnderlineTitle';
import LectureUnitList from 'components/LectureUnitList';
import LectureContent from 'components/LectureContent';
import Loader from 'components/Loader';
import useRedux from 'hooks/useRedux';
import { ThunkAsyncState } from 'store';
import { fetchLecture } from 'store/lecture';
import type { Lecture, Lesson } from 'types';

const LectureWrapper = styled.div`
  display: flex;
`;

const LecturePage: NextPage = () => {
  const { useAppDispatch, useAppSelector } = useRedux();
  const { lessons, lecture } = useAppSelector(state => ({
    lessons: state.lesson.lessons as ThunkAsyncState<Lesson[]>,
    lecture: state.lecture.lectureUnits as ThunkAsyncState<Lecture[]>
  }));
  const dispatch = useAppDispatch();

  const router = useRouter();
  const { lessonId, unitId } = router.query as { lessonId: string; unitId: string };

  const lesson = () =>
    lessons.data?.find((lesson: Lesson) => lesson.id === parseInt(lessonId) || '');

  const content = () => lecture.data?.find(unit => unit.id === parseInt(unitId))?.content;
  useEffect(() => {
    dispatch(fetchLecture(parseInt(lessonId)));
  }, []);

  return (
    <div>
      <Head>
        <title>수련 비급 | 코딩사부</title>
      </Head>
      <Loader loading={lecture.loading} />
      {lesson() && lecture.data && (
        <>
          <UnderlineTitle title={lesson()!.title || ''} />
          <LectureWrapper>
            <LectureUnitList lecture={lecture.data} lessonId={parseInt(lessonId)} />
            <LectureContent key={unitId} content={content()} />
          </LectureWrapper>
        </>
      )}
    </div>
  );
};

export default LecturePage;

export async function getServerSideProps() {
  return {
    props: {}
  };
}
