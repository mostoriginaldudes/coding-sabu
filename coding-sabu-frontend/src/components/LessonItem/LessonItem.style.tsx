import styled from '@emotion/styled';
import { flexCenter } from 'styles/module';
import { colors, media } from 'styles/theme';

const width = 200;
const height = 300;
const thumbnailHeight = 170;

export const LessonContainer = styled.div`
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

export const Thumbnail = styled.section<{ thumbnailUrl: string }>`
  width: 100%;
  height: ${thumbnailHeight}px;
  background-image: url(${({ thumbnailUrl }) => thumbnailUrl});
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

export const LessonInfo = styled.div`
  ${flexCenter}
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  height: calc(100% - ${thumbnailHeight}px);
  padding: 10px;
`;

export const LessonHeader = styled.header`
  display: flex;
  flex-direction: column;
  width: 100%;
  font-weight: bold;
`;

export const LessonTitle = styled.h4`
  margin: 0 0 10px;
  text-overflow: ellipsis;
  overflow: hidden;
`;

export const TeacherName = styled.h5`
  width: 100%;
  align-self: flex-end;
  margin: 0;
  text-align: right;
  text-overflow: ellipsis;
  overflow: hidden;
  color: ${colors.gray[6]};
`;

export const LessonFooter = styled.footer`
  ${flexCenter}
  justify-content: space-between;
  width: 100%;
`;

export const EmpahsisBlock = styled.div`
  padding: 5px;
  border-radius: 5px;
  background-color: ${colors.yellow[4]};
`;

export const EmphasisText = styled.div`
  font-size: 1rem;
  font-weight: bold;
`;
