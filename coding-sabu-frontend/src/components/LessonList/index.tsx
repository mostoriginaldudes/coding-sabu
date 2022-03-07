import { useState, FC, memo, useEffect, useCallback } from 'react';
import LessonItem from 'components/LessonItem';
import useRouting from 'hooks/useRouting';
import { Lesson } from 'types';
import * as Styled from './LessonList.style';
import Loader from 'components/Loader';

interface Props {
  lessons: Lesson[];
}

const rowCount = 4;
let startIndex = 0;

const LessonList: FC<Props> = ({ lessons }) => {
  const { forward } = useRouting();
  const pickOneLesson = (lessonId: Lesson['id']) => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    forward(`/lesson/${lessonId}`);
  };

  const [target, setTarget] = useState<HTMLDivElement | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [visibleLessons, setVisibleLessons] = useState<Lesson[]>([]);

  const getMoreLessons = useCallback(() => {
    setVisibleLessons(visibleLessons =>
      visibleLessons.concat(lessons.slice(startIndex, startIndex + rowCount))
    );
    startIndex += rowCount;
  }, [lessons]);

  const onIntersect: IntersectionObserverCallback = useCallback(
    async ([entry], observer) => {
      if (entry.isIntersecting) {
        observer.unobserve(entry.target);
        getMoreLessons();
        observer.observe(entry.target);

        if (lessons.length <= startIndex) {
          observer.disconnect();
          setIsLoading(false);
        }
      }
    },
    [getMoreLessons, lessons]
  );

  useEffect(() => {
    let observer: IntersectionObserver;
    if (target) {
      observer = new IntersectionObserver(onIntersect, {
        threshold: 0.4
      });
      observer.observe(target);
    }

    return () => observer && observer.disconnect();
  }, [target, lessons]);

  return (
    <>
      <Styled.LessonListContainer>
        {visibleLessons.map((lesson, index) => (
          <Styled.LessonListElement key={index} onClick={() => pickOneLesson(lesson.id)}>
            <LessonItem {...lesson} />
          </Styled.LessonListElement>
        ))}
      </Styled.LessonListContainer>
      <Styled.TargetElement ref={setTarget}>
        <Loader loading={isLoading} size={30} />
      </Styled.TargetElement>
    </>
  );
};

export default memo(LessonList);
