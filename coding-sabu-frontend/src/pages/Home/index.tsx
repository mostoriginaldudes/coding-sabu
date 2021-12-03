import { FC, useState, useEffect } from 'react';
import LessonDisplay from 'components/LessonDisplay';
import LessonList from 'components/LessonList';
import { fetchLessons } from 'apis';
import { Lesson } from 'types';

const Home: FC = () => {
  const [lessons, setLessons] = useState<Lesson[]>([]);

  const fetchLessonData = async () => {
    const fetchedLessons = await fetchLessons();
    setLessons(fetchedLessons.data);
  };

  useEffect(() => {
    fetchLessonData();
  }, []);

  return (
    <div>
      <LessonDisplay lessons={lessons} />
      <LessonList lessons={lessons} />
    </div>
  );
};

export default Home;
