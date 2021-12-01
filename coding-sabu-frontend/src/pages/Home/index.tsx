import { FC, useState, useEffect } from 'react';
import LessonDisplay from 'components/LessonDisplay';
import LessonList from 'components/LessonList';
import { fetchLessons } from 'apis';
import { Props as ILesson } from '../../components/Lesson';

const Home: FC = () => {
  const [lessons, setLessons] = useState<ILesson[]>([]);
  const [displayedLesson, setDisplayedLesson] = useState<ILesson | null>(null);

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
