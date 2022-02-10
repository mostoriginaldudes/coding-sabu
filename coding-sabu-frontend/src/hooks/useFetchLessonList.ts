import { useEffect, useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store';
import { State as Lessons, createActionFetchLessons } from 'store/lesson';
import { Lesson } from 'types';

function useFetchLessonList() {
  const { lessons } = useSelector<RootState, Lessons>(state => state.lesson);
  const dispatch = useDispatch();

  const dispatchLessons = useCallback(
    () => dispatch(createActionFetchLessons()),
    [dispatch]
  );

  const lessonsArray = useMemo(() => {
    if (lessons.data === null) {
      return [] as Lesson[];
    } else {
      return lessons.data;
    }
  }, [lessons]);

  useEffect(() => {
    dispatchLessons();
  }, [dispatchLessons]);

  return { ...lessons, data: lessonsArray };
}

export default useFetchLessonList;
