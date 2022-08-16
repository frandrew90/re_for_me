import React, { useContext, lazy, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Loader from '../common/Loader/Loader';
// import FacultyPage from '../../pages/FacultyPage/FacultyPage';
// import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage';
// import UniversityPage from '../../pages/UniversityPage/UniversityPage';
// import FacultyListPage from '../../pages/FacultyListPage/FacultyListPage';
import { ThemeContext, themes } from '../../context/themeContext';

import s from './Main.module.css';

const FacultyPage = lazy(() =>
  import(
    '../../pages/FacultyPage/FacultyPage' /*webpackChunkName: "Faculty___Page" */
  ),
);
const FacultyListPage = lazy(() =>
  import(
    '../../pages/FacultyListPage/FacultyListPage' /*webpackChunkName: "FacultyList___Page" */
  ),
);
const UniversityPage = lazy(() =>
  import(
    '../../pages/UniversityPage/UniversityPage' /*webpackChunkName: "University___Page" */
  ),
);
const NotFoundPage = lazy(() =>
  import(
    '../../pages/NotFoundPage/NotFoundPage' /*webpackChunkName: "NotFound___Page" */
  ),
);

const Main = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <main className={theme === themes.light ? s.lightTheme : s.darkTheme}>
      <Suspense fallback={<Loader />}>
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/faculties" />} />

          {/* ==== */}
          <Route
            exact
            path="/re_for_me"
            render={() => <Redirect to="/university" />}
          />
          {/* ==== */}

          <Route path="/faculties/:id" render={() => <FacultyPage />} />

          <Route path="/faculties">
            <FacultyListPage />
          </Route>

          <Route path="/university">
            <UniversityPage />
          </Route>

          <Route>
            <NotFoundPage />
          </Route>
        </Switch>
      </Suspense>
    </main>
  );
};

export default Main;
