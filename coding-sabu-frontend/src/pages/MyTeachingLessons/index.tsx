import React, { useState, useEffect, useCallback, useMemo } from 'react';
import styled from '@emotion/styled';

import { fetchMyTeachingLessonList } from 'apis';
import LessonList from 'components/LessonList';
import { Lesson } from 'types';
import UnderlineTitle from 'styles/UnderlineTitle';
import Button from 'components/Button';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import useRouting from 'hooks/useRouting';
import { Redirect } from 'react-router-dom';

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
  const [teachingLessons, setTeachingLessons] = useState<Lesson[]>([]);
  const user = useSelector((state: RootState) => state.auth.user);

  const isNotTeacher = useMemo(() => user.data?.userType !== 'teacher', [user]);

  const fetchMyTeachingLessons = useCallback(async () => {
    const data = await fetchMyTeachingLessonList();
    setTeachingLessons(data.lessons);
  }, [setTeachingLessons]);

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
      <LessonList lessons={teachingLessons} />
    </Container>
  );
};

export default React.memo(MyTeachingLessons);
