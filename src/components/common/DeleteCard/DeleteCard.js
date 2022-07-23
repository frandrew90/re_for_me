import React from 'react';
import PropTypes from 'prop-types';
import BigButton from '../BigButton/BigButton';

const DeleteCard = ({ text, onDelete, onClose }) => {
  return (
    <div className="modalContent">
      <p>{text}</p>
      <div className="btnWrapper">
        <BigButton text="No" onClickBtn={onClose} isGray />
        <BigButton text="Yes" onClickBtn={onDelete} />
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
