import React, { Component } from 'react';
import Axios from 'axios';

class TutorForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      description: '',
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const apiUrl = 'http://localhost:3500/users';

      // Data to be sent to the API
      const data = {
        username: this.state.username,
        password: this.state.password,
        description: this.state.description,
      };

      // Sending a POST request to the API
      const response = await Axios.post(apiUrl, data);

      // Handle the response as needed
      console.log('API response:', response);

      //reset the form fields
      this.setState({
        username: '',
        password: '',
        description: '',
      });
    } catch (error) {
      // Handle errors
      console.error('Error submitting form:', error);
    }
  };

  render() {
    return (
        <div className="tutor-form-container">
        <p className="form-heading">Interested in tutoring? Add your information below</p>
        <form onSubmit={this.handleSubmit} className="form">
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="text"
              id="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <input
              type="text"
              id="description" // Add id attribute for styling
              name="description"
              value={this.state.description}
              onChange={this.handleChange}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default TutorForm;
