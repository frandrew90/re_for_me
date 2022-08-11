// /** @jsxImportSource @emotion/react */
import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import useOutsideClickDetector from '../../../hooks/useOutsideClickDetector';
import randomIcon from '../../../images/make-group.svg';
import editIcon from '../../../images/pencil.svg';
import deleteIcon from '../../../images/bin.svg';
import s from './CardWithMenu.module.css';

const CardWithMenu = ({ text, onEdit, onDelete }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const cardRef = useRef(null);

  const toggleMenu = () => setIsMenuOpen(prevIsMenuOpen => !prevIsMenuOpen);

  useOutsideClickDetector(cardRef, toggleMenu, isMenuOpen);

  const handleEdit = () => {
    onEdit();
    toggleMenu();
  };

  const handleDelete = () => {
    onDelete();
    toggleMenu();
  };

  return (
    <>
      <div ref={cardRef} className={s.container}>
        <p>{text}</p>
        <button className={s.menuButton} onClick={toggleMenu} aria-label="Menu">
          <img src={randomIcon} alt="Menu" />
        </button>

        {isMenuOpen && (
          <div className={s.menuStyles}>
            <div className={s.menuItem} onClick={handleEdit}>
              <span>
                <img className={s.menuItemImg} src={editIcon} alt="Edit" />
              </span>
              <span>Edit</span>
            </div>

            <div className={s.menuItem} onClick={handleDelete}>
              <span>
                <img className={s.menuItemImg} src={deleteIcon} alt="Delete" />
              </span>
              <span>Delete</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

CardWithMenu.propTypes = {
  text: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default CardWithMenu;
