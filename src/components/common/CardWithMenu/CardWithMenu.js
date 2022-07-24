// /** @jsxImportSource @emotion/react */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import randomIcon from '../../../images/make-group.svg';
import editIcon from '../../../images/pencil.svg';
import deleteIcon from '../../../images/bin.svg';
// import { itemStyles } from '../../../styles/listStyles';
import s from './CardWithMenu.module.css';

class CardWithMenu extends Component {
  state = {
    isMenuOpen: false,
  };

  toggleMenu = () => {
    this.setState(prevState => ({ isMenuOpen: !prevState.isMenuOpen }));
  };

  handleEdit = () => {
    this.props.onEdit();
    this.toggleMenu();
  };

  handleDelete = () => {
    this.props.onDelete();
    this.toggleMenu();
  };

  render() {
    const { text } = this.props;
    const { isMenuOpen } = this.state;

    return (
      <>
        <div className={s.container}>
          <p>{text}</p>
          <button
            className={s.menuButton}
            onClick={this.toggleMenu}
            aria-label="Menu"
          >
            <img src={randomIcon} alt="Menu" />
          </button>
          {isMenuOpen && (
            <div className={s.menuStyles}>
              <div className={s.menuItem} onClick={this.handleEdit}>
                <span>
                  <img className={s.menuItemImg} src={editIcon} alt="Edit" />
                </span>
                <span>Edit</span>
              </div>

              <div className={s.menuItem} onClick={this.handleDelete}>
                <span>
                  <img
                    className={s.menuItemImg}
                    src={deleteIcon}
                    alt="Delete"
                  />
                </span>
                <span>Delete</span>
              </div>
            </div>
          )}
        </div>
      </>
    );
  }
}

CardWithMenu.propTypes = {
  text: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default CardWithMenu;
