import React, { useContext } from 'react';
import { Switch, Route } from 'react-router-dom';
import UniversityPage from '../../pages/UniversityPage/UniversityPage';
import FacultyListPage from '../../pages/FacultyListPage/FacultyListPage';
import { ThemeContext, themes } from '../../context/themeContext';
import s from './Main.module.css';

const Main = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <main className={theme === themes.light ? s.lightTheme : s.darkTheme}>
      <Switch>
        <Route exact path="/">
          <FacultyListPage />
        </Route>

        <Route path="/university">
          <UniversityPage />
        </Route>
      </Switch>
    </main>
  );
};

export default Main;
