import { useRouter } from 'next/router';
import { useEffect, useCallback, useMemo } from 'react';
import LessonList from 'components/LessonList';
import Loader from 'components/Loader';
import UnderlineTitle from 'components/UnderlineTitle';
import PageHead from 'components/PageHead';
import useRedux from 'hooks/useRedux';
import { wrapper } from 'store';
import { fetchMyTeachingLessons } from 'store/lesson';
import * as Styled from 'styles/MyTeachingLessons';
import useFetchLessonList from 'hooks/useFetchLessonList';

export default function MyTeachingLessons() {
  const { useAppSelector } = useRedux();
  const user = useAppSelector(state => state.auth.user);

  const [loading, myTeachingLessons] = useFetchLessonList('myTeachingLessons');

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
        <Loader loading={loading} />
        <LessonList lessons={myTeachingLessons} />
      </Styled.Container>
    </div>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(store => async () => {
  await store.dispatch(fetchMyTeachingLessons());

  return {
    props: {}
  };
});
