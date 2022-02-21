import { FC, memo } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
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
import store from 'store';
import GlobalStyle from 'styles/GlobalStyle';
import { sizes } from 'styles/theme';
import { injectStore } from 'apis/instance';

const Main = styled.main`
  width: calc(100% - 2rem);
  max-width: ${sizes.desktop}px;
  margin: ${sizes.unitBig / 8}em auto 2rem;
`;

injectStore(store);

const App: FC = () => {
  return (
    <Provider store={store}>
      <Router>
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
            <Route path="/lesson/:id" component={LessonDetail} />
            <Route path="/logout" component={Logout} />
            <Route path="*" component={NotFound} />
          </Switch>
        </Main>
      </Router>
    </Provider>
  );
};

export default memo(App);
