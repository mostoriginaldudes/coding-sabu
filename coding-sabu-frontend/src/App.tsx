import { FC, memo } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import styled from '@emotion/styled';
import GlobalNav from 'components/GlobalNav';
import Home from 'pages/Home';
import MyPage from 'pages/MyPage';
import MyJoiningLessons from 'pages/MyJoiningLessons';
import MyTeachingLessons from 'pages/MyTeachingLessons';
import LessonForm from 'pages/LessonForm';
import LessonDetail from 'pages/LessonDetail';
import Logout from 'pages/Logout';
import NotFound from 'pages/NotFound';
import HeadUpDisplay from 'components/HeadUpDisplay';
import GlobalStyle from 'styles/GlobalStyle';
import { sizes } from 'styles/theme';
import Lecture from 'pages/Lecture';
import LectureForm from 'pages/LectureForm';

const Main = styled.main`
  width: calc(100% - 2rem);
  max-width: ${sizes.desktop}px;
  margin: ${sizes.unitBig / 8}em auto 2rem;
`;

const App: FC = () => {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <GlobalNav />
      <Main>
        <HeadUpDisplay />
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/mypage" component={MyPage} exact />
          <Route path="/mylesson" component={MyJoiningLessons} />
          <Route path="/myteaching" component={MyTeachingLessons} />
          <Route path="/lesson/form" component={LessonForm} />
          <Route path="/lesson/:id" component={LessonDetail} exact />
          <Route path="/lesson/:lessonId/lecture/form" component={LectureForm} />
          <Route path="/lesson/:lessonId/lecture/:unitId" component={Lecture} exact />
          <Route path="/logout" component={Logout} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Main>
    </BrowserRouter>
  );
};

export default memo(App);
