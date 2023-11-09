import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { AppRoute } from 'AppRoute';
import { CenteredLayout } from 'components/centeredLayout/CenteredLayout';

import { Home } from 'views/home/Home';
import { SignIn } from 'views/signin/SignIn';
import { Dashboard } from 'views/dashboard/Dashboard';
import { ProtectedRoute } from 'components/protectedRoute/ProtectedRoute';
import { DashboardLayout } from 'components/dashboardLayout/DashboardLayout';
import { Profile } from 'views/profile/Profile';

export const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<CenteredLayout />}>
          <Route path={AppRoute.home} element={<Home />} />
          <Route path={AppRoute.signIn} element={<SignIn />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path={AppRoute.dashboard} element={<Dashboard />} />
            <Route path={AppRoute.profile} element={<Profile />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};
