import { useRouter } from 'next/router';
import { useEffect, useCallback, useMemo } from 'react';
import { ThunkAsyncState } from 'store';
import LessonList from 'components/LessonList';
import UnderlineTitle from 'components/UnderlineTitle';
import PageHead from 'components/PageHead';
import useRedux from 'hooks/useRedux';
import * as Styled from 'styles/MyTeachingLessons';
import { User } from 'types';

export default function MyTeachingLessons() {
  const { useAppSelector } = useRedux();
  const user = useAppSelector(state => state.auth.user as ThunkAsyncState<User>);
  const [_, lessons] = useFetchLessonList('myTeachingLessons');

  const router = useRouter();
  const goToLessonForm = useCallback(() => router.push('/lesson/form'), []);
  const isNotTeacher = useMemo(() => user.data?.userType !== 'teacher', [user]);

  useEffect(() => {
    isNotTeacher && router.replace('/');
  }, [isNotTeacher]);

  return (
    <div>
      <PageHead title="내 가르침" />
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
