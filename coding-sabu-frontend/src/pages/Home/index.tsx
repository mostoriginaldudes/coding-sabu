import { FC, memo } from 'react';
import LessonDisplay from 'components/LessonDisplay';
import LessonList from 'components/LessonList';
import UnderlineTitle from 'styles/UnderlineTitle';
import useFetchLessonList from 'hooks/useFetchLessonList';
import Loader from 'styles/Loader';

const Home: FC = () => {
  const { loading, data } = useFetchLessonList();

  return (
    <div>
      {loading && <Loader loading={loading} />}
      <LessonDisplay lessons={data} />
      <UnderlineTitle title="수련 목록" />
      <LessonList lessons={data} />
    </div>
  );
};

export default memo(Home);
