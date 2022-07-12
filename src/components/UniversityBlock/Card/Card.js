import React from 'react';
import PropTypes from 'prop-types';
import universityBuilding from '../../../images/building2.png';
import { ReactComponent as EditIcon } from '../../../images/pencil.svg';
import { ReactComponent as DeleteIcon } from '../../../images/cancel-circle.svg';
// import tutorIcon from '../../../images/library.svg';
import s from './Card.module.css';

const Card = ({ name }) => {
  const isAdmin = true;
  return (
    <div className={s.card}>
      <div className={s.imgWrapper}>
        <img src={universityBuilding} alt="University" width={100} />
      </div>
      {/* <img src={tutorIcon} alt="University" /> */}
      <p className={s.text}>University</p>
      <h3 className={`heading ${s.wrapper}`}>{name}</h3>
      <div className={s.btn_container}>
        <button className={s.active} aria-label="Edit">
          <EditIcon />
        </button>

        <button
          disabled={!isAdmin}
          className={isAdmin ? s.active : s.disabled}
          aria-label="Delete"
        >
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
