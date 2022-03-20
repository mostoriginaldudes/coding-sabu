import { GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useState, useEffect, useCallback } from 'react';
import { ValidationError } from 'yup';
import { createLectureRequest } from 'apis';
import UnderlineTitle from 'components/UnderlineTitle';
import Input from 'components/Input';
import Button from 'components/Button';
import LECTURE_FAIL from 'fixtures/lecture/fail';
import LECTURE_SUCCESS from 'fixtures/lecture/success';
import useRedux from 'hooks/useRedux';
import { ThunkAsyncState } from 'store';
import { showHud } from 'store/ui';
import { Row } from 'styles/modules/common';
import { Lecture, LectureRequestInfo, Lesson } from 'types';

const Editor = dynamic(() => import('components/Editor'), { ssr: false });

interface Props {
  lessonId: number;
}

export default function LectureForm({ lessonId }: Props) {
  const router = useRouter();

  const { useAppDispatch, useAppSelector } = useRedux();
  const { user, myTeachingLessons } = useAppSelector(state => ({
    user: state.auth.user,
    myTeachingLessons: state.lesson.myTeachingLessons as ThunkAsyncState<Lesson[]>
  }));
  const dispatch = useAppDispatch();

  const [unit, setUnit] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const checkIfAuthorized = useCallback(() => {
    if (user.data === null) {
      return router.back();
    } else if (user.data.userType !== 'teacher') {
      return router.back();
    }

    const lesson = myTeachingLessons.data?.find(({ id }) => id === lessonId);
    if (lesson && lesson.teacherId !== user.data.id) {
      return router.back();
    }
  }, [myTeachingLessons, user, lessonId]);

  const onChangeUnit = useCallback(({ target: { value } }) => setUnit(value), [setUnit]);

  const checkIfInputEmpty = useCallback(() => {
    if (unit.length === 0 || content.length === 0) {
      throw new ValidationError(LECTURE_FAIL.INVALID_LECTURE);
    }
  }, [unit, content]);

  const successCreateLecture = useCallback(
    (lecture: Lecture) => {
      dispatch(showHud(LECTURE_SUCCESS.CREATE_LECTURE));
      router.replace(`/lesson/${lessonId}/lecture/${lecture.id}`);
    },
    [dispatch, lessonId]
  );

  const failCreateLecture = useCallback(
    (error: Error) => {
      if (error instanceof ValidationError) {
        dispatch(showHud(error.message));
      } else {
        dispatch(showHud(LECTURE_FAIL.CREATE_LECTURE));
      }
    },
    [dispatch]
  );

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      checkIfInputEmpty();

      const response = await createLectureRequest(lessonId, {
        unit,
        content
      } as LectureRequestInfo);

      successCreateLecture(response);
    } catch (error) {
      failCreateLecture(error as Error);
    }
  };

  useEffect(() => {
    checkIfAuthorized();
  }, [checkIfAuthorized]);

  return (
    <div>
      <Head>
        <title>수련 비급 작성 | 코딩사부</title>
      </Head>
      <UnderlineTitle title="수련 비급 작성" />
      <form onSubmit={onSubmit}>
        <Input
          label="수련 비급명"
          name="수련 비급명"
          placeholder="수련 비급명을 입력하세요."
          value={unit}
          onChange={onChangeUnit}
        />
        <Editor setValue={setContent} />
        <Row>
          <Button type="submit" height={2.5} radius={5} color="yellow">
            작성
          </Button>
          <Button type="button" height={2.5} radius={5} color="black" onClick={() => router.back()}>
            취소
          </Button>
        </Row>
      </form>
    </div>
  );
}

export function getStaticProps(context: GetStaticPropsContext) {
  const lessonId = context.params!.lessonId as string;

  return {
    props: {
      lessonId: parseInt(lessonId)
    }
  };
}

export function getStaticPaths() {
  return {
    paths: [{ params: { lessonId: '24' } }],
    fallback: true
  };
}
