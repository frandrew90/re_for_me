import React from 'react';
import PropTypes from 'prop-types';
import './NavItem.scss';

const navItemStyles = isActive => {
  const finalStyles = ['NavItem'];

  if (isActive) {
    finalStyles.push('NavItemActive');
  }
  return finalStyles.join(' ');
};

const NavItem = ({ name, icon }) => {
  const isActive = true;

  return (
    <div className={navItemStyles(isActive)}>
      <span className="icon-Wrapper">{icon}</span>
      <a className="itemName" href="/">
        {name}
      </a>
    </div>
  );
};

export default NavItem;

NavItem.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.object,
};
