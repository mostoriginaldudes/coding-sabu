import { useEffect, useCallback, useMemo } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { RootState, ThunkAsyncState } from 'store';
import useFetchLessonList from 'hooks/useFetchLessonList';
import LessonList from 'components/LessonList';
import UnderlineTitle from 'components/UnderlineTitle';
import * as Styled from 'styles/MyTeachingLessons';
import { User } from 'types';

export default function MyTeachingLessons() {
  const user = useSelector((state: RootState) => state.auth.user as ThunkAsyncState<User>);
  const [_, lessons] = useFetchLessonList('myTeachingLessons');

  const router = useRouter();
  const goToLessonForm = useCallback(() => router.push('/lesson/form'), []);
  const isNotTeacher = useMemo(() => user.data?.userType !== 'teacher', [user]);

  useEffect(() => {
    isNotTeacher && router.replace('/');
  }, [isNotTeacher]);

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
        <LessonList lessons={lessons} />
      </Styled.Container>
    </div>
  );
}
