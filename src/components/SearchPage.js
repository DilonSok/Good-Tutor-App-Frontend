import React, { useState } from 'react';
import '../css/SearchPage.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const DropdownMenu = ({ options }) => {
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
    };
  
    const handleDropdownClick = () => {
      setShowOptions(!showOptions);
    };
  
    return (
      <div className="dropdown">
        <div className="dropdown-header" onClick={handleDropdownClick}>
        <i className="fas fa-bars" style={{ color: showOptions ? 'blue' : 'black' }}></i>
        </div>
        {showOptions && (
          <ul className="dropdown-options">
            {options.map((option, index) => (
              <li
                key={index}
                onClick={() => handleToggle(option.value)}
                className={selectedOptions.includes(option.value) ? 'selected' : ''}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
        {selectedOptions.length > 0 && (
          <p>Selected option(s): {selectedOptions.join(', ')}</p>
        )}
      </div>
    );
  };

function SearchPage() {
  const ratingOptions = [
    { value: 'option1', label: '1 Star' },
    { value: 'option2', label: '2 Star' },
    { value: 'option3', label: '3 Star' },
    { value: 'option4', label: '4 Star' },
    { value: 'option5', label: '5 Star' },
  ];

  const availabilityOptions = [
    { value: 'option6', label: 'Monday'},{value: 'option7', label: 'Tuesday' },
    { value: 'option8', label: 'Wednesday' },{ value: 'option9', label: 'Thursday' },
    { value: 'option10', label: 'Friday' },{ value: 'option11', label: 'Saturday' },
    { value: 'option12', label: 'Sunday' },
    
  ];

  return (
    <div className="search-container">

        <div className='filter-container'>
            <div className='filter-header'>
                <h2>Filter Options:</h2>
            </div>
            <div className='rating-filter'>
                <h2>Rating</h2>
                <DropdownMenu options={ratingOptions} />
            </div>
            <div className='availibilty-filter'>
                <h2>Availibilty</h2>
                <DropdownMenu options={availabilityOptions} />
            </div>
            <div className='courses-filter'>
                <h2>Courses</h2>
            </div>
        </div>

        <div className="profile-icon">
        <i className="fa-solid fa-circle-user fa-8x"></i>
        </div>
        <h1> Tutor Name </h1>
        <h1> Schedule/Booking </h1>
      <div className="message-button-container">
        <i className="fa-solid fa-comments fa-2x"></i>
          <h3>
            Message
          </h3>
      </div>
    </div>
  );
}

export default SearchPage;