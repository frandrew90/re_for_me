import React from 'react';
// import { navConfig } from '../../data/navigation.js';
import NavItem from './NavItem/NavItem.js';

const Navigation = ({ navConfig }) => {
  return (
    <nav style={{ paddingTop: 12 }}>
      {navConfig.map(navItem => (
        <NavItem key={navItem.name} name={navItem.name} icon={navItem.icon} />
      ))}
    </nav>
  );
};

export default Navigation;
