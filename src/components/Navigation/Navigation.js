import React from 'react';
import { navConfig } from '../../data/navigation.js';
import NavItem from './NavItem/NavItem.js';

const Navigation = () => {
  return (
    <nav>
      {navConfig.map(navItem => (
        <NavItem key={navItem.name} name={navItem.name} />
      ))}
    </nav>
  );
};

export default Navigation;
