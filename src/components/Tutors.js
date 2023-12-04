import React, { Component } from 'react';
import TutorCard from './TutorCard';
import Axios from "axios";

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
                this.setState({ 
                    listofTutors: response.data,
                    filteredTutors: response.data // Initialize with all data
                });
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }

    componentDidUpdate(prevProps) {
        if (this.props.filters !== prevProps.filters) {
            this.applyFilters();
        }
    }

    applyFilters() {
        const { rating, availability, course } = this.props.filters;
        let filtered = this.state.listofTutors.filter(tutor => {
          const matchesRating = !rating.length || rating.includes(String(tutor.rating));
          const matchesAvailability = !availability.length || availability.some(day => tutor.availability && tutor.availability.includes(day));
          const matchesCourse = !course || (tutor.classes && tutor.classes.includes(course));
          const roleCheck = localStorage.getItem("user").role == 1;
      
          return matchesRating && matchesAvailability && matchesCourse && roleCheck;
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
                      firstName={tutor.firstName} // Assuming tutor has these properties
                      lastName={tutor.lastName}
                      classes={tutor.classes}
                      username={tutor.username}
                      rating={tutor.rating}
                      description={tutor.description} 
                    />                 
                    ))}
            </div>
        );
    }
}

export default Tutors;
