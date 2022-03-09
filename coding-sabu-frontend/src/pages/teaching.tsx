import { useEffect, useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store';
import { fetchMyTeachingLessons } from 'store/lesson';
import * as Styled from 'styles/MyTeachingLessons';
import LessonList from 'components/LessonList';
import UnderlineTitle from 'components/UnderlineTitle';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function MyTeachingLessons() {
  const router = useRouter();
  const { user, myTeachingLessons } = useSelector((state: RootState) => ({
    user: state.auth.user,
    myTeachingLessons: state.lesson.myTeachingLessons
  }));
  const dispatch = useDispatch();

  const isNotTeacher = useMemo(() => user.data?.userType !== 'teacher', [user]);

  const dispatchFetchMyTeachingLessons = useCallback(() => {
    dispatch(fetchMyTeachingLessons());
  }, [dispatch]);

  const goToLessonForm = useCallback(() => {
    router.push('/lesson/form');
  }, []);

  useEffect(() => {
    isNotTeacher && router.replace('/');
  }, [isNotTeacher]);

  useEffect(() => {
    dispatchFetchMyTeachingLessons();
  }, [dispatchFetchMyTeachingLessons]);

  return (
    <div>
      <Head>
        <title>내 가르침 | 코딩사부</title>
      </Head>
      <Styled.Container>
        <Styled.CreateLessonButton color="black" height={2} radius={10} onClick={goToLessonForm}>
          수련 개설
        </Styled.CreateLessonButton>
        <UnderlineTitle title="내 가르침 목록" />
        {myTeachingLessons && myTeachingLessons.data && (
          <LessonList lessons={myTeachingLessons.data} />
        )}
      </Styled.Container>
    </div>
  );
}
