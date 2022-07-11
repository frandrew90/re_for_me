import React from 'react';
import PropTypes from 'prop-types';
import Tutor from './Tutor/Tutor';
import tutorIcon from '../../images/user-tie.svg';
import addIcon from '../../images/plus.svg';
import BigButton from '../common/BigButton/BigButton';

const TutorsBlock = ({ tutors = [] }) => {
  return (
    <div>
      <img src={tutorIcon} alt="Tutors" />
      <h3>Tutors</h3>
      <ul>
        {tutors.map(tutor => (
          <li key={tutor.email}>
            <Tutor tutor={tutor} />
          </li>
        ))}
      </ul>
      <BigButton icon={addIcon} text="Add Tutor" />
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
