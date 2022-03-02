import { useState, useCallback, useEffect } from 'react';
import { RouteComponentProps, useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import UnderlineTitle from 'styles/UnderlineTitle';
import Editor from 'components/Editor';
import Input from 'components/Input';
import Button from 'components/Button';
import Row from 'styles/Row';
import { createLecture } from 'apis';
import { Lecture, LectureRequestInfo } from 'types';
import { createActionVisibleHud } from 'store/ui';
import LECTURE_FAIL from 'fixtures/lecture/fail';
import LECTURE_SUCCESS from 'fixtures/lecture/success';
import { ValidationError } from 'yup';
import { RootState } from 'store';

type RouteParams = {
  lessonId: string;
};

const LectureForm: React.FC<RouteComponentProps> = ({ history }) => {
  const match = useRouteMatch<RouteParams>();
  const lessonId = parseInt(match.params.lessonId);

  const { user, myTeachingLessons } = useSelector((state: RootState) => ({
    user: state.auth.user,
    myTeachingLessons: state.lesson.myTeachingLessons
  }));
  const dispatch = useDispatch();

  const [unit, setUnit] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const checkIfAuthorized = useCallback(() => {
    if (user.data === null) {
      return history.goBack();
    } else if (user.data.userType !== 'teacher') {
      return history.goBack();
    }

    const lesson = myTeachingLessons.data?.find(({ id }) => id === lessonId);
    if (lesson && lesson.teacherId !== user.data.id) {
      return history.goBack();
    }
  }, [history, myTeachingLessons, user, lessonId]);

  const onChangeUnit = useCallback(
    ({ target: { value } }) => setUnit(value),
    [setUnit]
  );

  const checkIfInputEmpty = useCallback(() => {
    if (unit.length === 0 || content.length === 0) {
      throw new ValidationError(LECTURE_FAIL.INVALID_LECTURE);
    }
  }, [unit, content]);

  const successCreateLecture = useCallback(
    (lecture: Lecture) => {
      dispatch(createActionVisibleHud(LECTURE_SUCCESS.CREATE_LECTURE));
      history.replace(`/lesson/${lessonId}/lecture/${lecture.id}`);
    },
    [dispatch, history, lessonId]
  );

  const failCreateLecture = useCallback(
    (error: Error) => {
      if (error instanceof ValidationError) {
        dispatch(createActionVisibleHud(error.message));
      } else {
        dispatch(createActionVisibleHud(LECTURE_FAIL.CREATE_LECTURE));
      }
    },
    [dispatch]
  );

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      checkIfInputEmpty();

      const response = await createLecture(lessonId, {
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
      <UnderlineTitle title="수련 상세 작성" />
      <form onSubmit={onSubmit}>
        <Input
          label="수련 소제목"
          name="수련 소제목"
          placeholder="수련 소제목을 입력하세요."
          value={unit}
          onChange={onChangeUnit}
        />
        <Editor setValue={setContent} />
        <Row>
          <Button type="submit" height={2.5} radius={5} color="yellow">
            작성
          </Button>
          <Button type="button" height={2.5} radius={5} color="black">
            취소
          </Button>
        </Row>
      </form>
    </div>
  );
};

export default LectureForm;
