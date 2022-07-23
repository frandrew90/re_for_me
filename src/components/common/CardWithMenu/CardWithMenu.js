/** @jsxImportSource @emotion/react */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import randomIcon from '../../../images/make-group.svg';
import { itemStyles } from '../../../styles/listStyles';

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
        <div css={itemStyles}>
          <p>{text}</p>
          <button onClick={this.toggleMenu} aria-label="Menu">
            <img src={randomIcon} alt="Menu" />
          </button>
          {isMenuOpen && (
            <div className="menuStyles">
              <div className="menu-item" onClick={this.handleEdit}>
                <span>
                  <img src={randomIcon} alt="Edit" />
                </span>
                <span>Edit</span>
              </div>

              <div className="menu-item" onClick={this.handleDelete}>
                <span>
                  <img src={randomIcon} alt="Delete" />
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
