import { useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, ThunkAsyncState } from 'store';
import { fetchMyJoiningLessons, fetchOneLesson, joinLesson } from 'store/lesson';
import { fetchLecture } from 'store/lecture';
import { showAuthForm, showHud } from 'store/ui';
import AuthenticationError from 'errors/AuthenticationError';
import { concatHostToImagePath } from 'utils';
import LESSON_SUCCESS from 'fixtures/lesson/success';
import LESSON_FAIL from 'fixtures/lesson/fail';
import AUTH_FAIL from 'fixtures/auth/fail';
import { Row } from 'styles/modules/common';
import * as Styled from 'styles/LessonDetail';
import Button from 'components/Button';
import TextBox from 'components/TextBox';
import Loader from 'components/Loader';
import UnderlineTitle from 'components/UnderlineTitle';
import dynamic from 'next/dynamic';
import { Lecture, Lesson, User } from 'types';
import LECTURE_FAIL from 'fixtures/lecture/fail';
import Head from 'next/head';

const Viewer = dynamic(() => import('components/Viewer'), { ssr: false });

export default function LessonDetail() {
  const router = useRouter();
  const { lessonId } = router.query as { lessonId: string };

  const { user, lesson, lecture, myJoiningLessons, myTeachingLessons } = useSelector(
    (state: RootState) => ({
      user: state.auth.user as ThunkAsyncState<User>,
      lesson: state.lesson.lessonDetailInfo as ThunkAsyncState<Lesson>,
      myJoiningLessons: state.lesson.myJoiningLessons as ThunkAsyncState<Lesson[]>,
      myTeachingLessons: state.lesson.myTeachingLessons as ThunkAsyncState<Lesson[]>,
      lecture: state.lecture.lectureUnits as ThunkAsyncState<Lecture[]>
    })
  );
  const dispatch = useDispatch();
  const thumbnailUrl = concatHostToImagePath(lesson.data?.thumbnailUrl);

  const dispatchFetchOneLesson = useCallback(
    (lessonId: string) => {
      dispatch(fetchOneLesson(parseInt(lessonId)));
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
        await dispatch(joinLesson({ lessonId: parseInt(lessonId), userId: user.data.id }));
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
        myJoiningLessons.data.find(myJoiningLesson => myJoiningLesson.id === parseInt(lessonId))
      );
    }
    return false;
  }, [myJoiningLessons.data, lessonId, user.data]);

  const isToughtByMe = useMemo(() => {
    if (user.data && myTeachingLessons.data) {
      return Boolean(
        myTeachingLessons.data.find(myTeachingLesson => myTeachingLesson.id === parseInt(lessonId))
      );
    }
    return false;
  }, [myTeachingLessons.data, lessonId, user.data]);

  const isLoggedIn = useMemo(() => Boolean(user.data), [user]);

  const hasLecture = useMemo(() => {
    return Boolean(lecture.data?.find(unit => unit.lessonId === parseInt(lessonId)));
  }, []);

  const moveToLecture = useCallback(() => {
    if (hasLecture) {
      router.push(`/lesson/${lessonId}/lecture/${lecture.data![0].id}`);
    } else {
      dispatch(showHud(LECTURE_FAIL.EMPTY_LECTURE));
    }
  }, [hasLecture]);

  useEffect(() => {
    dispatchFetchOneLesson(lessonId);
    isLoggedIn && dispatchFetchLecture(parseInt(lessonId));
  }, [lessonId, dispatchFetchOneLesson, dispatchFetchLecture, myJoiningLessons, isLoggedIn]);

  return (
    <div>
      <Head>
        <title>수련 정보 | 코딩사부</title>
      </Head>
      <Styled.LessonDetailContainer>
        <Loader loading={lesson.loading} />
        {lesson.data && (
          <>
            {(hasJoinedLesson || isToughtByMe) && (
              <Styled.NavButton color="yellow" radius={5} onClick={moveToLecture}>
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
                  onClick={() => router.push(`/lesson/${lessonId}/lecture/form`)}
                >
                  수련 챕터 작성
                </Button>
              )}
              {!hasJoinedLesson && !isToughtByMe && (
                <Button color="yellow" radius={5} height={3} onClick={enrollIfLoggedIn}>
                  수련 등록
                </Button>
              )}
              <Button color="black" radius={5} height={3} onClick={() => router.back()}>
                뒤로
              </Button>
            </Row>
          </>
        )}
      </Styled.LessonDetailContainer>
    </div>
  );
}
