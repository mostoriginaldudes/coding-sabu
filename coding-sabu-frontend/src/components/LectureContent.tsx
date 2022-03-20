import dynamic from 'next/dynamic';
import { FC } from 'react';
import * as Styled from 'styles/LectureContent';

const Viewer = dynamic(() => import('components/Viewer'), { ssr: false });

interface Props {
  content: string | undefined;
}

const LectureContent: FC<Props> = ({ content }) => {
  return (
    <Styled.ContentWrapper>
      <Viewer description={content || ''} />
    </Styled.ContentWrapper>
  );
};

export default LectureContent;
