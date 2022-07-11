import React from 'react';
import PropTypes from 'prop-types';

const NavItem = ({ name }) => {
  return <a href="/">{name}</a>;
};

export default NavItem;

NavItem.propTypes = {
  name: PropTypes.string.isRequired,
};
