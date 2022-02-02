import { FC } from 'react';
import styled from '@emotion/styled';
import { media } from 'styles/theme';
import LessonItem from 'components/LessonItem';
import { Lesson } from 'types';
import { flexCenter } from 'styles/module';
import { RouteComponentProps, withRouter } from 'react-router-dom';

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

interface Props extends RouteComponentProps {
  lessons: Lesson[];
}

const LessonList: FC<Props> = ({ history, lessons }) => {
  const pickOneLesson = (lessonId: Lesson['lessonId']) => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    history.push(`/lesson/${lessonId}`);
  };

  return (
    <>
      <PageTitle>
        <EmphasisText>수련 목록</EmphasisText>
      </PageTitle>
      <LessonListContainer>
        {lessons.map((lesson, index) => (
          <LessonListElement
            key={index}
            onClick={() => pickOneLesson(lesson.lessonId)}
          >
            <LessonItem {...lesson} />
          </LessonListElement>
        ))}
      </LessonListContainer>
    </>
  );
};

export default withRouter(LessonList);
