// import React, { useState } from 'react';
// import  {  useContext } from 'react';
import useToggle from '../../hooks/useToggle';
import Navigation from '../Navigation/Navigation';
import { navConfig } from '../../data/navigation';
import './Sidebar.css';

const defineStyles = (isOpen, theme) => {
  const finalStyles = ['Sidebar'];

  if (!isOpen) {
    finalStyles.push('Sidebar-closed');
  }
  return finalStyles.join(' ');
};

const Sidebar = () => {
  // const { theme } = useContext(ThemeContext);

  const [isOpen, toggleSidebar] = useToggle(true);

  // const [isOpen, setIsOpen] = useState(true);

  // const toggleSidebar = () => {
  //   setIsOpen(prevIsOpen => !prevIsOpen);
  // };

  return (
    // <div className={`Sidebar ${isOpen ? '' : 'Sidebar-closed'}`}>
    <div className={defineStyles(isOpen)}>
      <div className="Sidebar-decor"></div>
      <button
        className="toggle-btn"
        aria-label="Toggle sidebar"
        onClick={toggleSidebar}
      ></button>
      <Navigation navConfig={navConfig} />
    </div>
  );
};

export default Sidebar;
