import { FC, memo } from 'react';
import loadable from '@loadable/component';
import useFetchLessonList from 'hooks/useFetchLessonList';

const LessonDisplay = loadable(() => import('components/LessonDisplay'));
const Loader = loadable(() => import('components/Loader'));
const LessonList = loadable(() => import('components/LessonList'));
const UnderlineTitle = loadable(() => import('components/UnderlineTitle'));

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
