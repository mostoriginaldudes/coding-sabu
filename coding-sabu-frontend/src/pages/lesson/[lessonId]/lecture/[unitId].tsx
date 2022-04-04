import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useCallback, useMemo } from 'react';
import styled from '@emotion/styled';
import UnderlineTitle from 'components/UnderlineTitle';
import LectureUnitList from 'components/LectureUnitList';
import LectureContent from 'components/LectureContent';
import Loader from 'components/Loader';
import PageHead from 'components/PageHead';
import useFetchLessonList from 'hooks/useFetchLessonList';
import useRedux from 'hooks/useRedux';
import { wrapper } from 'store';
import { fetchLecture } from 'store/lecture';
import type { Lesson } from 'types';
import { showAuthForm, showHud } from 'store/ui';
import AUTH_FAIL from 'fixtures/auth/fail';
import LESSON_FAIL from 'fixtures/lesson/fail';

const LectureWrapper = styled.div`
  display: flex;
`;

interface Props {
  lessonId: number;
  unitId: number;
}

const LecturePage: NextPage<Props> = ({ lessonId, unitId }) => {
  const router = useRouter();

  const [, lessons] = useFetchLessonList('lessons');
  const [, myJoiningLessons] = useFetchLessonList('myJoiningLessons');
  const [, myTeachingLessons] = useFetchLessonList('myTeachingLessons');

  const { useAppDispatch, useAppSelector } = useRedux();
  const { user, lecture } = useAppSelector(state => ({
    user: state.auth.user,
    lecture: state.lecture.lectureUnits
  }));

  const dispatch = useAppDispatch();

  const lesson = useMemo(() => lessons.find((lesson: Lesson) => lesson.id === lessonId || ''), []);

  const content = useMemo(() => lecture.data?.find(unit => unit.id === unitId)?.content, []);

  const isLoggedIn = useMemo(() => Boolean(user.data), [user.data]);

  const relatedClass = useMemo(
    () =>
      Boolean([...myJoiningLessons, ...myTeachingLessons].find(lesson => lesson.id === lessonId)),
    [user.data]
  );

  const requireLogin = useCallback(() => {
    dispatch(showHud(AUTH_FAIL.REQUIRED_LOGIN));
    dispatch(showAuthForm());
  }, []);

  const requireRegisterLesson = useCallback(() => {
    dispatch(showHud(LESSON_FAIL.REQUIRED_REGISTER));
    router.replace(`/lesson/${lessonId}`);
  }, []);

  const showLectureAfterCheckIfAllowed = useCallback(() => {
    if (!isLoggedIn) requireLogin();
    else if (!relatedClass) requireRegisterLesson();
    else dispatch(fetchLecture(lessonId));
  }, [user.data]);

  useEffect(() => {
    showLectureAfterCheckIfAllowed();
  }, [showLectureAfterCheckIfAllowed]);

  return (
    <div>
      <PageHead title="수련 비급" />
      <Loader loading={lecture.loading} />
      {lesson && lecture.data && (
        <>
          <UnderlineTitle title={lesson?.title || ''} />
          <LectureWrapper>
            <LectureUnitList lecture={lecture.data} lessonId={lessonId} />
            <LectureContent key={unitId} content={content} />
          </LectureWrapper>
        </>
      )}
    </div>
  );
};

export default LecturePage;

export const getServerSideProps = wrapper.getStaticProps(store => async ({ params }) => {
  const lessonIdStr = params?.lessonId as string;
  const unitIdStr = params?.unitId as string;

  const lessonId = parseInt(lessonIdStr);
  const unitId = parseInt(unitIdStr);
  await store.dispatch(fetchLecture(lessonId));

  return {
    props: {
      lessonId,
      unitId
    }
  };
});
