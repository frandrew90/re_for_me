import React from 'react';
import PropTypes from 'prop-types';

const NavItem = ({ name }) => {
  return (
    <p>
      <a href="/">{name}</a>
    </p>
  );
};

export default NavItem;

NavItem.propTypes = {
  name: PropTypes.string.isRequired,
};
