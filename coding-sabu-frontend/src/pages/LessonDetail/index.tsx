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
  fetchMyJoiningLessons,
  fetchOneLesson,
  joinLesson
} from 'store/lesson';
import { fetchLecture } from 'store/lecture';
import { showAuthForm, showHud } from 'store/ui';
import { colors } from 'styles/theme';
import AuthenticationError from 'errors/AuthenticationError';
import LESSON_SUCCESS from 'fixtures/lesson/success';
import LESSON_FAIL from 'fixtures/lesson/fail';
import AUTH_FAIL from 'fixtures/auth/fail';

interface LessonThumbnail {
  imgUrl?: string;
}

const LessonDetailContainer = styled.div`
  position: relative;
`;

const NavButton = styled(Button)`
  position: absolute;
  right: 0;
`;

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
  const { user, lesson, lecture, myJoiningLessons, myTeachingLessons } =
    useSelector((state: RootState) => ({
      user: state.auth.user,
      lesson: state.lesson.lessonDetailInfo,
      myJoiningLessons: state.lesson.myJoiningLessons,
      myTeachingLessons: state.lesson.myTeachingLessons,
      lecture: state.lecture.lectureUnits
    }));
  const dispatch = useDispatch();
  const thumbnailUrl = concatHostToImagePath(lesson.data?.thumbnailUrl);
  const { forward, back } = useRouting();

  const dispatchFetchOneLesson = useCallback(
    (id: string) => {
      dispatch(fetchOneLesson(parseInt(id)));
    },
    [dispatch]
  );

  const dispatchFetchLecture = useCallback(
    (lessonId: number) => dispatch(fetchLecture(lessonId)),
    [dispatch]
  );

  const enrollLessonSuccess = useCallback(() => {
    dispatch(showHud(LESSON_SUCCESS.REGISTER));
  }, [dispatch]);

  const enrollLessonFail = useCallback(
    (error: Error) => {
      if (error instanceof AuthenticationError) {
        dispatch(showHud(AUTH_FAIL.REQUIRED_LOGIN));
        dispatch(showAuthForm());
      } else {
        dispatch(showHud(LESSON_FAIL.REGISTER));
      }
    },
    [dispatch]
  );

  const enrollLesson = async () => {
    try {
      if (user.data) {
        await dispatch(
          joinLesson({ lessonId: parseInt(id), userId: user.data.id })
        );
        enrollLessonSuccess();
        await dispatch(fetchMyJoiningLessons());
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
    if (user.data && myJoiningLessons.data) {
      return Boolean(
        myJoiningLessons.data.find(
          myJoiningLesson => myJoiningLesson.id === parseInt(id)
        )
      );
    }
    return false;
  }, [myJoiningLessons, id, user]);

  const isToughtByMe = useMemo(() => {
    if (user.data && myTeachingLessons.data) {
      return Boolean(
        myTeachingLessons.data.find(
          myTeachingLesson => myTeachingLesson.id === parseInt(id)
        )
      );
    }
    return false;
  }, [myTeachingLessons, id, user]);

  useEffect(() => {
    dispatchFetchOneLesson(id);
    dispatchFetchLecture(parseInt(id));
  }, [id, dispatchFetchOneLesson, dispatchFetchLecture, myJoiningLessons]);

  return (
    <LessonDetailContainer>
      <Loader loading={lesson.loading} />
      {lesson.data && (
        <>
          {(hasJoinedLesson || isToughtByMe) && (
            <NavButton
              color="yellow"
              radius={5}
              onClick={() =>
                forward(`/lesson/${id}/lecture/${lecture.data![0].id}`)
              }
            >
              수련장 이동
            </NavButton>
          )}
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
            {isToughtByMe && (
              <Button
                color="white"
                radius={5}
                height={3}
                onClick={() => forward(`/lesson/${id}/lecture/form`)}
              >
                수련 챕터 작성
              </Button>
            )}
            {hasJoinedLesson || isToughtByMe || (
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
    </LessonDetailContainer>
  );
};

export default React.memo(LessonDetail);
