/** @jsxImportSource @emotion/react */
import React from 'react';
import PropTypes from 'prop-types';
import { btnStyled } from './BugButton.styled';

const BigButton = ({ text, icon }) => {
  return (
    <button css={btnStyled}>
      {icon && <img className="image" src={icon} alt={text} width={15} />}
      <span className="heading"> {text}</span>
    </button>
  );
};

BigButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  icon: PropTypes.string,
};

export default BigButton;
