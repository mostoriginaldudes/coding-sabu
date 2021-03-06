import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { useCallback, useEffect, useMemo } from 'react';
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

interface Props {
  lessonId: string;
}

const LessonDetail: NextPage<Props> = ({ lessonId }) => {
  const router = useRouter();

  const { useAppDispatch, useAppSelector } = useRedux();
  const dispatch = useAppDispatch();
  const { user, lesson, lecture, myJoiningLessons, myTeachingLessons } = useAppSelector(state => ({
    user: state.auth.user,
    lesson: state.lesson.lessonDetailInfo,
    myJoiningLessons: state.lesson.myJoiningLessons,
    myTeachingLessons: state.lesson.myTeachingLessons,
    lecture: state.lecture.lectureUnits
  }));

  const isLoggedIn = useMemo(() => Boolean(user.data), [user.data]);

  const enrollIfLoggedIn = () => {
    isLoggedIn ? enrollLesson() : dispatch(showAuthForm());
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
      return `${lesson.data?.price.toLocaleString()}???`;
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

  useEffect(() => {
    dispatch(fetchOneLesson(parseInt(lessonId)));
    if (isLoggedIn) {
      dispatch(fetchLecture(parseInt(lessonId)));
    }
  }, []);

  return (
    <div>
      <PageHead title="?????? ??????" imgUrl={lesson.data?.thumbnailUrl} />
      <Styled.LessonDetailContainer>
        <Loader loading={lesson.loading} />
        {lesson.data && (
          <>
            {(hasJoinedLesson() || isToughtByMe()) && (
              <Styled.NavButton color="yellow" radius={5} onClick={moveToLecture}>
                ????????? ??????
              </Styled.NavButton>
            )}
            <UnderlineTitle title={lesson.data.title} />
            <Row>
              <Styled.ThumbnailContainer imgUrl={lesson.data?.thumbnailUrl} />
              <Styled.InfoContainer>
                <TextBox legend="?????????">{lesson.data.teacherName}</TextBox>
                <TextBox legend="????????????">{localizedPrice}</TextBox>
                <TextBox legend="????????? ???">{lesson.data.studentCount}</TextBox>
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
                  ?????? ?????? ??????
                </Button>
              )}
              {!hasJoinedLesson() && !isToughtByMe() && (
                <Button color="yellow" radius={5} height={3} onClick={enrollIfLoggedIn}>
                  ?????? ??????
                </Button>
              )}
              <Button color="black" radius={5} height={3} onClick={() => router.back()}>
                ??????
              </Button>
            </Row>
          </>
        )}
      </Styled.LessonDetailContainer>
    </div>
  );
};

export default LessonDetail;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const lessonId = params?.lessonId as string;

  return {
    props: {
      lessonId
    }
  };
};
