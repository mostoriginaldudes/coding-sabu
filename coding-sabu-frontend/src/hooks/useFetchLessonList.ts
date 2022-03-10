import { useEffect, useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, ThunkAsyncState } from 'store';
import { fetchLessons } from 'store/lesson';
import { Lesson } from 'types';

function useFetchLessonList() {
  const { loading, data } = useSelector(
    (state: RootState) => state.lesson as ThunkAsyncState<Lesson[]>
  );
  const dispatch = useDispatch();

  const dispatchLessons = useCallback(() => dispatch(fetchLessons()), [dispatch]);

  const lessonsArray = useMemo(() => {
    if (data === null) {
      return [] as Lesson[];
    } else {
      return data;
    }
  }, [data]);

  useEffect(() => {
    dispatchLessons();
  }, [dispatchLessons]);

  return { loading, data: lessonsArray };
}

export default useFetchLessonList;
