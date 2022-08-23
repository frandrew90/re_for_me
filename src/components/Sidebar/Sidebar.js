// import React, { useState } from 'react';
import { useContext, Suspense } from 'react';
import useToggle from '../../hooks/useToggle';
import Navigation from '../Navigation/Navigation';
import Loader from '../common/Loader/Loader';
import { navConfig } from '../../data/navigation';
import { ThemeContext } from '../../context/themeContext';
import './Sidebar.css';

const defineStyles = (isOpen, theme) => {
  const finalStyles = ['Sidebar'];

  if (!isOpen) {
    finalStyles.push('Sidebar-closed');
  }
  // console.log(theme);
  if (theme === 'dark') {
    finalStyles.push('Sidebar-dark');
  }
  return finalStyles.join(' ');
};

const Sidebar = () => {
  const { theme } = useContext(ThemeContext);

  const [isOpen, toggleSidebar] = useToggle(true);

  // const [isOpen, setIsOpen] = useState(true);

  // const toggleSidebar = () => {
  //   setIsOpen(prevIsOpen => !prevIsOpen);
  // };

  return (
    // <div className={`Sidebar ${isOpen ? '' : 'Sidebar-closed'}`}>
    <div className={defineStyles(isOpen, theme)}>
      <div className="Sidebar-decor"></div>
      <button
        className="toggle-btn"
        aria-label="Toggle sidebar"
        onClick={toggleSidebar}
      ></button>
      <Suspense fallback={<Loader />}>
        <Navigation navConfig={navConfig} />
      </Suspense>
    </div>
  );
};

export default Sidebar;
