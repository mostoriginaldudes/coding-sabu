import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { useCallback, useMemo } from 'react';
import { useEffect, useCallback, useMemo } from 'react';
import Button from 'components/Button';
import TextBox from 'components/TextBox';
import Loader from 'components/Loader';
import UnderlineTitle from 'components/UnderlineTitle';
import PageHead from 'components/PageHead';
import AuthenticationError from 'errors/AuthenticationError';
import LESSON_SUCCESS from 'fixtures/lesson/success';
import LESSON_FAIL from 'fixtures/lesson/fail';
import AUTH_FAIL from 'fixtures/auth/fail';
import LECTURE_FAIL from 'fixtures/lecture/fail';
import useRedux from 'hooks/useRedux';
import { fetchMyJoiningLessons, fetchOneLesson, joinLesson } from 'store/lesson';
import { fetchLecture } from 'store/lecture';
import { showAuthForm, showHud } from 'store/ui';
import { Row } from 'styles/modules/common';
import * as Styled from 'styles/LessonDetail';

const Viewer = dynamic(() => import('components/Viewer'), { ssr: false });

export default function LessonDetail() {
  const router = useRouter();
  const { lessonId } = router.query as { lessonId: string };

  const { useAppDispatch, useAppSelector } = useRedux();
  const dispatch = useAppDispatch();
  const { user, lesson, lecture, myJoiningLessons, myTeachingLessons } = useAppSelector(state => ({
    user: state.auth.user,
    lesson: state.lesson.lessonDetailInfo,
    myJoiningLessons: state.lesson.myJoiningLessons,
    myTeachingLessons: state.lesson.myTeachingLessons,
    lecture: state.lecture.lectureUnits
  }));
  const dispatch = useAppDispatch();

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

  const isLoggedIn = useMemo(() => Boolean(user.data), [user]);

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
  }, [lesson]);

  const hasJoinedLesson = () => {
    if (user.data && myJoiningLessons.data) {
      return Boolean(
        myJoiningLessons.data.find(myJoiningLesson => myJoiningLesson.id === parseInt(lessonId))
      );
    }
    return false;
  };

  const isToughtByMe = () => {
    if (user.data && myTeachingLessons.data) {
      return Boolean(
        myTeachingLessons.data.find(myTeachingLesson => myTeachingLesson.id === parseInt(lessonId))
      );
    }
    return false;
  };

  const hasLecture = () =>
    Boolean(lecture.data?.find(unit => unit.lessonId === parseInt(lessonId)));

  const moveToLecture = useCallback(() => {
    if (hasLecture()) {
      router.push(`/lesson/${lessonId}/lecture/${lecture.data![0].id}`);
    } else {
      dispatch(showHud(LECTURE_FAIL.EMPTY_LECTURE));
    }
  }, [hasLecture]);

  const fetchLessonDetail = async () => {
    await dispatchFetchOneLesson(lessonId);
    if (isLoggedIn) {
      await dispatchFetchLecture(parseInt(lessonId));
    }
  };

  useEffect(() => {
    fetchLessonDetail();
  }, []);

  return (
    <div>
      <PageHead title="수련 정보" imgUrl={lesson.data?.thumbnailUrl} />
      <Styled.LessonDetailContainer>
        <Loader loading={lesson.loading} />
        {lesson.data && (
          <>
            {(hasJoinedLesson() || isToughtByMe()) && (
              <Styled.NavButton color="yellow" radius={5} onClick={moveToLecture}>
                수련장 이동
              </Styled.NavButton>
            )}
            <UnderlineTitle title={lesson.data.title} />
            <Row>
              <Styled.ThumbnailContainer imgUrl={lesson.data?.thumbnailUrl} />
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
              {isToughtByMe() && (
                <Button
                  color="white"
                  radius={5}
                  height={3}
                  onClick={() => router.push(`/lesson/${lessonId}/lecture/form`)}
                >
                  수련 챕터 작성
                </Button>
              )}
              {!hasJoinedLesson() && !isToughtByMe() && (
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
