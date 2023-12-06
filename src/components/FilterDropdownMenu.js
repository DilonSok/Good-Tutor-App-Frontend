import React, { useState } from 'react';

const FilterDropdownMenu = ({ options, handleSelect }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleToggle = (value) => {
    const isSelected = selectedOptions.includes(value);
    let updatedSelection = [];

    if (isSelected) {
      updatedSelection = selectedOptions.filter((option) => option !== value);
    } else {
      updatedSelection = [...selectedOptions, value];
    }

    setSelectedOptions(updatedSelection);
    handleSelect(updatedSelection);
  };

  const handleDropdownClick = () => {
    setShowOptions(!showOptions);
  };

  const handleItemClick = (value) => {
    handleToggle(value);
  };

  const handleBlur = () => {
    setShowOptions(false);
  };

  return (
    <div className="dropdown" onBlur={handleBlur}>
      <div className="dropdown-header" onClick={handleDropdownClick}>
        <i className="fas fa-bars" style={{ color: showOptions ? 'blue' : 'black' }}></i>
      </div>
      {showOptions && (
        <div className="dropdown-options">
          {options.map((option, index) => (
            <div
              key={index}
              onClick={() => handleItemClick(option.value)}
              className={selectedOptions.includes(option.value) ? 'selected' : ''}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
      {selectedOptions.length > 0 && <p>Selected option(s): {selectedOptions.join(', ')}</p>}
    </div>
  );
};

export default FilterDropdownMenu;