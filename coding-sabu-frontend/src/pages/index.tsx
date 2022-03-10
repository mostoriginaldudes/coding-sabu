import useFetchLessonList from 'hooks/useFetchLessonList';
import Loader from 'components/Loader';
import LessonDisplay from 'components/LessonDisplay';
import UnderlineTitle from 'components/UnderlineTitle';
import LessonList from 'components/LessonList';
import Head from 'next/head';
import { FiAlertTriangle } from 'react-icons/fi';
import { Empty } from 'styles/Home';
import { useMemo } from 'react';

export default function Home() {
  const { loading, data } = useFetchLessonList();

  const hasContent = useMemo(() => data && data.length > 0, [data]);

  return (
    <div>
      <Head>
        <title>HOME | 코딩사부</title>
      </Head>

      {loading && <Loader loading={loading} />}

      {!loading && hasContent && (
        <>
          <LessonDisplay lessons={data} />
          <UnderlineTitle title="수련 목록" />
          <LessonList lessons={data} />
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

export function getStaticProps() {
  return {
    props: {}
  };
}
