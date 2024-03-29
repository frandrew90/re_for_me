import React, { useContext, Suspense } from 'react';
import PropTypes from 'prop-types';
import { ThemeContext, themes } from '../../context/themeContext';
import ThemeSwitcher from '../common/ThemeSwitcher/ThemeSwitcher';
import LanguageSwitcher from '../common/LanguageSwitcher/LanguageSwitcher';
import s from './Header.module.css';
import Loader from '../common/Loader/Loader';

const Header = ({ title }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <header className={theme === themes.light ? s.lightTheme : s.darkTheme}>
      <div className={s.switchersWrapper}>
        <Suspense fallback={<Loader />}>
          <LanguageSwitcher />
        </Suspense>

        <ThemeSwitcher />
      </div>
      {title && <h2 className="heading">{title}</h2>}
    </header>
  );
};

Header.propTypes = {
  title: PropTypes.string,
};

export default Header;
