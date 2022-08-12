import React from 'react';
import { HiOutlineLibrary, HiOutlineBeaker } from 'react-icons/hi';
import NavItem from './NavItem/NavItem.js';

const Navigation = ({ navConfig }) => {
  return (
    <nav style={{ paddingTop: 12 }}>
      <NavItem
        name="Faculties "
        icon={<HiOutlineBeaker color="#ff6b0a" size={24} />}
        path="/"
      />

      <NavItem
        name="University"
        icon={<HiOutlineLibrary color="#ff6b0a" size={24} />}
        path="/university"
      />
    </nav>
  );
};

export default Navigation;
