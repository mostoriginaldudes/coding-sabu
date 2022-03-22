import { useRouter } from 'next/router';
import { useEffect, useCallback, useMemo } from 'react';
import LessonList from 'components/LessonList';
import UnderlineTitle from 'components/UnderlineTitle';
import PageHead from 'components/PageHead';
import useRedux from 'hooks/useRedux';
import * as Styled from 'styles/MyTeachingLessons';

export default function MyTeachingLessons() {
  const { useAppSelector } = useRedux();
  const { user, myTeachingLessons } = useAppSelector(state => ({
    user: state.auth.user,
    myTeachingLessons: state.lesson.myTeachingLessons
  }));

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
