import { FC, memo, useEffect, useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useRedirect from 'hooks/useRedirect';
import { RootState } from 'store';
import { fetchMyJoiningLessons } from 'store/lesson';
import { Lesson } from 'types';
import loadable from '@loadable/component';

const LessonList = loadable(() => import('components/LessonList'));
const UnderlineTitle = loadable(() => import('components/UnderlineTitle'));
const Loader = loadable(() => import('components/Loader'));

const MyJoiningLessons: FC = () => {
  const { loading, data, error } = useSelector((state: RootState) => state.lesson.myJoiningLessons);
  const dispatch = useDispatch();

  const dispatchMyJoiningLessons = useCallback(() => dispatch(fetchMyJoiningLessons()), [dispatch]);

  const myJoiningLessonList = useMemo(() => (data === null ? ([] as Lesson[]) : data), [data]);

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
