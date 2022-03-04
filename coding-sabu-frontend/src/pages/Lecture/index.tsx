import { useEffect, useMemo, FC, memo } from 'react';
import { Route, useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';
import { RootState } from 'store';
import UnderlineTitle from 'styles/UnderlineTitle';
import { Lesson } from 'types';
import NotFound from 'pages/NotFound';
import LectureUnitList from 'components/LectureUnitList';
import LectureContent from 'components/LectureContent';
import { fetchLecture } from 'store/lecture';
import Loader from 'styles/Loader';

const LectureWrapper = styled.div`
  display: flex;
`;

type RouteParam = {
  lessonId: string;
  unitId: string;
};

const Lecture: FC = () => {
  const { lessons, lecture } = useSelector((state: RootState) => ({
    lessons: state.lesson.myTeachingLessons,
    lecture: state.lecture.lectureUnits
  }));
  const dispatch = useDispatch();

  const match = useRouteMatch<RouteParam>();
  const lessonId = parseInt(match.params.lessonId);
  const unitId = parseInt(match.params.unitId);

  const lesson = useMemo(
    () => lessons.data?.find((lesson: Lesson) => lesson.id === lessonId),
    [lessons, lessonId]
  );

  const content = useMemo(
    () => lecture.data?.find(unit => unit.id === unitId)?.content || '',
    [lecture, unitId]
  );

  useEffect(() => {
    dispatch(fetchLecture(lessonId));
  }, [dispatch, lessonId]);

  return (
    <div>
      <Loader loading={lecture.loading} />
      {lesson && lecture.data ? (
        <>
          <UnderlineTitle title={lesson.title} />
          <LectureWrapper>
            <LectureUnitList lecture={lecture.data} lessonId={lessonId} />
            <Route
              path={match.url}
              render={routeProps => (
                <LectureContent key={unitId} content={content} {...routeProps} />
              )}
            />
          </LectureWrapper>
        </>
      ) : (
        <NotFound />
      )}
    </div>
  );
};

export default memo(Lecture);
