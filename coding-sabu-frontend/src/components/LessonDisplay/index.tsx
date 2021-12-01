import { FC } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { colors, media } from 'styles/theme';
import { Lesson } from 'types';
import { flexCenter } from 'styles/module';
import { Link } from 'react-router-dom';
import { EmphasisText, PageTitle } from 'components/LessonList';

const cardBorder = css`
  border: 3px solid ${colors.black};
  border-radius: 5px;
  padding: 2em;
`;

const LessonsDisplayContainer = styled.ul`
  ${flexCenter}
  width: 100%;
  height: 500px;
  margin-bottom: 5rem;
  padding: 20px 30px;
  position: relative;
  overflow: hidden;
  letter-spacing: 0.1em;
  & > li {
    margin: 10px;
    border-radius: 5px;
  }
  & > button {
    background-color: ${colors.yellow[4]};
  }
  ${media.tablet`
    display: none;
  `};
`;

type ImagePath = { imagePath: string | undefined };
const LessonDisplayThumbnail = styled.li<ImagePath>`
  width: 50%;
  height: 100%;
  background-image: url(${({ imagePath }) => imagePath});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const LessonDisplayInfo = styled.li`
  ${flexCenter}
  flex-direction: column;
  justify-content: space-between;
  width: 50%;
  height: 100%;

  & > div {
    ${flexCenter}
    ${cardBorder}
    justify-content: space-between;
    width: 100%;
    margin-bottom: 20px;

    & > h2,
    h3 {
      width: 230px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }

    & > h3 {
      text-align: right;
    }
  }

  & > article {
    ${cardBorder}
    display:flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
    height: 100%;

    & > p {
      display: -webkit-box;
      width: 100%;
      height: 194px;
      margin: 0;
      font-size: 0.8em;
      text-overflow: ellipsis;
      line-height: 1.5em;
      white-space: normal;
      -webkit-line-clamp: 10;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    & > button {
      background-color: ${colors.yellow[4]};
      border: none;
      padding: 0.7em;
      font-weight: bold;
      border-radius: 5px;
      border: 2px solid ${colors.black};
      cursor: pointer;
    }
  }
`;

interface Props {
  displayedLesson: Lesson | null;
}

const LessonDisplay: FC<Props> = ({ displayedLesson }) => {
  if (displayedLesson) {
    const {
      lessonId,
      lessonThumbnailPath,
      lessonTitle,
      lessonDescription,
      teacher
    } = displayedLesson;

    return (
      <>
        <PageTitle>
          <EmphasisText>추천하는 수련</EmphasisText>
        </PageTitle>
        <LessonsDisplayContainer>
          <LessonDisplayThumbnail imagePath={lessonThumbnailPath} />
          <LessonDisplayInfo>
            <div>
              <h2>{lessonTitle}</h2>
              <h3>{teacher}</h3>
            </div>
            <article>
              <p>{lessonDescription}</p>
              <button>
                <Link to={`/lesson/${lessonId}`}>자세히 보기</Link>
              </button>
            </article>
          </LessonDisplayInfo>
        </LessonsDisplayContainer>
      </>
    );
  }
  return <></>;
};

export default LessonDisplay;
