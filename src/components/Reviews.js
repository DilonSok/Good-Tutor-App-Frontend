import React, { useState , useEffect } from 'react';
import '../css/Reviews.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Popup from './Popup';

function Reviews() {
  

  const [tutorProfile, setTutorProfile] = useState({
    username: '',
    description: '',
    classes: [],
    availability: []
  });

  useEffect(() => {
    const storedProfile = localStorage.getItem('tutorProfile');
    if (storedProfile) {
      setTutorProfile(JSON.parse(storedProfile));
    }
  }, []);


  //variables to make/add a review
  const [showPopup, setShowPopup] = useState(false);
  const [reviews, setReviews] = useState([]); // Array to store submitted reviews
  const popUpText = '';

  //track whether a user has liked or disliked a review
  const [likedReviews, setLikedReviews] = useState([]);
  const [dislikedReviews, setDislikedReviews] = useState([]);

  //Show the pop up when requested
  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  //add a review
  const addReview = (review) => {
    // Initialize likes and dislikes on a review to 0
    review.likes = 0;
    review.dislikes = 0;

    // Add the submitted review to the array of reviews
    setReviews([...reviews, review]);
  };

  //Thumbs Up Button 
  const toggleLike = (index) => {
    // If the user hasn't pressed the thumbs up button yet, allow them to press it to like it
    if (!likedReviews.includes(index)) {
      setLikedReviews([...likedReviews, index]);
      setDislikedReviews(dislikedReviews.filter((item) => item !== index));
      // Increment the number of likes
      const updatedReviews = [...reviews];
      updatedReviews[index].likes += 1;
      setReviews(updatedReviews);
    } else {
      // If the user has already liked it, and they click on the button again, undo like
      setLikedReviews(likedReviews.filter((item) => item !== index));
      // Decrement the number of likes 
      const updatedReviews = [...reviews];
      updatedReviews[index].likes -= 1;
      setReviews(updatedReviews);
    }
  };

  //Thumbs Down Button
  const toggleDislike = (index) => {
    // If the user hasn't pressed the thumbs down button, allow them to press it to dislike it
    if (!dislikedReviews.includes(index)) {
      setDislikedReviews([...dislikedReviews, index]);
      setLikedReviews(likedReviews.filter((item) => item !== index));
      // Increment the number of dislikes counter 
      const updatedReviews = [...reviews];
      updatedReviews[index].dislikes += 1;
      setReviews(updatedReviews);
    } else {
      // If the user has already disliked it, and they click on the button again, undo dislike
      setDislikedReviews(dislikedReviews.filter((item) => item !== index));
      // Decrement the number of dislikes 
      const updatedReviews = [...reviews];
      updatedReviews[index].dislikes -= 1;
      setReviews(updatedReviews);
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
        <img className='profile-picture' src={profilePic} alt="temp" />

        <h1 className="header-title">{tutorProfile.username} </h1>
      </div>
      <div className="line1"></div>
      <div className="tutor-info-title">
        <p> About </p>
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
      {showPopup && <Popup content={popUpText} onClose={togglePopup} onSubmit={addReview} />}
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
              <p>{review.review}</p>
              <div className="like-dislike">
                <button
                  onClick={() => toggleLike(index)}
                  className={likedReviews.includes(index) ? 'highlighted' : ''}
                  disabled={dislikedReviews.includes(index)}
                >
                  <i className="far fa-thumbs-up"></i>
                  {review.likes}
                </button>
                <button
                  onClick={() => toggleDislike(index)}
                  className={dislikedReviews.includes(index) ? 'highlighted' : ''}
                  disabled={likedReviews.includes(index)}
                >
                  <i className="far fa-thumbs-down"></i>
                  {review.dislikes}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


export default Reviews;