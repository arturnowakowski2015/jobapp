import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import {
  AppRoute,
  getEditCandidateUrl,
  getEditJobUrl,
  getSingleCandidateUrl,
  getSingleJobUrl,
} from 'AppRoute';
import { CenteredLayout } from 'components/centeredLayout/CenteredLayout';
import { DashboardLayout } from 'components/dashboardLayout/DashboardLayout';
import { ProtectedRoute } from 'components/protectedRoute/ProtectedRoute';
import { AddJob } from 'views/addJob/AddJob';
import { Candidates } from 'views/candidates/Candidates';
import { Dashboard } from 'views/dashboard/Dashboard';
import { EditJob } from 'views/editJob/EditJob';
import { Home } from 'views/home/Home';
import { Jobs } from 'views/jobs/Jobs';
import { Profile } from 'views/profile/Profile';
import { SignIn } from 'views/signin/SignIn';
import { SignUp } from 'views/signup/SignUp';
import { SingleJob } from 'views/singleJob/SingleJob';
import { SingleCandidate } from 'views/singleCandidate/SingleCandidate';
import { AddCandidate } from 'views/addCandidate/AddCandidate';
import { EditCandidate } from 'views/editCandidate/EditCandidate';

export const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<CenteredLayout />}>
          <Route path={AppRoute.home} element={<Home />} />
          <Route path={AppRoute.signIn} element={<SignIn />} />
          <Route path={AppRoute.signUp} element={<SignUp />} />
        </Route>

        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path={AppRoute.dashboard} element={<Dashboard />} />
          <Route path={AppRoute.profile} element={<Profile />} />
          <Route path={AppRoute.jobs} element={<Jobs />} />
          <Route path={getSingleJobUrl(':id')} element={<SingleJob />} />
          <Route path={AppRoute.addJob} element={<AddJob />} />
          <Route path={getEditJobUrl(':id')} element={<EditJob />} />
          <Route path={AppRoute.candidates} element={<Candidates />} />
          <Route
            path={getSingleCandidateUrl(':id')}
            element={<SingleCandidate />}
          />
          <Route path={AppRoute.addCandidate} element={<AddCandidate />} />
          <Route
            path={getEditCandidateUrl(':id')}
            element={<EditCandidate />}
          />
        </Route>
      </Routes>
    </Router>
  );
};
