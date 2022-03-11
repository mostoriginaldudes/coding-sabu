import LessonList from 'components/LessonList';
import UnderlineTitle from 'components/UnderlineTitle';
import Loader from 'components/Loader';
import Head from 'next/head';
import useFetchLessonList from 'hooks/useFetchLessonList';

export default function MyJoiningLessons() {
  const [loading, lessons] = useFetchLessonList('myJoiningLessons');

  return (
    <div>
      <Head>
        <title>내 수련 목록 | 코딩사부</title>
      </Head>
      <UnderlineTitle title="내 수련 목록" />
      <Loader loading={loading} />
      <LessonList lessons={lessons} />
    </div>
  );
}
