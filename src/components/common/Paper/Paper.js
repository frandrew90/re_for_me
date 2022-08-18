import React from 'react';
import PropTypes from 'prop-types';
import { useContext } from 'react';
import { ThemeContext, themes } from '../../../context/themeContext';
import s from './Paper.module.scss';

const Paper = ({ children }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <div
      className={theme === themes.light ? s.paper : `${s.paper} ${s.paperDark}`}
    >
      {children}
    </div>
  );
};

Paper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Paper;
