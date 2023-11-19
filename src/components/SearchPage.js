import React, { useState } from 'react';
import '../css/SearchPage.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Tutors from './Tutors';
import TutorForm from './TutorForm';

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
        <div className="dropdown-options">
          {options.map((option, index) => (
            <div
              key={index}
              onClick={() => handleToggle(option.value)}
              className={selectedOptions.includes(option.value) ? 'selected' : ''}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
      {selectedOptions.length > 0 && (
        <p>Selected option(s): {selectedOptions.join(', ')}</p>
      )}
    </div>
    );
  };

function SearchPage() {
  const ratingOptions = [
    { value: '1 Stars', label: '1 Stars' },
    { value: '2 Stars', label: '2 Stars' },
    { value: '3 Stars', label: '3 Stars' },
    { value: '4 Stars', label: '4 Stars' },
    { value: '5 Stars', label: '5 Stars' },
  ];

  const availabilityOptions = [
    { value: 'Monday', label: 'Monday'},{value: 'Tuesday', label: 'Tuesday' },
    { value: 'Wednesday', label: 'Wednesday' },{ value: 'Thursday', label: 'Thursday' },
    { value: 'Friday', label: 'Friday' },{ value: 'Saturday', label: 'Saturday' },
    { value: 'Sunday', label: 'Sunday' },
    
  ];

  const [inputValue, setInputValue] = useState('');
  const [stringArray, setStringArray] = useState([]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && inputValue.trim() !== '') {
      setStringArray([...stringArray, inputValue.trim()]);
      setInputValue('');
    }
  };

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
                <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder="Press Enter to add"
      />
      <ul>
        {stringArray.map((str, index) => (
          <li key={index}>{str}</li>
        ))}
      </ul>
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
      <div>
        <Tutors/>
      </div>
      <div>
        <TutorForm/>
      </div>
    </div>
    
  );
}

export default SearchPage;