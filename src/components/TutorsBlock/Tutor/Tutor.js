import React from 'react';
import PropTypes from 'prop-types';
import emailIcon from '../../../images/envelop.svg';
import phoneIcon from '../../../images/mobile.svg';
import geoIcon from '../../../images/location2.svg';

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
          <img src={phoneIcon} alt="Phone number" width={15} />
          <span>{tutor.phone}</span>
        </p>
        <p>
          <img src={emailIcon} alt="Email" width={15} />
          <span>{tutor.email}</span>
        </p>
        <p>
          <img src={geoIcon} alt="Location" width={15} />
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
