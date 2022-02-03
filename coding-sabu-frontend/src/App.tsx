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
            <Route path="/" exact>
              <Home />
            </Route>
          </Switch>
        </Main>
      </Router>
    </Provider>
  );
};

export default App;
