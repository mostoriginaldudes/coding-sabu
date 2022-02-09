import { FC } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from 'store';
import styled from '@emotion/styled';

import GlobalNav from './components/GlobalNav';
import Home from 'pages/Home';
import GlobalStyle from './styles/GlobalStyle';
import { sizes } from './styles/theme';
import HeadUpDisplay from 'components/HeadUpDisplay';
import MyTeachingLessons from 'pages/MyTeachingLessons';
import MyJoiningLessons from 'pages/MyJoiningLessons';
import LessonForm from 'pages/LessonForm';
import LessonDetail from 'pages/LessonDetail';

const Main = styled.main`
  width: calc(100% - 2rem);
  max-width: ${sizes.desktop}px;
  margin: ${sizes.unitBig / 8}em auto 0;
`;

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
            <Route path="/mylesson" component={MyJoiningLessons} />
            <Route path="/myteaching" component={MyTeachingLessons} />
            <Route path="/lesson/form" component={LessonForm} />
            <Route path="/lesson/:id" component={LessonDetail} />
          </Switch>
        </Main>
      </Router>
    </Provider>
  );
};

export default App;
