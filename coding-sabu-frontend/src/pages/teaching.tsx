import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useCallback, useMemo } from 'react';
import LessonList from 'components/LessonList';
import Loader from 'components/Loader';
import UnderlineTitle from 'components/UnderlineTitle';
import PageHead from 'components/PageHead';
import { wrapper } from 'store';
import { fetchMyTeachingLessons } from 'store/lesson';
import * as Styled from 'styles/MyTeachingLessons';
import { Lesson, User } from 'types';

interface Props {
  lessonIsLoading: boolean;
  user: User | null;
  myTeachingLessons: Lesson[];
}

const MyTeachingLessons: NextPage<Props> = ({ lessonIsLoading, user, myTeachingLessons }) => {
  const router = useRouter();
  const goToLessonForm = useCallback(() => router.push('/lesson/form'), []);
  const isNotTeacher = useMemo(() => user?.userType !== 'teacher', [user]);

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
        <Loader loading={lessonIsLoading} />
        <LessonList lessons={myTeachingLessons} />
      </Styled.Container>
    </div>
  );
};

export default MyTeachingLessons;

export const getServerSideProps = wrapper.getServerSideProps(store => async () => {
  await store.dispatch(fetchMyTeachingLessons());

  const { data: user } = store.getState().auth.user;
  const { loading: lessonIsLoading, data: myTeachingLessons } =
    store.getState().lesson.myTeachingLessons;
  return {
    props: {
      user,
      lessonIsLoading,
      myTeachingLessons: myTeachingLessons || []
    }
  };
});
