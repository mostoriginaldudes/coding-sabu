import { NextPage } from 'next';
import LessonList from 'components/LessonList';
import UnderlineTitle from 'components/UnderlineTitle';
import Loader from 'components/Loader';
import PageHead from 'components/PageHead';
import { wrapper } from 'store';
import { fetchMyJoiningLessons } from 'store/lesson';
import { Lesson } from 'types';

interface Props {
  loading: boolean;
  lessons: Lesson[];
}

const MyJoiningLessons: NextPage<Props> = ({ loading, lessons }) => {
  return (
    <div>
      <PageHead title="내 수련 목록" />
      <UnderlineTitle title="내 수련 목록" />
      <Loader loading={loading} />
      <LessonList lessons={lessons} />
    </div>
  );
};

export default MyJoiningLessons;

export const getServerSideProps = wrapper.getServerSideProps(store => async () => {
  await store.dispatch(fetchMyJoiningLessons());

  const { loading, data: lessons } = store.getState().lesson.myJoiningLessons;
  return {
    props: { loading, lessons }
  };
});
