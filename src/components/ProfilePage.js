import React, { useState , useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import '../css/Reviews.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Popup from './Popup';
//import { Axios } from 'axios';

const axios = require('axios');

function ProfilePage() {
  const [userProfile, setTutorProfile] = useState({
    username: '',
    description: '',
    classes: [],
    availability: [],
    rating: [],
    comments: []
  });

  const [showPopup, setShowPopup] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [likedReviews, setLikedReviews] = useState([]);
  const [dislikedReviews, setDislikedReviews] = useState([]);

  // Retrieve username from local storage
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const username = storedUser ? storedUser.username : null;
  console.log(username)

  useEffect(() => {
    // Ensure username is available
    if (!username) {
      console.error("Username is not available in local storage");
      return;
    }

    const storedProfile = localStorage.getItem('tutorProfile');
    if (storedProfile) {
      setTutorProfile(JSON.parse(storedProfile));
    }

    const fetchReviews = async () => {
      try {
        const response = await axios.get('http://localhost:3500/users/getone', { params: { username: username } });
        const arraySize = response.data.rating.length;
        const newReviews = [];
        for (let i = 0; i < arraySize; i++) {
          newReviews.push({
            rating: response.data.rating[i],
            comments: response.data.comments[i]
          });
        }
        setReviews(newReviews);
      } catch (error) {
        console.log('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, [username]);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

 

 
  //Calculate the rating of the tutor (average of all ratings)
  function calculateOverallRating(reviews) {
    if (reviews.length === 0) {
      return 0; // Default to 0 if there are no reviews to avoid division by zero
    }

    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const overallRating = totalRating / reviews.length;
    return overallRating;
  };

  const overallRating = calculateOverallRating(reviews);
  let profilePic = `https://robohash.org/${storedUser.username}.png?set=set4`;


  return (
    <div className="reviews-container">
      <div className="header-content">
        <img className='profile-pic' src={profilePic} alt="temp" />

        <h1 className="header-title">{storedUser.username} </h1>
      </div>
      <div className="line1"></div>
      <div className="tutor-info-title">
        <p> About </p>
      </div>
      <div className='line2'></div>
      <div className="profile-info">
        <p>Description: {storedUser.description}</p>
        <p>Rating: {overallRating.toFixed(1)}</p>
        <p>Classes: {storedUser.classes.join(', ')}</p>
        <p>Availability: {storedUser.availability.join(', ')}</p>
      </div>
      <div className='line2'></div>
      <div className="reviews-title">
        <p> Reviews </p>
      </div>
      <div className="line"></div>
      <div className="reviews-list">
        {reviews.map((review, index) => (
          <div key={index} className="review">
            <div className="star-rating">
              {[...Array(review.rating)].map((_, i) => (
                <div className="stars">
                  <i className="fa-regular fa-star"></i>
                </div>
              ))}
              <div className="flag-icon">
                <i className="fa-solid fa-flag" />
              </div>
            </div>
            <div className="review-text">
              <p>{review.comments}</p>
              <div className="like-dislike">
                <button
                  className={likedReviews.includes(index) ? 'highlighted' : ''}
                  disabled={dislikedReviews.includes(index)}
                >
                  <i className="far fa-thumbs-up"></i>
                  {review.likes !== undefined ? review.likes : 0}
                </button>
                <button
                  className={dislikedReviews.includes(index) ? 'highlighted' : ''}
                  disabled={likedReviews.includes(index)}
                >
                  <i className="far fa-thumbs-down"></i>
                  {review.dislikes !== undefined ? review.dislikes : 0}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


export default ProfilePage;