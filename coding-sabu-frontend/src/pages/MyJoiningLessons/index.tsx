import { FC, memo, useEffect, useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LessonList from 'components/LessonList';
import UnderlineTitle from 'styles/UnderlineTitle';
import { RootState } from 'store';
import { Lesson } from 'types';
import { createActionFetchMyLessons } from 'store/lesson';
import Loader from 'styles/Loader';
import { Redirect } from 'react-router-dom';

const MyJoiningLessons: FC = () => {
  const { loading, data, error } = useSelector(
    (state: RootState) => state.lesson.mylessons
  );
  const dispatch = useDispatch();

  const dispatchMyLessons = useCallback(
    () => dispatch(createActionFetchMyLessons()),
    [dispatch]
  );

  const mylessonsList = useMemo(
    () => (data === null ? ([] as Lesson[]) : data),
    [data]
  );

  useEffect(() => {
    dispatchMyLessons();
  }, [dispatchMyLessons]);

  return (
    <div>
      <UnderlineTitle title="내 수련 목록" />
      <Loader loading={loading} />
      {error && <Redirect to="/" />}
      <LessonList lessons={mylessonsList} />
    </div>
  );
};

export default memo(MyJoiningLessons);
