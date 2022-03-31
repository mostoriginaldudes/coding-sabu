import { useMemo } from 'react';
import useRedux from './useRedux';
import type { Lesson } from 'types';

type ListType = 'lessons' | 'myJoiningLessons';

function useFetchLessonList(listType: ListType) {
  const { useAppSelector } = useRedux();
  const { loading, data } = useAppSelector(state => state.lesson[listType]);

  const lessonsArray = useMemo(() => (data === null ? ([] as Lesson[]) : data), [data]);

  return [loading, lessonsArray] as [boolean, Lesson[]];
}

export default useFetchLessonList;
