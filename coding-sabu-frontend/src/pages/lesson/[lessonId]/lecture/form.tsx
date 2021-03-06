import { NextPage, GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { useState, useEffect, useCallback } from 'react';
import { ValidationError } from 'yup';
import { createLectureRequest } from 'apis';
import UnderlineTitle from 'components/UnderlineTitle';
import Input from 'components/Input';
import Button from 'components/Button';
import PageHead from 'components/PageHead';
import LECTURE_FAIL from 'fixtures/lecture/fail';
import LECTURE_SUCCESS from 'fixtures/lecture/success';
import useFetchLessonList from 'hooks/useFetchLessonList';
import useRedux from 'hooks/useRedux';
import { store } from 'store';
import { showHud } from 'store/ui';
import { Row } from 'styles/modules/common';
import { Lecture, LectureRequestInfo } from 'types';

const Editor = dynamic(() => import('components/Editor'), { ssr: false });

interface Props {
  lessonId: number;
}

const LectureForm: NextPage<Props> = ({ lessonId }) => {
  const router = useRouter();

  const [unit, setUnit] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const [, myTeachingLessons] = useFetchLessonList('myTeachingLessons');

  const { useAppDispatch, useAppSelector } = useRedux();
  const user = useAppSelector(state => state.auth.user);

  const dispatch = useAppDispatch();

  const checkIfAuthorized = useCallback(() => {
    if (user.data === null) {
      return router.back();
    } else if (user.data.userType !== 'teacher') {
      return router.back();
    }

    const lesson = myTeachingLessons.find(({ id }) => id === lessonId);
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
      <PageHead title="?????? ?????? ??????" />
      <UnderlineTitle title="?????? ?????? ??????" />
      <form onSubmit={onSubmit}>
        <Input
          label="?????? ?????????"
          name="?????? ?????????"
          placeholder="?????? ???????????? ???????????????."
          value={unit}
          onChange={onChangeUnit}
        />
        <Editor setValue={setContent} />
        <Row>
          <Button type="submit" height={2.5} radius={5} color="yellow">
            ??????
          </Button>
          <Button type="button" height={2.5} radius={5} color="black" onClick={() => router.back()}>
            ??????
          </Button>
        </Row>
      </form>
    </div>
  );
};

export default LectureForm;

export function getStaticProps(context: GetStaticPropsContext) {
  const lessonId = parseInt(context.params!.lessonId as string);

  return {
    props: {
      lessonId
    }
  };
}

export const getStaticPaths = () => {
  const { myTeachingLessons } = store.getState().lesson;

  return {
    paths: myTeachingLessons.data?.map(({ id }) => ({ params: { lessonId: id.toString() } })) || [],
    fallback: true
  };
};
