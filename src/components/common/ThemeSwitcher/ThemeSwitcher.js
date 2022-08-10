import React, { useContext } from 'react';
import { IconContext } from 'react-icons';
import { BsFillMoonFill } from 'react-icons/bs';
import { BsFillBrightnessHighFill } from 'react-icons/bs';
import { ThemeContext, themes } from '../../../context/themeContext';
import s from './ThemeSwitcher.module.css';

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className={s.toggle}>
      <IconContext.Provider
        value={{
          size: '1em',
          style: { verticalAlign: 'middle' },
        }}
      >
        <span>
          <BsFillMoonFill />
        </span>
      </IconContext.Provider>
      <input
        type="checkbox"
        onChange={toggleTheme}
        checked={theme === themes.light}
        id="toggle"
      />
      {/* <span className={`${s.slider} ${s.round}`}></span> */}
      <label className="s.switch" htmlFor="toggle">
        {' '}
      </label>
      <IconContext.Provider
        value={{
          size: '1.3em',
          style: { verticalAlign: 'middle' },
        }}
      >
        <span>
          <BsFillBrightnessHighFill />
        </span>
      </IconContext.Provider>
    </div>
  );
};

export default ThemeSwitcher;
