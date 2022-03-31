import { NextPage } from 'next';
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
import { store, wrapper } from 'store';
import { fetchMyJoiningLessons, fetchOneLesson, joinLesson } from 'store/lesson';
import { fetchLecture } from 'store/lecture';
import { showAuthForm, showHud } from 'store/ui';
import { Row } from 'styles/modules/common';
import * as Styled from 'styles/LessonDetail';
import { Lecture, Lesson, User } from 'types';

const Viewer = dynamic(() => import('components/Viewer'), { ssr: false });

interface Props {
  lessonId: string;
  user: User | null;
  loading: boolean;
  lesson: Lesson | null;
  lecture: Lecture[] | null;
  myJoiningLessons: Lesson[];
  myTeachingLessons: Lesson[];
}

const LessonDetail: NextPage<Props> = ({
  lessonId,
  user,
  loading,
  lesson,
  lecture,
  myJoiningLessons,
  myTeachingLessons
}) => {
  const router = useRouter();

  const { useAppDispatch } = useRedux();
  const dispatch = useAppDispatch();

  const isLoggedIn = useMemo(() => Boolean(user), [user]);

  const enrollIfLoggedIn = () => {
    isLoggedIn ? enrollLesson() : dispatch(showAuthForm());
  };

  const enrollLesson = async () => {
    try {
      if (user) {
        await dispatch(joinLesson({ lessonId: parseInt(lessonId), userId: user.id }));
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
    if (lesson?.price === 0) {
      return 'FREE';
    } else {
      return `${lesson?.price.toLocaleString()}원`;
    }
  }, [lesson]);

  const hasJoinedLesson = () => {
    if (user && myJoiningLessons) {
      return Boolean(
        myJoiningLessons.find(myJoiningLesson => myJoiningLesson.id === parseInt(lessonId))
      );
    }
    return false;
  };

  const isToughtByMe = () => {
    if (user && myTeachingLessons) {
      return Boolean(
        myTeachingLessons.find(myTeachingLesson => myTeachingLesson.id === parseInt(lessonId))
      );
    }
    return false;
  };

  const hasLecture = () => Boolean(lecture?.find(unit => unit.lessonId === parseInt(lessonId)));

  const moveToLecture = useCallback(() => {
    if (hasLecture()) {
      router.push(`/lesson/${lessonId}/lecture/${lecture![0].id}`);
    } else {
      dispatch(showHud(LECTURE_FAIL.EMPTY_LECTURE));
    }
  }, [hasLecture]);

  useEffect(() => {}, []);

  return (
    <div>
      <PageHead title="수련 정보" imgUrl={lesson?.thumbnailUrl} />
      <Styled.LessonDetailContainer>
        <Loader loading={loading} />
        {lesson && (
          <>
            {(hasJoinedLesson() || isToughtByMe()) && (
              <Styled.NavButton color="yellow" radius={5} onClick={moveToLecture}>
                수련장 이동
              </Styled.NavButton>
            )}
            <UnderlineTitle title={lesson.title} />
            <Row>
              <Styled.ThumbnailContainer imgUrl={lesson?.thumbnailUrl} />
              <Styled.InfoContainer>
                <TextBox legend="사부명">{lesson.teacherName}</TextBox>
                <TextBox legend="수련비용">{localizedPrice}</TextBox>
                <TextBox legend="수련생 수">{lesson.studentCount}</TextBox>
              </Styled.InfoContainer>
            </Row>
            <Row>
              <Styled.ViewerContainer>
                <Viewer description={lesson.description} />
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
};

export default LessonDetail;

export const getServerSideProps = wrapper.getServerSideProps(store => async ({ params }) => {
  const lessonId = params?.lessonId as string;

  await store.dispatch(fetchOneLesson(parseInt(lessonId)));
  await store.dispatch(fetchLecture(parseInt(lessonId)));

  const { data: user } = store.getState().auth.user;
  const { loading, data: lesson } = store.getState().lesson.lessonDetailInfo;
  const { data: lecture } = store.getState().lecture.lectureUnits;
  const { data: myJoiningLessons } = store.getState().lesson.myJoiningLessons;
  const { data: myTeachingLessons } = store.getState().lesson.myTeachingLessons;

  return {
    props: {
      lessonId,
      user,
      loading,
      lesson,
      myJoiningLessons,
      myTeachingLessons,
      lecture
    }
  };
});
