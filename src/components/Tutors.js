import React, { Component } from 'react';
import TutorCard from './TutorCard';
import Axios from 'axios';

class Tutors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listofTutors: [],
      filteredTutors: []
    };
  }

  componentDidMount() {
    Axios.get("http://localhost:3500/users")
      .then((response) => {
        // Filter out non-tutors and current user's data
        const tutors = response.data.filter(user => 
          user.role === 1 && user._id !== JSON.parse(localStorage.getItem('user'))._id
        );
        this.setState({
          listofTutors: tutors,
          filteredTutors: tutors // Initialize with all tutor data
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  componentDidUpdate(prevProps) {
    if (this.props.filters !== prevProps.filters || this.props.filterUpdated !== prevProps.filterUpdated) {
      this.applyFilters();
    }
  }

  applyFilters() {
    const { rating, availability, course } = this.props.filters;
    let filtered = this.state.listofTutors.filter(tutor => {
      const matchesRating = !rating.length || rating.includes(String(tutor.rating));
      const matchesAvailability = !availability.length || availability.some(day => tutor.availability && tutor.availability.includes(day));
      const matchesCourse = !course || (tutor.classes && tutor.classes.includes(course));

      return matchesRating && matchesAvailability && matchesCourse; // Filters based on the selected criteria
    });
    this.setState({ filteredTutors: filtered });
  }
  render() {
    const { filteredTutors } = this.state;
    return (
      <div className='Tutor display'>
        {filteredTutors.map((tutor) => (
          <TutorCard
            key={tutor._id}
            id={tutor._id}
            classes={tutor.classes}
            username={tutor.username}
            rating={tutor.rating}
            description={tutor.description}
            availability={tutor.availability}
          />
        ))}
      </div>
    );
  }
}

export default Tutors;