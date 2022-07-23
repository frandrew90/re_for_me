import React from 'react';
import PropTypes from 'prop-types';
import BigButton from '../BigButton/BigButton';

const DeleteCard = ({ label, inputValue, onSave }) => {
  return (
    <div className="modalContent">
      <p>{label}</p>
      <div className="btnWrapper">
        <BigButton text="Yes" onClickBtn={onSave} />
      </div>
    </div>
  );
};

DeleteCard.propTypes = {
  label: PropTypes.string.isRequired,
  onSave: PropTypes.func.isRequired,
  inputValue: PropTypes.string,
};

export default DeleteCard;
