import { FC } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import GlobalStyle from './styles/GlobalStyle';
import GlobalNav from './components/GlobalNav';
import UserAuthForm from './components/UserAuthForm';

const App: FC = () => {
  return (
    <Router>
      <GlobalStyle />
      <GlobalNav />
      <UserAuthForm />
    </Router>
  );
};

export default App;
