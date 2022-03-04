import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import styled from '@emotion/styled';
import Viewer from 'components/Viewer';
import { colors, media } from 'styles/theme';

const ContentWrapper = styled.div`
  width: 100%;
  padding-left: var(--element-gap);
  border-left: 1px solid ${colors.black};
  line-height: 1.5em;
  ${media.tablet`
    padding-left: 0;
    border-left: none;
  `}
`;

interface Props extends RouteComponentProps {
  content: string;
}

const LectureContent: React.FC<Props> = ({ content }) => {
  return (
    <ContentWrapper>
      <Viewer description={content} />
    </ContentWrapper>
  );
};

export default LectureContent;
