import React from 'react';
//Dilon Sok
//Frontend for dropdown menu component for navbar

//create a reference for dropdown menu component for navbar to pass
//whether element is open and the elements (children) to display
const dropdown_menu = React.forwardRef(({ isOpen, children }, ref) => {
  return (
    //menu will display based on isOpen which is determined by navbar on toggle clicks
    //otherwise it will not be displayed "none"
    <div className="menu-content-container" ref={ref} style={{ display: isOpen ? 'block' : 'none' }}>
      <div className='menu-content'>
        {children}
      </div>
    </div>
  );
});

export default dropdown_menu;
