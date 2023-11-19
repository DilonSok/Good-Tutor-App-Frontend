import React, { useState } from 'react';
import Axios from 'axios';
import '../css/SearchPage.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Tutors from './Tutors.js';
import TutorForm from './TutorForm';

const DropdownMenu = ({ options, handleSelect }) => {
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
      {selectedOptions.length > 0 && <p>Selected option(s): {selectedOptions.join(', ')}</p>}
    </div>
  );
};

function SearchPage() {
  const ratingOptions = [
    { value: '1', label: '1 Stars' },
    { value: '2', label: '2 Stars' },
    { value: '3', label: '3 Stars' },
    { value: '4', label: '4 Stars' },
    { value: '5', label: '5 Stars' },
  ];

  const availabilityOptions = [
    { value: 'Monday', label: 'Monday' },
    { value: 'Tuesday', label: 'Tuesday' },
    { value: 'Wednesday', label: 'Wednesday' },
    { value: 'Thursday', label: 'Thursday' },
    { value: 'Friday', label: 'Friday' },
    { value: 'Saturday', label: 'Saturday' },
    { value: 'Sunday', label: 'Sunday' },
  ];

  const [selectedRating, setSelectedRating] = useState(null);
  const [selectedAvailability, setSelectedAvailability] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleRatingSelect = (value) => {
    setSelectedRating(value);
  };

  const handleAvailabilitySelect = (selectedOptions) => {
    setSelectedAvailability(selectedOptions);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  // This part sends the selected options to the Tutors component
  const handleFilterChange = () => {
    // Send the selected options (rating, availability, inputValue) to your Tutors component
    // You might use Axios here to send a request to your API with the selected options
    // For example:
    Axios.get('http://localhost:3500/users', {
      params: {
        rating: selectedRating,
        availability: selectedAvailability,
        course: inputValue,
      },
    })
      .then((response) => {
        // Handle the response or update state as needed
      })
      .catch((error) => {
        console.error('Error fetching filtered data:', error);
      });
  };

  return (
    <div className="search-container">
      <div className="filter-container">
        <div className="filter-header">
          <h2>Filter Options:</h2>
        </div>
        <form className="filters" onClick={handleFilterChange}> {/*All filters here will be saved to be used by Submit button for creating account */}
            <div className="rating-filter">
                <h2>Rating</h2>
                <DropdownMenu options={ratingOptions} handleSelect={handleRatingSelect} />
            </div>
            <div className="availability-filter">
                <h2>Availability</h2>
                <DropdownMenu options={availabilityOptions} handleSelect={handleAvailabilitySelect} />
            </div>
            <div className="courses-filter">
                <div className="courses-header">
                    <h2>Courses</h2>
                </div>
                <div className="class-input">
                    <input
                     type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Enter Course..."
                    />
                <button className="filter-button" type='submit' >Filter</button>
                </div>
            </div>
        </form>
    </div>
    <div>
        <Tutors />
    </div>
    <div>
      <TutorForm/>
    </div>
    </div>
        
  );
}

export default SearchPage;