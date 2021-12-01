import { FC } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import GlobalStyle from './styles/GlobalStyle';
import GlobalNav from './components/GlobalNav';
import styled from '@emotion/styled';
import { sizes } from './styles/theme';
import Home from 'pages/Home';

const Main = styled.main`
  width: calc(100% - 2rem);
  max-width: ${sizes.desktop}px;
  margin: ${sizes.unitBig / 8}em auto 0;
`;

const App: FC = () => {
  return (
    <Router>
      <GlobalStyle />
      <GlobalNav />
      <Main>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
        </Switch>
      </Main>
    </Router>
  );
};

export default App;
