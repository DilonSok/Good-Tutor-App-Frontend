import React, { Component } from 'react'
import TutorCard from './TutorCard'
import Axios from "axios"

class Tutors extends Component {
  constructor(props) {
    super(props)
    this.state = {
      listofTutors: []
    }
  }

  componentDidMount() {
    Axios.get("http://localhost:3500/users")
      .then((response) => {
        console.log(response); // Logging the response as in TestTutors.js
        this.setState({ listofTutors: response.data })
        // You might want to add the refreshPage functionality here, if needed.
      })
      .catch((error) => {
        console.error("Error fetching data:", error)
      })
  }

  render() {
    const { listofTutors } = this.state
    return (
      <div className='Tutor display'>
        {listofTutors.map((tutor) => (
          <div key={tutor.id}>
            <TutorCard
              id = {tutor._id}
              username={tutor.username}
              rating={tutor.rating}
              description={tutor.description}
              // Assuming the tutor object has firstName, lastName, and classes properties
              firstName = {tutor.firstName} 
              lastName = {tutor.lastName}
              classes = {tutor.classes} 
            />
          </div>
        ))}
      </div>
    )
  }
}

export default Tutors
