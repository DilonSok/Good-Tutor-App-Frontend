import React, { Component } from 'react'
import TutorCard from './TutorCard'
import Axios from "axios"
import "../css/Tutors.css"
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
        this.setState({ listofTutors: response.data })
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
              firstName = "Rushi" //change with data
              lastName = "Kona" //change with data
              classes = {["CS 1111", "CS 1112", "CS 1113",]} //change with data
              username={tutor.username}
              rating={tutor.rating}
              description={tutor.description}
            />
          </div>
        ))}
      </div>
    )
  }
}

export default Tutors
