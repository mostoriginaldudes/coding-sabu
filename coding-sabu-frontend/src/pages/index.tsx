import Head from 'next/head';
import { useMemo } from 'react';
import { FiAlertTriangle } from 'react-icons/fi';
import Loader from 'components/Loader';
import LessonDisplay from 'components/LessonDisplay';
import UnderlineTitle from 'components/UnderlineTitle';
import LessonList from 'components/LessonList';
import useFetchLessonList from 'hooks/useFetchLessonList';
import { wrapper } from 'store';
import { Empty } from 'styles/Home';

export default function Home() {
  const [loading, allLessons] = useFetchLessonList('lessons');

  const hasContent = useMemo(() => allLessons && allLessons.length > 0, [allLessons]);

  return (
    <div>
      <Head>
        <title>HOME | 코딩사부</title>
      </Head>
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
}

export const getServerSideProps = wrapper.getServerSideProps(store => async context => {
  return {
    props: {}
  };
});
