import React from 'react';
import Navigation from '../Navigation/Navigation';
import './Sidebar.css';

const defineStyles = isOpen => {
  const finalStyles = ['Sidebar'];

  if (!isOpen) {
    finalStyles.push('Sidebar-closed');
  }
  return finalStyles.join(' ');
};

const Sidebar = () => {
  const isOpen = false;
  return (
    // <div className={`Sidebar ${isOpen ? '' : 'Sidebar-closed'}`}>
    <div className={defineStyles(isOpen)}>
      <div className="Sidebar-decor"></div>
      <button className="toggle-btn" aria-label="Toggle sidebar"></button>
      <Navigation />
    </div>
  );
};

export default Sidebar;
