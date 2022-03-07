import { FC } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Viewer from 'components/Viewer';
import * as Styled from './LectureContent.style';

interface Props extends RouteComponentProps {
  content: string;
}

const LectureContent: FC<Props> = ({ content }) => {
  return (
    <Styled.ContentWrapper>
      <Viewer description={content} />
    </Styled.ContentWrapper>
  );
};

export default LectureContent;
