import React from 'react';
import PropTypes from 'prop-types';

const Tutor = ({ tutor }) => {
  return (
    <div>
      <div>
        <p>{tutor.lastName}</p>
        <p>{tutor.firstName}</p>
        <p>{tutor.patronymic}</p>
      </div>
      <div>
        <p>
          <span>{tutor.phone}</span>
        </p>
        <p>
          <span>{tutor.email}</span>
        </p>
        <p>
          <span>{tutor.city}</span>
        </p>
      </div>
      <div>
        <p>{tutor.options}</p>
      </div>
    </div>
  );
};

Tutor.propTypes = {
  tutor: PropTypes.object,
};

export default Tutor;
