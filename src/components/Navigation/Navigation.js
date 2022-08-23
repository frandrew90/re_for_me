import React from 'react';
import { useTranslation } from 'react-i18next';
import { HiOutlineLibrary, HiOutlineBeaker } from 'react-icons/hi';
import NavItem from './NavItem/NavItem.js';

const Navigation = () => {
  const { t } = useTranslation();
  return (
    <nav style={{ paddingTop: 12 }}>
      <NavItem
        name={t('sidebar.departments')}
        icon={<HiOutlineBeaker color="#ff6b0a" size={24} />}
        path="/faculties"
      />

      <NavItem
        name={t('sidebar.university')}
        icon={<HiOutlineLibrary color="#ff6b0a" size={24} />}
        path="/university"
      />
    </nav>
  );
};

export default Navigation;
