/** @jsxImportSource @emotion/react */

import React from 'react';
import PropTypes from 'prop-types';

// .section{
//   position: relative;
//   margin-bottom: 32px;

//   & .header{
//     display: flex;
//     align-items: center;
//     margin-bottom: 32px;

//     & .img-wrapper{
//       margin-right: 8px;
//     }
//   }
// }

const sectionStyle = {
  position: 'relative',
  marginBottom: '32px',

  '& .header': {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 32,

    '& .img-wrapper': {
      marginRight: '8px',
    },
  },
};

const Section = ({ title, icon, children }) => {
  return (
    <section className="section" css={sectionStyle}>
      <div className="header">
        <div className="img-wrapper">
          <img src={icon} alt={title} />
        </div>
        <h3 className="heading">{title}</h3>
      </div>
      {children}
    </section>
  );
};

Section.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Section;
