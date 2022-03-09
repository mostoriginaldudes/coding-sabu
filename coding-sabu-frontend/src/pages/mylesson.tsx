import { useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store';
import { fetchMyJoiningLessons } from 'store/lesson';
import { showHud } from 'store/ui';
import LessonList from 'components/LessonList';
import UnderlineTitle from 'components/UnderlineTitle';
import Loader from 'components/Loader';
import { Lesson } from 'types';
import AUTH_FAIL from 'fixtures/auth/fail';
import Head from 'next/head';

export default function MyJoiningLessons() {
  const { loading, data, error } = useSelector((state: RootState) => state.lesson.myJoiningLessons);
  const dispatch = useDispatch();

  const dispatchMyJoiningLessons = useCallback(() => dispatch(fetchMyJoiningLessons()), [dispatch]);

  const myJoiningLessonList = useMemo(() => (data === null ? ([] as Lesson[]) : data), [data]);

  const router = useRouter();
  useEffect(() => {
    if (error) {
      dispatch(showHud(AUTH_FAIL.UNAUTHORIZED));
    }
  }, [error]);

  useEffect(() => {
    dispatchMyJoiningLessons();
  }, [dispatchMyJoiningLessons]);

  return (
    <div>
      <Head>
        <title>내 수련 목록 | 코딩사부</title>
      </Head>
      <UnderlineTitle title="내 수련 목록" />
      <Loader loading={loading} />
      <LessonList lessons={myJoiningLessonList} />
    </div>
  );
}
