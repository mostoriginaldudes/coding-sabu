import { FC, memo, useEffect, useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LessonList from 'components/LessonList';
import UnderlineTitle from 'styles/UnderlineTitle';
import { RootState } from 'store';
import { Lesson } from 'types';
import { State as Lessons, createActionFetchMyLessons } from 'store/lesson';

// 리덕스 쓸 필요가 있는지 고민해보자
const MyJoiningLessons: FC = () => {
  const { lessons } = useSelector<RootState, Lessons>(state => state.lesson);
  const dispatch = useDispatch();

  const dispatchMyLessons = useCallback(
    () => dispatch(createActionFetchMyLessons()),
    [dispatch]
  );

  const mylessonsArray = useMemo(
    () => (lessons.data === null ? ([] as Lesson[]) : lessons.data),
    [lessons]
  );

  useEffect(() => {
    dispatchMyLessons();
  }, [dispatchMyLessons]);

  return (
    <div>
      <UnderlineTitle title="수련 관리" />
      <LessonList lessons={mylessonsArray} />
    </div>
  );
};

export default memo(MyJoiningLessons);
