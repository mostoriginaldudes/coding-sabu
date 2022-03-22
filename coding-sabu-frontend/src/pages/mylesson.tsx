import LessonList from 'components/LessonList';
import UnderlineTitle from 'components/UnderlineTitle';
import Loader from 'components/Loader';
import PageHead from 'components/PageHead';
import useFetchLessonList from 'hooks/useFetchLessonList';

export default function MyJoiningLessons() {
  const [loading, lessons] = useFetchLessonList('myJoiningLessons');

  return (
    <div>
      <PageHead title="내 수련 목록" />
      <UnderlineTitle title="내 수련 목록" />
      <Loader loading={loading} />
      <LessonList lessons={lessons} />
    </div>
  );
}
