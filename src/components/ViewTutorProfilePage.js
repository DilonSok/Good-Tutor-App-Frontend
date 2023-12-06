import React, { useState , useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import '../css/Reviews.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Popup from './Popup';
import { useNavigate } from 'react-router-dom'; // Add this line to import useNavigate

import { faWindowRestore } from '@fortawesome/free-solid-svg-icons';
//import { Axios } from 'axios';

const axios = require('axios');

function ViewTutorProfilePage() {
  const navigate = useNavigate(); // Initialize useNavigate hook
  const [tutorProfile, setTutorProfile] = useState({
    username: '',
    description: '',
    classes: [],
    availability: [],
    rating: [],
    comments: []
  });

  const [showPopup, setShowPopup] = useState(false);
  const [reviews, setReviews] = useState([]);
  const popUpText = '';
  const [likedReviews, setLikedReviews] = useState([]);
  const [dislikedReviews, setDislikedReviews] = useState([]);

  const location = useLocation();
  const { state } = location;
  const { user, id } = state;

  const handleMessage = () =>{
    const loggedInUserId = localStorage.getItem('userID'); // Retrieve logged-in user's ID
    const tutorId = id; // Replace with actual prop for tutor's ID

    axios.post('http://localhost:3500/messages/start', {
      senderId: loggedInUserId,
      recipientId: tutorId,
      recipientUserName: tutorProfile.username // Correctly pass the recipient's username
    })
      .then(response => {
        navigate('/messages');
      })
      .catch(error => {
        console.error('Error starting conversation:', error);
      });

  };

  useEffect(() => {
    const storedProfile = localStorage.getItem('tutorProfile');
    if (storedProfile) {
      setTutorProfile(JSON.parse(storedProfile));
    }

    const fetchReviews = async () => {
      try {
        const response = await axios.get('http://localhost:3500/users/getone', { params: { username: user.username } });
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
  }, [user.username]); // Dependency array includes user.username

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

   //Thumbs Up Button 
   const toggleLike = (index, review) => {
    console.log(index);
    // If the user hasn't pressed the thumbs up button yet, allow them to press it to like it
    if (!likedReviews.includes(index)) {
      setLikedReviews([...likedReviews, index]);
      setDislikedReviews(dislikedReviews.filter((item) => item !== index));
      // Increment the number of likes
      review.likes = 1;
    } else {
      // If the user has already liked it, and they click on the button again, undo like
      setLikedReviews(likedReviews.filter((item) => item !== index));
      // Decrement the number of likes 
      review.likes = 0;
    }
  };

  //Thumbs Down Button
  const toggleDislike = (index, review) => {
    // If the user hasn't pressed the thumbs down button, allow them to press it to dislike it
    if (!dislikedReviews.includes(index)) {
      setDislikedReviews([...dislikedReviews, index]);
      setLikedReviews(likedReviews.filter((item) => item !== index));
      // Increment the number of dislikes counter 
      review.dislikes = 1;
    } else {
      // If the user has already disliked it, and they click on the button again, undo dislike
      setDislikedReviews(dislikedReviews.filter((item) => item !== index));
      // Decrement the number of dislikes 
      review.dislikes = 0;
    }
  };


  //add a review
  const AddReview = async (review) => {
    

    // Initialize likes and dislikes on a review to 0
    review.likes = 0;
    review.dislikes = 0;

    // Add the submitted review to the array of reviews
    //setReviews([...reviews, review]);
    try {
      const apiUrl = 'http://localhost:3500/users/updaterating';

      //data to be sent to API
      const data = {
        id: id,
        rating: review.rating,
        comments: review.comments,
      };

      axios.patch(apiUrl, data).then(response => {
        console.log('Data added successfully:', response.data);

        axios.get('http://localhost:3500/users/getone', { params: { username: user.username } }).then(response => {
        const arraySize = response.data.rating.length;
        console.log(response.data.rating);
        console.log(response.data.comments);

        const newReviews = [];
        for (let i = 0; i < arraySize; i++){
          const newReview = {
            rating: response.data.rating[i],
            comments: response.data.comments[i]
          };
          newReviews.push(newReview);
          
        }
        setReviews(newReviews);
        console.log(reviews);
        })
        .catch(error => {
          console.log('Error');
        });
      })
      .catch(error => {
        console.log('Error');
      });
    }
    catch(error) {
      console.error('Error uploading review:', error);
    }
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
  let profilePic = `https://robohash.org/${tutorProfile.username}.png?set=set4`;


  return (
    <div className="reviews-container">
      <div className="header-content">
        <img className='profile-pic' src={profilePic} alt="temp" />

        <h1 className="header-title">{tutorProfile.username} </h1>
      </div>
      <div className="line1"></div>
      <div className="tutor-info-title">
        <p> About </p>
        <button className='msg-tutor' onClick={handleMessage}>Message</button>
      </div>
      <div className='line2'></div>
      <div className="profile-info">
        <p>Description: {tutorProfile.description}</p>
        <p>Rating: {overallRating.toFixed(1)}</p>
        <p>Classes: {tutorProfile.classes.join(', ')}</p>
        <p>Availability: {tutorProfile.availability.join(', ')}</p>
      </div>
      <div className='line2'></div>
      <div className="reviews-title">
        <p> Reviews </p>
        <button className='popUpButton' onClick={togglePopup}>Add Review</button>
      </div>
      <div className="line"></div>
      {showPopup && <Popup content={popUpText} onClose={togglePopup} onSubmit={AddReview} />}
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
                  onClick={() => toggleLike(index, review)}
                  className={likedReviews.includes(index) ? 'highlighted' : ''}
                  disabled={dislikedReviews.includes(index)}
                >
                  <i className="far fa-thumbs-up"></i>
                  {review.likes !== undefined ? review.likes : 0}
                </button>
                <button
                  onClick={() => toggleDislike(index, review)}
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


export default ViewTutorProfilePage;