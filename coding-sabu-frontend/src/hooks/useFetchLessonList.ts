import { useEffect, useCallback, useMemo } from 'react';
import useRedux from './useRedux';
import { fetchLessons, fetchMyJoiningLessons, fetchMyTeachingLessons } from 'store/lesson';
import type { Lesson } from 'types';

type ListType = 'lessons' | 'myJoiningLessons' | 'myTeachingLessons';

function useFetchLessonList(listType: ListType) {
  const { useAppSelector, useAppDispatch } = useRedux();
  const { loading, data } = useAppSelector(state => state.lesson[listType]);
  const dispatch = useAppDispatch();

  const dispatchLessons = useCallback(() => dispatch(fetchLessons()), [dispatch]);
  const dispatchJoiningLessons = useCallback(() => dispatch(fetchMyJoiningLessons()), [dispatch]);
  const dispatchTeachingLessons = useCallback(() => dispatch(fetchMyTeachingLessons()), [dispatch]);

  const lessonsArray = useMemo(() => (data === null ? ([] as Lesson[]) : data), [data]);

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
