import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import FacultyPage from '../../pages/FacultyPage/FacultyPage';
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage';
import UniversityPage from '../../pages/UniversityPage/UniversityPage';
import FacultyListPage from '../../pages/FacultyListPage/FacultyListPage';
import { ThemeContext, themes } from '../../context/themeContext';
import s from './Main.module.css';

const Main = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <main className={theme === themes.light ? s.lightTheme : s.darkTheme}>
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
    </main>
  );
};

export default Main;
