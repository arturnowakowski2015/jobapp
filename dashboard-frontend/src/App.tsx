import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { AppRoute } from 'AppRoute';
import { CenteredLayout } from 'components/centeredLayout/CenteredLayout';
import { Home } from 'views/home/Home';
import { SignIn } from 'views/signin/SignIn';

export const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<CenteredLayout />}>
          <Route path={AppRoute.home} element={<Home />} />
          <Route path={AppRoute.signIn} element={<SignIn />} />
        </Route>
      </Routes>
    </Router>
  );
};
