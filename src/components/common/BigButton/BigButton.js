/** @jsxImportSource @emotion/react */
import React from 'react';
import PropTypes from 'prop-types';
// import { btnStyled } from './BugButton.styled';

export const btnStyled = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '12px 16px',
  backgroundColor: '#FF6B0A',
  border: 'none',
  cursor: 'pointer',
  transition: 'all 200ms',
  '&:not(:disabled):hover': {
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)',
  },
  '&:disabled': {
    backgroundColor: '#FFE0B2',
    cursor: 'not-allowed',
  },
  '& .image': {
    marginRight: 10,
    // with: 12,
    // height: 12,
  },
  '& .heading': {
    // color: '#fff',
    lineHeight: 1.2,
  },
};

const defineStyles = isGray => ({
  ...btnStyled,
  backgroundColor: isGray ? '#BDBDBD' : '#FF6B0A',
});

const BigButton = ({
  text,
  icon,
  onClickBtn = () => {},
  type = 'button',
  disabled = false,
  isGray = false,
}) => {
  const finalStyles = defineStyles(isGray);

  return (
    <button
      css={finalStyles}
      type={type}
      onClick={onClickBtn}
      disabled={disabled}
    >
      {icon && <img className="image" src={icon} alt={text} />}
      <span className="heading"> {text}</span>
    </button>
  );
};

BigButton.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.string,
  onClickBtn: PropTypes.func,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  isGray: PropTypes.bool,
};

export default BigButton;
