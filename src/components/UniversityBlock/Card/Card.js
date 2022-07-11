import React from 'react';
import PropTypes from 'prop-types';
import universityBuilding from '../../../images/building2.png';
import { ReactComponent as EditIcon } from '../../../images/pencil.svg';
import { ReactComponent as DeleteIcon } from '../../../images/cancel-circle.svg';
import tutorIcon from '../../../images/library.svg';

const Card = ({ name }) => {
  return (
    <div>
      <div>
        <img src={universityBuilding} alt="University" width={100} />
      </div>
      <img src={tutorIcon} alt="University" />
      <p>University</p>
      <h3>{name}</h3>
      <div>
        <button>
          <EditIcon />
        </button>
        <button>
          <DeleteIcon />
        </button>
      </div>
    </div>
  );
};

Card.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Card;
