import React from 'react';
import PropTypes from 'prop-types';
import s from './Filter.module.css';

const Filter = ({ label = '', onFilterChange, value }) => {
  return (
    <div className={s.container}>
      <label>
        {label}
        <input
          type="text"
          value={value}
          onChange={e => onFilterChange(e.target.value)}
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
