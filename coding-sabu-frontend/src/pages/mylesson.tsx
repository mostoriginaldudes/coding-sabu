import LessonList from 'components/LessonList';
import UnderlineTitle from 'components/UnderlineTitle';
import Loader from 'components/Loader';
import PageHead from 'components/PageHead';
import useFetchLessonList from 'hooks/useFetchLessonList';
import { wrapper } from 'store';
import { fetchMyJoiningLessons } from 'store/lesson';

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

export const getServerSideProps = wrapper.getServerSideProps(store => async () => {
  await store.dispatch(fetchMyJoiningLessons());

  return {
    props: {}
  };
});
