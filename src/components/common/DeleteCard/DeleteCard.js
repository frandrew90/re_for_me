import React from 'react';
import PropTypes from 'prop-types';
import BigButton from '../BigButton/BigButton';
import s from './DeleteCard.module.css';

const DeleteCard = ({ text, onDelete, onClose }) => {
  return (
    <div className={s.modalContent}>
      <p className={s.modalText}>{text}</p>
      <div className={s.btnWrapper}>
        <BigButton text="No!!" onClickBtn={onClose} />
        <BigButton text="Yes" onClickBtn={onDelete} isGray />
      </div>
    </div>
  );
};

DeleteCard.propTypes = {
  text: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default DeleteCard;
