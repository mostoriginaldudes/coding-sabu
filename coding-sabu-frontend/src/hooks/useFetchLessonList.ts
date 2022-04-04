import { useEffect, useMemo } from 'react';
import { fetchLessons, fetchMyJoiningLessons, fetchMyTeachingLessons } from 'store/lesson';
import type { Lesson } from 'types';
import useRedux from './useRedux';

const LESSONS = 'lessons';
const MY_JOINING_LESSONS = 'myJoiningLessons';
const MY_TEACHING_LESSONS = 'myTeachingLessons';
type ListType = typeof LESSONS | typeof MY_JOINING_LESSONS | typeof MY_TEACHING_LESSONS;

function useFetchLessonList(listType: ListType) {
  const { useAppSelector, useAppDispatch } = useRedux();

  const { loading, data } = useAppSelector(state => state.lesson[listType]);
  const dispatch = useAppDispatch();

  const lessonsArray = useMemo(() => (data === null ? ([] as Lesson[]) : data), [data]);

  const dispatchByListType = () => {
    switch (listType) {
      case LESSONS:
        dispatch(fetchLessons());
        break;
      case MY_JOINING_LESSONS:
        dispatch(fetchMyJoiningLessons());
        break;
      case MY_TEACHING_LESSONS:
        dispatch(fetchMyTeachingLessons());
        break;
    }
  };

  useEffect(() => {
    dispatchByListType();
  }, []);

  return [loading, lessonsArray] as [boolean, Lesson[]];
}

export default useFetchLessonList;
