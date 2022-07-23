import React from 'react';
import PropTypes from 'prop-types';

const Filter = ({ label = '', onFilterChange, value }) => {
  return (
    <div>
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
