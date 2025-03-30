import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import style from './Sidebar.module.css';

export default function SidebarWrapper({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile menu toggle button */}
      <button 
        className={style.menuToggle} 
        onClick={toggleSidebar}
        aria-label="Toggle menu"
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Overlay that appears when sidebar is open */}
      {isOpen && (
        <div className={style.drower} onClick={closeSidebar}></div>
      )}

      {/* Sidebar with conditional open class */}
      <section>
        <div className={`${style.sidebar} ${isOpen ? style.open : ''}`}>
          {children}
        </div>
      </section>
    </>
  );
}
