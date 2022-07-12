import React from 'react';
import PropTypes from 'prop-types';
import Paper from '../common/Paper/Paper';

const FacultyBlock = ({ department = [] }) => {
  return (
    <section>
      <Paper>
        <ul>
          {department.map(depart => (
            <li key={depart.name}>
              <p>{depart.name}</p>
            </li>
          ))}
        </ul>
      </Paper>
    </section>
  );
};

export default FacultyBlock;

FacultyBlock.propTypes = {
  department: PropTypes.array.isRequired,
};
