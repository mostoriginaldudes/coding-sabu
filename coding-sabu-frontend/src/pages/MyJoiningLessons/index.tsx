import { FC, memo, useEffect, useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LessonList from 'components/LessonList';
import UnderlineTitle from 'styles/UnderlineTitle';
import { RootState } from 'store';
import { Lesson } from 'types';
import { fetchMyJoiningLessons } from 'store/lesson';
import Loader from 'styles/Loader';
import useRedirect from 'hooks/useRedirect';

const MyJoiningLessons: FC = () => {
  const { loading, data, error } = useSelector(
    (state: RootState) => state.lesson.myJoiningLessons
  );
  const dispatch = useDispatch();

  const dispatchMyJoiningLessons = useCallback(
    () => dispatch(fetchMyJoiningLessons()),
    [dispatch]
  );

  const myJoiningLessonList = useMemo(
    () => (data === null ? ([] as Lesson[]) : data),
    [data]
  );

  useRedirect('/', [error]);

  useEffect(() => {
    dispatchMyJoiningLessons();
  }, [dispatchMyJoiningLessons]);

  return (
    <div>
      <UnderlineTitle title="내 수련 목록" />
      <Loader loading={loading} />
      <LessonList lessons={myJoiningLessonList} />
    </div>
  );
};

export default memo(MyJoiningLessons);
