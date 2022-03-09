import useFetchLessonList from 'hooks/useFetchLessonList';
import Loader from 'components/Loader';
import LessonDisplay from 'components/LessonDisplay';
import UnderlineTitle from 'components/UnderlineTitle';
import LessonList from 'components/LessonList';
import Head from 'next/head';

export default function Home() {
  const { loading, data } = useFetchLessonList();

  return (
    <div>
      <Head>
        <title>HOME | 코딩사부</title>
      </Head>
      {loading && <Loader loading={loading} />}
      <LessonDisplay lessons={data} />
      <UnderlineTitle title="수련 목록" />
      <LessonList lessons={data} />
    </div>
  );
}

export function getStaticProps() {
  return {
    props: {}
  };
}
