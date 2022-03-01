import React, { useEffect, useCallback, useMemo } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styled from '@emotion/styled';
import NotFound from 'pages/NotFound';
import Button from 'components/Button';
import TextBox from 'components/TextBox';
import Viewer from 'components/Viewer';
import Loader from 'styles/Loader';
import Row from 'styles/Row';
import UnderlineTitle from 'styles/UnderlineTitle';
import { flexCenter } from 'styles/module';
import useRouting from 'hooks/useRouting';
import { concatHostToImagePath } from 'utils';

import { RootState } from 'store';
import {
  createActionFetchOneLesson,
  createActionJoinLesson
} from 'store/lesson';
import { colors } from 'styles/theme';
import { createActionVisibleAuthForm, createActionVisibleHud } from 'store/ui';
import AuthenticationError from 'errors/AuthenticationError';
import LESSON_SUCCESS from 'fixtures/lesson/success';
import LESSON_FAIL from 'fixtures/lesson/fail';
import AUTH_FAIL from 'fixtures/auth/fail';

interface LessonThumbnail {
  imgUrl?: string;
}

const ThumbnailContainer = styled.div<LessonThumbnail>`
  width: 45%;
  height: 270px;
  background-image: url(${({ imgUrl }) => imgUrl});
  background-size: contain;
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

const InfoContainer = styled(Column)`
  margin-left: 15px;
`;

const ViewerContainer = styled(Column)`
  min-height: 200px;
  border: 1px dashed ${colors.gray[6]};
  border-radius: 5px;
  padding: 5px 10px;
`;

interface Props extends RouteComponentProps<{ id: string }> {}

const LessonDetail: React.FC<Props> = ({ match }) => {
  const { id } = match.params;
  const { user, lesson, mylessons } = useSelector((state: RootState) => ({
    user: state.auth.user,
    lesson: state.lesson.lessonDetailInfo,
    mylessons: state.lesson.mylessons
  }));
  const dispatch = useDispatch();
  const thumbnailUrl = concatHostToImagePath(lesson.data?.thumbnailUrl);
  const { back } = useRouting();

  const fetchLesson = useCallback(
    (id: string) => {
      dispatch(createActionFetchOneLesson(parseInt(id)));
    },
    [dispatch]
  );

  const enrollLessonSuccess = useCallback(() => {
    dispatch(createActionVisibleHud(LESSON_SUCCESS.REGISTER));
  }, [dispatch]);

  const enrollLessonFail = useCallback(
    (error: Error) => {
      if (error instanceof AuthenticationError) {
        dispatch(createActionVisibleHud(AUTH_FAIL.REQUIRED_LOGIN));
        dispatch(createActionVisibleAuthForm());
      } else {
        dispatch(createActionVisibleHud(LESSON_FAIL.REGISTER));
      }
    },
    [dispatch]
  );

  const enrollLesson = async () => {
    try {
      if (user.data) {
        await dispatch(createActionJoinLesson(parseInt(id), user.data.id));
        enrollLessonSuccess();
      } else {
        throw new AuthenticationError(AUTH_FAIL.REQUIRED_LOGIN);
      }
    } catch (error) {
      enrollLessonFail(error as Error);
    }
  };

  const localizedPrice = useMemo(() => {
    if (lesson.data?.price === 0) {
      return 'FREE';
    } else {
      return `${lesson.data?.price.toLocaleString()}원`;
    }
  }, [lesson.data]);

  const hasJoinedLesson = useMemo(() => {
    if (mylessons.data) {
      return Boolean(
        mylessons.data.find(mylesson => mylesson.id === parseInt(id))
      );
    } else {
      return false;
    }
  }, [mylessons, id]);

  useEffect(() => {
    fetchLesson(id);
  }, [id, fetchLesson, mylessons]);

  return (
    <div>
      <Loader loading={lesson.loading} />
      {lesson.data && (
        <>
          <UnderlineTitle title={lesson.data.title} />
          <Row>
            <ThumbnailContainer imgUrl={thumbnailUrl} />
            <InfoContainer>
              <TextBox legend="사부명">{lesson.data.teacherName}</TextBox>
              <TextBox legend="수련비용">{localizedPrice}</TextBox>
              <TextBox legend="수련생 수">{lesson.data.studentCount}</TextBox>
            </InfoContainer>
          </Row>
          <Row>
            <ViewerContainer>
              <Viewer description={lesson.data.description} />
            </ViewerContainer>
          </Row>
          <Row>
            {hasJoinedLesson ? (
              <Button color="yellow" radius={5} height={3} onClick={() => {}}>
                수련장 이동
              </Button>
            ) : (
              <Button
                color="yellow"
                radius={5}
                height={3}
                onClick={enrollLesson}
              >
                수련 등록
              </Button>
            )}
            <Button color="black" radius={5} height={3} onClick={back}>
              뒤로
            </Button>
          </Row>
        </>
      )}
      {lesson.error && <NotFound />}
    </div>
  );
};

export default React.memo(LessonDetail);
