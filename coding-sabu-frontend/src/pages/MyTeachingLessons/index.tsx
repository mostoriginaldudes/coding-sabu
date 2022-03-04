import { useEffect, useCallback, useMemo, FC, memo } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import LessonList from 'components/LessonList';
import useRouting from 'hooks/useRouting';
import { RootState } from 'store';
import { fetchMyTeachingLessons } from 'store/lesson';
import UnderlineTitle from 'styles/UnderlineTitle';
import * as Styled from './MyTeachingLessons.style';

const MyTeachingLessons: FC = () => {
  const { forward } = useRouting();
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
    forward('/lesson/form');
  }, [forward]);

  useEffect(() => {
    dispatchFetchMyTeachingLessons();
  }, [dispatchFetchMyTeachingLessons]);

  return (
    <Styled.Container>
      {isNotTeacher && <Redirect to="/" />}
      <Styled.CreateLessonButton
        color="black"
        height={2}
        radius={10}
        onClick={goToLessonForm}
      >
        수련 개설
      </Styled.CreateLessonButton>
      <UnderlineTitle title="내 가르침 목록" />
      {myTeachingLessons && myTeachingLessons.data && (
        <LessonList lessons={myTeachingLessons.data} />
      )}
    </Styled.Container>
  );
};

export default memo(MyTeachingLessons);
