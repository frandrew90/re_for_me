import React from 'react';
import PropTypes from 'prop-types';
import Tutor from './Tutor/Tutor';

const TutorsBlock = ({ tutors = [] }) => {
  return (
    <div>
      <ul>
        {tutors.map(tutor => (
          <li key={tutor.email}>
            <Tutor tutor={tutor} />
          </li>
        ))}
      </ul>
    </div>
  );
};

TutorsBlock.propTypes = {
  tutors: PropTypes.arrayOf(
    PropTypes.shape({
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      patronymic: PropTypes.string,
      phone: PropTypes.string,
      email: PropTypes.string,
      city: PropTypes.string,
      options: PropTypes.string,
    }),
  ).isRequired,
};

export default TutorsBlock;
