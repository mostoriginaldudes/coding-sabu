import { FC, useEffect, useCallback, memo, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LessonDisplay from 'components/LessonDisplay';
import LessonList from 'components/LessonList';
import { createActionFetchLessons } from 'store/lesson';
import { Lesson } from 'types';
import { RootState } from 'store';
import { State as Lessons } from 'store/lesson';
import HeadUpDisplay from 'components/HeadUpDisplay';

const Home: FC = () => {
  const { lessons } = useSelector<RootState, Lessons>(state => state.lesson);
  const dispatch = useDispatch();

  const dispatchLessons = useCallback(
    () => dispatch(createActionFetchLessons()),
    [dispatch]
  );

  const lessonsArray = useMemo(
    () => (lessons.data === null ? ([] as Lesson[]) : lessons.data),
    [lessons]
  );

  useEffect(() => {
    dispatchLessons();
  }, [dispatchLessons]);

  return (
    <div>
      <HeadUpDisplay type="success" />
      <LessonDisplay lessons={lessonsArray} />
      <LessonList lessons={lessonsArray} />
    </div>
  );
};

export default memo(Home);
