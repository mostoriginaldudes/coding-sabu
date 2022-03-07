import React from 'react';
import LessonItem from 'components/LessonItem';
import useRouting from 'hooks/useRouting';
import { Lesson } from 'types';
import * as Styled from './LessonList.style';
import Loader from 'components/Loader';

interface Props {
  lessons: Lesson[];
}

const LessonList: React.FC<Props> = ({ lessons }) => {
  const { forward } = useRouting();

  const pickOneLesson = (lessonId: Lesson['id']) => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    forward(`/lesson/${lessonId}`);
  };

  return (
    <Styled.LessonListContainer>
      {lessons.map((lesson, index) => (
        <Styled.LessonListElement key={index} onClick={() => pickOneLesson(lesson.id)}>
          <LessonItem {...lesson} />
        </Styled.LessonListElement>
      ))}
    </Styled.LessonListContainer>
  );
};

export default React.memo(LessonList);
