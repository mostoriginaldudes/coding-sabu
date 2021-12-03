import { FC, memo } from 'react';
import styled from '@emotion/styled';
import { flexCenter } from 'styles/module';
import { colors, media } from '../../styles/theme';
import { Lesson } from 'types';

const width = 200;
const height = 300;
const thumbnailHeight = 170;

const LessonContainer = styled.div`
  width: ${width}px;
  height: ${height}px;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 1px 12px 15px -4px rgba(0, 0, 0, 0.62);
  &:hover {
    box-shadow: 1px 12px 15px 0px rgba(0, 0, 0, 0.62);
    transition: box-shadow 250ms ease;
  }
  &:active {
    box-shadow: 1px 12px 15px -4px rgba(0, 0, 0, 0.3);
    transition: box-shadow 200ms ease;
  }
  ${media.tablet`
    width: 100%;
    height: 100%;
    margin: 0;
    border-radius: 0;
  `}
`;

const Thumbnail = styled.section<{ lessonThumbnailPath: string }>`
  width: 100%;
  height: ${thumbnailHeight}px;
  background-image: url(${({ lessonThumbnailPath }) => lessonThumbnailPath});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;

  ${media.tablet`
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  `}
`;

const LessonInfo = styled.div`
  ${flexCenter}
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  height: calc(100% - ${thumbnailHeight}px);
  padding: 10px;
`;

const LessonHeader = styled.header`
  ${flexCenter}
  justify-content: space-between;
  width: 100%;
  font-weight: bold;
`;

const LessonTitle = styled.h4`
  margin: 0;
`;

const TeacherName = styled.h5`
  margin: 0;
`;

const Description = styled.article`
  display: -webkit-box;
  width: 100%;
  font-size: 0.8em;
  line-height: 1.25em;
  white-space: normal;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  margin: 10px 0;
  ${media.tablet`
    -webkit-line-clamp: 4;
  `}
`;

const LessonFooter = styled.footer`
  ${flexCenter}
  justify-content: space-between;
  width: 100%;
`;

const EmpahsisBlock = styled.div`
  padding: 5px;
  border-radius: 5px;
  background-color: ${colors.yellow[4]};
`;

const EmphasisText = styled.div`
  font-size: 1rem;
  font-weight: bold;
`;

export interface Props {
  lessonId: number;
  lessonThumbnailPath: string;
  lessonTitle: string;
  lessonDescription: string;
  teacher: string;
  studentCount: number;
  lessonPrice: number;
}

const LessonItem: FC<Lesson> = ({
  lessonThumbnailPath,
  lessonTitle,
  lessonDescription,
  teacher,
  studentCount,
  lessonPrice
}) => {
  return (
    <LessonContainer>
      <Thumbnail lessonThumbnailPath={lessonThumbnailPath} />
      <LessonInfo>
        <LessonHeader>
          <LessonTitle>{lessonTitle}</LessonTitle>
          <TeacherName>{teacher}</TeacherName>
        </LessonHeader>
        <Description>{lessonDescription}</Description>
        <LessonFooter>
          <EmpahsisBlock>{studentCount}명</EmpahsisBlock>
          <EmphasisText>{lessonPrice.toLocaleString()}원</EmphasisText>
        </LessonFooter>
      </LessonInfo>
    </LessonContainer>
  );
};

export default memo(LessonItem);
