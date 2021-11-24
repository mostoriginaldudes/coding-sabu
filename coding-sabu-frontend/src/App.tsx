import { FC } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import GlobalStyle from './styles/GlobalStyle';
import GlobalNav from './components/GlobalNav';

const App: FC = () => {
  return (
    <Router>
      <GlobalStyle />
      <GlobalNav />
    </Router>
  );
};

export default App;
