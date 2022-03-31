import { NextPage } from 'next';
import { useMemo } from 'react';
import { FiAlertTriangle } from 'react-icons/fi';
import Loader from 'components/Loader';
import LessonDisplay from 'components/LessonDisplay';
import UnderlineTitle from 'components/UnderlineTitle';
import LessonList from 'components/LessonList';
import PageHead from 'components/PageHead';
import { wrapper } from 'store';
import { fetchLessons } from 'store/lesson';
import { Empty } from 'styles/Home';
import { Lesson } from 'types';

interface Props {
  loading: boolean;
  allLessons: Lesson[];
}

const Home: NextPage<Props> = ({ loading, allLessons }) => {
  const hasContent = useMemo(() => allLessons && allLessons.length > 0, [allLessons]);

  return (
    <div>
      <PageHead title="HOME" />
      <Loader loading={loading} />
      {hasContent ? (
        <>
          <LessonDisplay lessons={allLessons} />
          <UnderlineTitle title="수련 목록" />
          <LessonList lessons={allLessons} />
        </>
      ) : (
        <Empty>
          <h1>콘텐츠가 없습니다.</h1>
          <FiAlertTriangle />
        </Empty>
      )}
    </div>
  );
};

export default Home;

export const getServerSideProps = wrapper.getServerSideProps(store => async () => {
  await store.dispatch(fetchLessons());

  const { loading, data: allLessons } = store.getState().lesson.lessons;
  return {
    props: {
      loading,
      allLessons
    }
  };
});
