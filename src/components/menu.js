// Popup.js
import React from 'react';

const dropdown_menu = React.forwardRef(({ isOpen, children }, ref) => {
  return (
    <div className="menu-content-container" ref={ref} style={{ display: isOpen ? 'block' : 'none' }}>
      <div className='menu-content'>
        {children}
      </div>
    </div>
  );
});

export default dropdown_menu;
