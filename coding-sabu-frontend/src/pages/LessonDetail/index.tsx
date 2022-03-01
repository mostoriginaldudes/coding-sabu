import React, { useEffect, useCallback, useMemo } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import styled from '@emotion/styled';
import NotFound from 'pages/NotFound';
import Button from 'components/Button';
import TextBox from 'components/TextBox';
import Viewer from 'components/Viewer';
import Loader from 'styles/Loader';
import Row from 'styles/Row';
import UnderlineTitle from 'styles/UnderlineTitle';
import { flexCenter } from 'styles/module';
import useFetchLessonList from 'hooks/useFetchLessonList';
import useRouting from 'hooks/useRouting';
import { Lesson } from 'types';
import { concatHostToImagePath } from 'utils';

const ThumbnailContainer = styled.div<LessonThumbnail>`
  width: 45%;
  height: 270px;
  background-image: url(${({ imgUrl }) => imgUrl});
  background-size: auto;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 10px;
  & > label {
    ${flexCenter}
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  width: 45%;
`;

const ViewerContainer = styled(Column)`
  min-height: 200px;
`;

interface Props extends RouteComponentProps<{ id: string }> {}

const LessonDetail: React.FC<Props> = ({ match }) => {
  imgUrl?: string;
}

  const enrollLesson = async () => {
  const { id } = match.params;
  const { loading, data, error } = useFetchLessonList();
  const [lesson, setLesson] = useState<Lesson>();
  const thumbnailUrl = concatHostToImagePath(lesson?.thumbnailUrl);
  const { back } = useRouting();

  useEffect(() => {
    const [lessonToShow] = data?.filter(
      (lesson: Lesson) => lesson.id === parseInt(id)
    );
    setLesson(lessonToShow);
  }, [id, data, setLesson]);

  const joinToLesson = useCallback(() => {
    // TODO 사용자 인증 기능을 구현한 다음, 수강 신청 API 호출하도록 구현하기.
    back();
  }, [back]);

  return (
    <div>
      <Loader loading={loading} />
      {lesson && (
        <>
          <UnderlineTitle title={lesson.title} />
          <Row>
            <ThumbnailContainer imgUrl={thumbnailUrl} />
            <Column>
              {/* 사부명 클릭시 사부 상세 페이지로 */}
              <TextBox legend="사부명">유대상</TextBox>
              <TextBox legend="수련비용">1,000원</TextBox>
              <TextBox legend="수련생 수">1명</TextBox>
            </Column>
          </Row>
          <Row>
            <ViewerContainer>
              <h3>수련 설명</h3>
              <Viewer description={lesson.description} />
            </ViewerContainer>
          </Row>
          <Row>
            <Button color="yellow" radius={5} height={3} onClick={joinToLesson}>
              참가 신쳥
            </Button>
            <Button color="black" radius={5} height={3} onClick={back}>
              뒤로
            </Button>
          </Row>
        </>
      )}
      {error && <NotFound />}
    </div>
  );
};

export default React.memo(LessonDetail);
