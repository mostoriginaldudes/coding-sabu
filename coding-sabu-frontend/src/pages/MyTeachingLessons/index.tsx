import { FC, useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import styled from '@emotion/styled';

import { fetchLessons } from 'apis';
import LessonList from 'components/LessonList';
import { Lesson } from 'types';
import UnderlineTitle from 'styles/UnderlineTitle';
import Button from 'components/Button';

const Container = styled.div`
  position: relative;
`;
const CreateLessonButton = styled(Button)`
  position: absolute;
  right: 0;
  font-weight: bold;
`;

const MyTeachingLessons: FC = () => {
  const history = useHistory();
  const [teachingLessons, setTeachingLessons] = useState<Lesson[]>([]);

  const fetchMyTeachingLessons = useCallback(async () => {
    const lessons = await fetchLessons();
    setTeachingLessons(lessons.data);
  }, [setTeachingLessons]);

  const goToLessonForm = useCallback(() => {
    history.push('/lesson/form');
  }, [history]);

  useEffect(() => {
    fetchMyTeachingLessons();
  }, [fetchMyTeachingLessons]);

  return (
    <Container>
      <CreateLessonButton
        color="black"
        height={2}
        radius={10}
        onClick={goToLessonForm}
      >
        수련 개설
      </CreateLessonButton>
      <UnderlineTitle title="내 가르침" />
      <LessonList lessons={teachingLessons} />
    </Container>
  );
};

export default MyTeachingLessons;
