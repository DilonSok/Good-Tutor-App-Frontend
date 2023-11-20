import React, { Component } from 'react';
import Axios from 'axios'; // Note: Axios is imported directly, not destructured
import { useNavigate } from 'react-router-dom'; // Add this line to import useNavigate
import '../css/TutorCard.css';

class TutorCard extends Component {
  constructor(props) {
    super(props);

    this.url = `https://robohash.org/${this.props.username}.png?set=set4`;
    this.handleMessage = this.handleMessage.bind(this);
  }

  handleMessage() {
    const loggedInUserId = localStorage.getItem('userID'); // Retrieve logged-in user's ID
    const tutorId = this.props.id; // Replace with actual prop for tutor's ID

    Axios.post('http://localhost:3500/messages/start', {
      senderId: loggedInUserId,
      recipientId: tutorId,
      recipientUserName: this.props.username // Correctly pass the recipient's username
    })
      .then(response => {
        this.props.navigate('/messages');
      })
      .catch(error => {
        console.error('Error starting conversation:', error);
      });

  }

  render() {
    return (
      <div className="container">
        <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet" />
        <div className="content">
          <div className="card">
            <div className="firstinfo">
              <img src={this.url} alt="temp" />
              <div className="profileinfo">
                <h1>{this.props.username}</h1>
                <h3>Classes: {this.props.classes.join(', ')}</h3>
                <h3>Rating: {this.props.rating}/5 Stars</h3>
                <p>{this.props.description}</p>
                <h3><button onClick={this.viewProfile}>View Profile</button></h3> {/* Changed to button */}
                <button className='button' onClick={this.handleMessage}>Message</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default (props) => {
  const navigate = useNavigate();
  return <TutorCard {...props} navigate={navigate} />;
};
