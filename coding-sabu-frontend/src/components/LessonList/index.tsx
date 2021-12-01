import { FC, memo } from 'react';
import styled from '@emotion/styled';
import { media } from 'styles/theme';
import Lesson, { Props as ILesson } from 'components/Lesson';
import { flexCenter } from 'styles/module';

export const PageTitle = styled.header`
  width: 100%;
  text-align: left;
  border-bottom: 1px solid #707070;
  padding-bottom: 20px;
  margin-bottom: 20px;
`;

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
  lessons: ILesson[];
  setDisplayedLesson: (lesson: ILesson) => void;
}

const LessonList: FC<Props> = ({ lessons, setDisplayedLesson }) => {
  const pickOneLesson = (lesson: ILesson) => {
    setDisplayedLesson(lesson);
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  return (
    <>
      <PageTitle>
        <EmphasisText>수련 목록</EmphasisText>
      </PageTitle>
      <LessonListContainer>
        {lessons.map((lesson, index) => (
          <LessonListElement key={index} onClick={() => pickOneLesson(lesson)}>
            <Lesson {...lesson} />
          </LessonListElement>
        ))}
      </LessonListContainer>
    </>
  );
};

export default memo(LessonList);
