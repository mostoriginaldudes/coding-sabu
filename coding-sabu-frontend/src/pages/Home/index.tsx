import { FC, useState, useEffect } from 'react';
import LessonDisplay from 'components/LessonDisplay';
import LessonList from 'components/LessonList';
import { fetchLessons } from 'apis';
import { Lesson } from 'types';

const Home: FC = () => {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [displayedLesson, setDisplayedLesson] = useState<Lesson | null>(null);

  const fetchLessonData = async () => {
    const fetchedLessons = await fetchLessons();
    setLessons(fetchedLessons.data);
  };

  useEffect(() => {
    fetchLessonData();
  }, []);

  useEffect(() => {
    setDisplayedLesson(lessons[0]);
  }, [lessons]);

  return (
    <div>
      <LessonDisplay displayedLesson={displayedLesson}></LessonDisplay>
      <LessonList lessons={lessons} setDisplayedLesson={setDisplayedLesson} />
    </div>
  );
};

export default Home;
