/** @jsxImportSource @emotion/react */

import React from 'react';
import PropTypes from 'prop-types';
import emailIcon from '../../../images/envelop.svg';
import phoneIcon from '../../../images/mobile.svg';
import geoIcon from '../../../images/location2.svg';

const blockStyles = {
  display: 'flex',
  padding: 14,
  fontSize: 16,
  lineHeight: 1.5,
};

const nameStyles = {
  paddingRight: 24,
  flex: '0 0 200px',
};

const dataStyles = {
  ...nameStyles,
  flexBasis: 300,
};

const dataTextStyles = {
  display: 'flex',
  alignItems: 'center',
  '& .text': {
    marginLeft: 8,
  },
};

const Tutor = ({ tutor }) => {
  return (
    <div css={blockStyles}>
      <div css={nameStyles}>
        <p>{tutor.lastName}</p>
        <p>{tutor.firstName}</p>
        <p>{tutor.patronymic}</p>
      </div>
      <div css={dataStyles}>
        <p css={dataTextStyles}>
          <img src={phoneIcon} alt="Phone number" width={15} />
          <span>{tutor.phone}</span>
        </p>
        <p css={dataTextStyles}>
          <img src={emailIcon} alt="Email" width={15} />
          <span>{tutor.email}</span>
        </p>
        <p css={dataTextStyles}>
          <img src={geoIcon} alt="Location" width={15} />
          <span>{tutor.city}</span>
        </p>
      </div>
      <div>
        <p>{tutor.options}</p>
      </div>
    </div>
  );
};

Tutor.propTypes = {
  tutor: PropTypes.object,
};

export default Tutor;
