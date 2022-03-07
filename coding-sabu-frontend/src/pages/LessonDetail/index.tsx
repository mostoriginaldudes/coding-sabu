import { useEffect, useCallback, useMemo, memo, FC } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import useRouting from 'hooks/useRouting';
import { RootState } from 'store';
import { fetchMyJoiningLessons, fetchOneLesson, joinLesson } from 'store/lesson';
import { fetchLecture } from 'store/lecture';
import { showAuthForm, showHud } from 'store/ui';
import AuthenticationError from 'errors/AuthenticationError';
import { concatHostToImagePath } from 'utils';
import LESSON_SUCCESS from 'fixtures/lesson/success';
import LESSON_FAIL from 'fixtures/lesson/fail';
import AUTH_FAIL from 'fixtures/auth/fail';
import { Row } from 'styles/module';
import * as Styled from './LessonDetail.style';
import loadable from '@loadable/component';

const NotFound = loadable(() => import('pages/NotFound'));
const Button = loadable(() => import('components/Button'));
const TextBox = loadable(() => import('components/TextBox'));
const Viewer = loadable(() => import('components/Viewer'));
const Loader = loadable(() => import('components/Loader'));
const UnderlineTitle = loadable(() => import('components/UnderlineTitle'));

interface Props extends RouteComponentProps<{ id: string }> {}

const LessonDetail: FC<Props> = ({ match }) => {
  const { id } = match.params;
  const { user, lesson, lecture, myJoiningLessons, myTeachingLessons } = useSelector(
    (state: RootState) => ({
      user: state.auth.user,
      lesson: state.lesson.lessonDetailInfo,
      myJoiningLessons: state.lesson.myJoiningLessons,
      myTeachingLessons: state.lesson.myTeachingLessons,
      lecture: state.lecture.lectureUnits
    })
  );
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

  const enrollIfLoggedIn = () => {
    if (isLoggedIn) {
      enrollLesson();
    } else {
      dispatch(showAuthForm());
    }
  };

  const enrollLesson = async () => {
    try {
      if (user.data) {
        await dispatch(joinLesson({ lessonId: parseInt(id), userId: user.data.id }));
        enrollLessonSuccess();
        await dispatch(fetchMyJoiningLessons());
      } else {
        throw new AuthenticationError(AUTH_FAIL.REQUIRED_LOGIN);
      }
    } catch (error) {
      enrollLessonFail(error as Error);
    }
  };

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
        myJoiningLessons.data.find(myJoiningLesson => myJoiningLesson.id === parseInt(id))
      );
    }
    return false;
  }, [myJoiningLessons, id, user]);

  const isToughtByMe = useMemo(() => {
    if (user.data && myTeachingLessons.data) {
      return Boolean(
        myTeachingLessons.data.find(myTeachingLesson => myTeachingLesson.id === parseInt(id))
      );
    }
    return false;
  }, [myTeachingLessons, id, user]);

  const isLoggedIn = useMemo(() => Boolean(user.data), [user]);

  useEffect(() => {
    dispatchFetchOneLesson(id);
    isLoggedIn && dispatchFetchLecture(parseInt(id));
  }, [id, dispatchFetchOneLesson, dispatchFetchLecture, myJoiningLessons, isLoggedIn]);

  return (
    <Styled.LessonDetailContainer>
      <Loader loading={lesson.loading} />
      {lesson.data && (
        <>
          {(hasJoinedLesson || isToughtByMe) && (
            <Styled.NavButton
              color="yellow"
              radius={5}
              onClick={() => forward(`/lesson/${id}/lecture/${lecture.data![0].id}`)}
            >
              수련장 이동
            </Styled.NavButton>
          )}
          <UnderlineTitle title={lesson.data.title} />
          <Row>
            <Styled.ThumbnailContainer imgUrl={thumbnailUrl} />
            <Styled.InfoContainer>
              <TextBox legend="사부명">{lesson.data.teacherName}</TextBox>
              <TextBox legend="수련비용">{localizedPrice}</TextBox>
              <TextBox legend="수련생 수">{lesson.data.studentCount}</TextBox>
            </Styled.InfoContainer>
          </Row>
          <Row>
            <Styled.ViewerContainer>
              <Viewer description={lesson.data.description} />
            </Styled.ViewerContainer>
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
            {!hasJoinedLesson && !isToughtByMe && (
              <Button color="yellow" radius={5} height={3} onClick={enrollIfLoggedIn}>
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
    </Styled.LessonDetailContainer>
  );
};

export default memo(LessonDetail);
