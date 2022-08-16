import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import PropTypes from 'prop-types';
import { ThemeContext, themes } from '../../../context/themeContext';
import './NavItem.scss';

const NavItem = ({ name, icon, path }) => {
  const { theme } = useContext(ThemeContext);

  const navItemStyles = ['NavItem'];
  theme === themes.dark && navItemStyles.push('navItemDark');

  return (
    <NavLink
      to={path}
      className={navItemStyles.join(' ')}
      activeClassName="NavItemActive"
    >
      <span className="iconWrapper">{icon}</span>
      <span className="itemName">{name}</span>
    </NavLink>
  );
  // return (
  //   <a href="/" className={navItemStyles.join(' ')}>
  //     <span className="iconWrapper">{icon}</span>
  //     <span className="itemName">{name}</span>
  //   </a>
  // );
};

export default NavItem;

NavItem.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.object.isRequired,
  path: PropTypes.string.isRequired,
};
