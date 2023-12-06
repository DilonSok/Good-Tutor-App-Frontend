import React, { useState } from 'react';
import Tutors from './Tutors';
import FilterDropdownMenu from './FilterDropdownMenu'; // Assuming this is your custom dropdown component
import '../css/SearchPage.css';

function SearchPage() {
  // State to hold the selected filter values
  const [filters, setFilters] = useState({
    rating: [],
    availability: [],
    course: '',
  });

  const [filterUpdated, setFilterUpdated] = useState(false);

  // Options for rating filter dropdown
  const ratingOptions = [
    { value: '1', label: '1 Star' },
    { value: '2', label: '2 Stars' },
    { value: '3', label: '3 Stars' },
    { value: '4', label: '4 Stars' },
    { value: '5', label: '5 Stars' },
  ];

  // Options for availability filter dropdown
  const availabilityOptions = [
    { value: 'Monday', label: 'Monday' },
    { value: 'Tuesday', label: 'Tuesday' },
    { value: 'Wednesday', label: 'Wednesday' },
    { value: 'Thursday', label: 'Thursday' },
    { value: 'Friday', label: 'Friday' },
    { value: 'Saturday', label: 'Saturday' },
    { value: 'Sunday', label: 'Sunday' },
  ];

  // Handler for when a rating is selected or deselected
  const handleRatingSelect = (selectedRatings) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      rating: selectedRatings
    }));
  };

  // Handler for when an availability option is selected or deselected
  const handleAvailabilitySelect = (selectedDays) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      availability: selectedDays
    }));
  };

  // Handler for when the course input changes
  const handleCourseChange = (event) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      course: event.target.value
    }));
  };

 // Handler for when the filter form is submitted
 const handleFilterSubmit = (event) => {
  event.preventDefault();
  // Set the filterUpdated state to trigger the filter update in Tutors component
  setFilterUpdated(!filterUpdated);
};

  return (
    <div className="search-container">
      <div className="filter-container">
        <h2>Filter Tutors</h2>
        <form onSubmit={handleFilterSubmit}>
          <div>
            <h3>Rating:</h3>
            <FilterDropdownMenu options={ratingOptions} handleSelect={handleRatingSelect} />
          </div>
          <div>
            <h3>Availability:</h3>
            <FilterDropdownMenu options={availabilityOptions} handleSelect={handleAvailabilitySelect} />
          </div>
          <div>
            <h3>Course:</h3>
            <input type="text" value={filters.course} onChange={handleCourseChange} placeholder="Enter course name" />
          </div>
          {/**<button type="submit">Filters</button>*/}
        </form>
      </div>
      <Tutors filters={filters} filterUpdated={filterUpdated} />
    </div>
  );
}

export default SearchPage;
