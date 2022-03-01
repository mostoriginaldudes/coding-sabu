import React from 'react';
import styled from '@emotion/styled';
import LessonItem from 'components/LessonItem';
import useRouting from 'hooks/useRouting';
import { Lesson } from 'types';
import { media } from 'styles/theme';
import { flexCenter } from 'styles/module';

export const EmphasisText = styled.h3`
  font-size: 1.3rem;
  font-weight: bold;
`;

const LessonListContainer = styled.ol`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;
  margin-bottom: 20px;
  ${media.tablet`
    grid-template-columns: repeat(1, 1fr);
  `}
`;

const LessonListElement = styled.li`
  ${flexCenter}
  flex-direction: column;
  justify-content: space-between;
`;

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
    <>
      <LessonListContainer>
        {lessons.map((lesson, index) => (
          <LessonListElement
            key={index}
            onClick={() => pickOneLesson(lesson.id)}
          >
            <LessonItem {...lesson} />
          </LessonListElement>
        ))}
      </LessonListContainer>
    </>
  );
};

export default React.memo(LessonList);
