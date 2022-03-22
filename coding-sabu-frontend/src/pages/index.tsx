import { NextPage } from 'next';
import { useMemo } from 'react';
import { FiAlertTriangle } from 'react-icons/fi';
import Loader from 'components/Loader';
import LessonDisplay from 'components/LessonDisplay';
import UnderlineTitle from 'components/UnderlineTitle';
import LessonList from 'components/LessonList';
import PageHead from 'components/PageHead';
import useFetchLessonList from 'hooks/useFetchLessonList';
import { wrapper } from 'store';
import { fetchLessons } from 'store/lesson';
import { Empty } from 'styles/Home';

const Home: NextPage = () => {
  const [loading, allLessons] = useFetchLessonList('lessons');

  const hasContent = useMemo(() => allLessons && allLessons.length > 0, [allLessons]);

  return (
    <div>
      <PageHead title="HOME" />
      <Loader loading={loading} />
      {!loading && hasContent && (
        <>
          <LessonDisplay lessons={allLessons} />
          <UnderlineTitle title="수련 목록" />
          <LessonList lessons={allLessons} />
        </>
      )}
      {!loading && !hasContent && (
        <Empty>
          <h1>콘텐츠가 없습니다.</h1>
          <FiAlertTriangle />
        </Empty>
      )}
    </div>
  );
};

export default Home;

export const getStaticProps = wrapper.getStaticProps(store => async () => {
  await store.dispatch(fetchLessons());

  return {
    props: {}
  };
});
