import { FC, useEffect, useCallback, memo, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LessonDisplay from 'components/LessonDisplay';
import LessonList from 'components/LessonList';
import { State as Lessons, createActionFetchLessons } from 'store/lesson';
import { Lesson } from 'types';
import { RootState } from 'store';
import UnderlineTitle from 'styles/UnderlineTitle';
import Loader from 'styles/Loader';

const Home: FC = () => {
  const { loading, data } = useFetchLessonList();
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
      {loading && <Loader loading={loading} />}
      <UnderlineTitle title="수련 목록" />
      <LessonList lessons={lessonsArray} />
    </div>
  );
};

export default memo(Home);
