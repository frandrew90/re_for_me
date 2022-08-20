import React from 'react';
// import PropTypes from 'prop-types';
import { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ThemeContext, themes } from '../../../context/themeContext';
// import { changeFilter } from '../../../redux/cities/citiesActions';
import { citiesActions } from '../../../redux/cities';
import s from './Filter.module.css';

const Filter = ({ label = '', onFilterChange, value }) => {
  const filter = useSelector(state => state.cities.filter);
  const dispatch = useDispatch();

  const { theme } = useContext(ThemeContext);
  return (
    <div className={s.container}>
      <label>
        {label}
        <input
          type="text"
          // value={value}
          value={filter}
          onChange={e => dispatch(citiesActions.changeFilter(e.target.value))}
          // onChange={e => dispatch(changeFilter(e.target.value))}
          // onChange={e => onFilterChange(e.target.value)}
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

// Filter.propTypes = {
//   label: PropTypes.string,
//   value: PropTypes.string.isRequired,
//   onFilterChange: PropTypes.func.isRequired,
// };

export default Filter;
