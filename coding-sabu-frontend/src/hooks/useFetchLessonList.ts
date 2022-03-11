import { useEffect, useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, ThunkAsyncState } from 'store';
import { fetchLessons, fetchMyJoiningLessons, fetchMyTeachingLessons } from 'store/lesson';
import { Lesson } from 'types';

type ListType = 'lessons' | 'myJoiningLessons' | 'myTeachingLessons';

function useFetchLessonList(listType: ListType) {
  const { loading, data } = useSelector(
    (state: RootState) => state.lesson[listType] as ThunkAsyncState<Lesson[]>
  );
  const dispatch = useDispatch();

  const dispatchLessons = useCallback(() => dispatch(fetchLessons()), [dispatch]);
  const dispatchJoiningLessons = useCallback(() => dispatch(fetchMyJoiningLessons()), [dispatch]);
  const dispatchTeachingLessons = useCallback(() => dispatch(fetchMyTeachingLessons()), [dispatch]);

  const lessonsArray = useMemo(() => {
    if (data === null) {
      return [] as Lesson[];
    } else {
      return data;
    }
  }, [data]);

  useEffect(() => {
    listType === 'lessons' && dispatchLessons();
  }, []);

  useEffect(() => {
    listType === 'myJoiningLessons' && dispatchJoiningLessons();
  }, []);

  useEffect(() => {
    listType === 'myTeachingLessons' && dispatchTeachingLessons();
  }, []);

  return [loading, lessonsArray] as [boolean, Lesson[]];
}

export default useFetchLessonList;
