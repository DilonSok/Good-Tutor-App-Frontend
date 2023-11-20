import React, { useState } from 'react';
import Tutors from './Tutors';
import TutorForm from './TutorForm';
import '../css/SearchPage.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

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
    { value: '1', label: '1 Star' },
    { value: '2', label: '2 Stars' },
    { value: '3', label: '3 Stars' },
    { value: '4', label: '4 Stars' },
    { value: '5', label: '5 Stars' },
  ];

  const availabilityOptions = [
    { value: 'MONDAY', label: 'MONDAY' },
    { value: 'TUESDAY', label: 'TUESDAY' },
    { value: 'WEDNESDAY', label: 'WEDNESDAY' },
    { value: 'THURSDAY', label: 'THURSDAY' },
    { value: 'FRIDAY', label: 'FRIDAY' },
    { value: 'SATURDAY', label: 'SATURDAY' },
    { value: 'SUNDAY', label: 'SUNDAY' },
  ];

  const [selectedRating, setSelectedRating] = useState([]);
  const [selectedAvailability, setSelectedAvailability] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleRatingSelect = (selectedOptions) => {
    setSelectedRating(selectedOptions);
  };

  const handleAvailabilitySelect = (selectedOptions) => {
    setSelectedAvailability(selectedOptions);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const [filters, setFilters] = useState({});

  const handleFilterChange = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    setFilters({
      rating: selectedRating,
      availability: selectedAvailability,
      course: inputValue
    });
  };

  return (
    <div className="search-container">
      <div className="filter-container">
        <h2>Filter Options:</h2>
        <form className="filters" onSubmit={handleFilterChange}>
            <div className="rating-filter">
                <h3>Rating</h3>
                <DropdownMenu options={ratingOptions} handleSelect={handleRatingSelect} />
            </div>
            <div className="availability-filter">
                <h3>Availability</h3>
                <DropdownMenu options={availabilityOptions} handleSelect={handleAvailabilitySelect} />
            </div>
            <div className="courses-filter">
                <h3>Courses</h3>
                <input
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  placeholder="Enter Course..."
                />
            </div>
            <button className="filter-button" type='submit'>Filter</button>
        </form>
      </div>
      <div className='space'>
        
      </div>
      <Tutors filters={filters} />
      <TutorForm />
    </div>
  );
}

export default SearchPage;
