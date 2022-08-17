import React from 'react';
import PropTypes from 'prop-types';
import { useContext } from 'react';
import { ThemeContext, themes } from '../../../context/themeContext';
import s from './Filter.module.css';

const Filter = ({ label = '', onFilterChange, value }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={s.container}>
      <label>
        {label}
        <input
          type="text"
          value={value}
          onChange={e => onFilterChange(e.target.value)}
          className={
            theme === themes.light
              ? s.filterInput
              : `${s.filterInput} ${s.filterInputDark}`
          }
        />
      </label>
    </div>
  );
};

Filter.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired,
};

export default Filter;
