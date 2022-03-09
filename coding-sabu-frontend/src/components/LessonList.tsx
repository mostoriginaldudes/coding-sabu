import { useState, FC, useEffect, useCallback } from 'react';
import LessonItem from 'components/LessonItem';
import { Lesson } from 'types';
import * as Styled from 'styles/LessonList';
import { useRouter } from 'next/router';

interface Props {
  lessons: Lesson[];
}

const LessonList: FC<Props> = ({ lessons }) => {
  const router = useRouter();
  const pickOneLesson = (lessonId: Lesson['id']) => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    router.push(`/lesson/${lessonId}`);
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

export default LessonList;
