import React, { useEffect, useCallback, useMemo } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styled from '@emotion/styled';
import LessonList from 'components/LessonList';
import Button from 'components/Button';
import useRouting from 'hooks/useRouting';
import { RootState } from 'store';
import { createActionFetchMyTeachingLessons } from 'store/lesson';
import UnderlineTitle from 'styles/UnderlineTitle';

const Container = styled.div`
  position: relative;
`;

const CreateLessonButton = styled(Button)`
  position: absolute;
  right: 0;
  font-weight: bold;
`;

const MyTeachingLessons: React.FC = () => {
  const { forward } = useRouting();
  const { user, myTeachingLessons } = useSelector((state: RootState) => ({
    user: state.auth.user,
    myTeachingLessons: state.lesson.myTeachingLessons
  }));
  const dispatch = useDispatch();

  const isNotTeacher = useMemo(() => user.data?.userType !== 'teacher', [user]);

  const fetchMyTeachingLessons = useCallback(() => {
    dispatch(createActionFetchMyTeachingLessons());
  }, [dispatch]);

  const goToLessonForm = useCallback(() => {
    forward('/lesson/form');
  }, [forward]);

  useEffect(() => {
    fetchMyTeachingLessons();
  }, [fetchMyTeachingLessons]);

  return (
    <Container>
      {isNotTeacher && <Redirect to="/" />}
      <CreateLessonButton
        color="black"
        height={2}
        radius={10}
        onClick={goToLessonForm}
      >
        수련 개설
      </CreateLessonButton>
      <UnderlineTitle title="내 가르침 목록" />
      {myTeachingLessons && myTeachingLessons.data && (
        <LessonList lessons={myTeachingLessons.data} />
      )}
    </Container>
  );
};

export default React.memo(MyTeachingLessons);
