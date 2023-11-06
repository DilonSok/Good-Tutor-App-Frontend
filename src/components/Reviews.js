import React, {useState} from 'react';
import './css/Reviews.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Popup from './Popup';

function Reviews() {

  //variables
  const [showPopup, setShowPopup] = useState(false);
  const [reviews, setReviews] = useState([]); // Array to store submitted reviews

  //track whether a user has liked or disliked a review
  const [likedReviews, setLikedReviews] = useState([]);
  const [dislikedReviews, setDislikedReviews] = useState([]);

  const popUpText = '';

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const addReview = (review) => {
    // Initialize likes and dislikes to 0
    review.likes = 0;
    review.dislikes = 0;
        
    // Add the submitted review to the array
    setReviews([...reviews, review]);
  };

  const toggleLike = (index) => {
    if (!likedReviews.includes(index)) {
      // If the user hasn't liked it, toggle like
      setLikedReviews([...likedReviews, index]);
      setDislikedReviews(dislikedReviews.filter((item) => item !== index));

      // Increment likes
      const updatedReviews = [...reviews];
      updatedReviews[index].likes += 1;
      setReviews(updatedReviews);
    } else {
      // If the user has already liked it, undo like
      setLikedReviews(likedReviews.filter((item) => item !== index));

      // Decrement the likes 
      const updatedReviews = [...reviews];
      updatedReviews[index].likes -= 1;
      setReviews(updatedReviews);
    }
  };

  const toggleDislike = (index) => {
    if (!dislikedReviews.includes(index)) {
      // If the user hasn't disliked it
      setDislikedReviews([...dislikedReviews, index]);
      setLikedReviews(likedReviews.filter((item) => item !== index));

      // Increment the dislikes counter 
      const updatedReviews = [...reviews];
      updatedReviews[index].dislikes += 1;
      setReviews(updatedReviews);
    } else {
      // If the user has already disliked it, undo dislike
      setDislikedReviews(dislikedReviews.filter((item) => item !== index));

      // Decrement the dislikes counter 
      const updatedReviews = [...reviews];
      updatedReviews[index].dislikes -= 1;
      setReviews(updatedReviews);
    }
  };


  return (
      <div className="reviews-container">
        <div className="header-content">
          <i className="fa-solid fa-circle-user fa-8x"></i>
          <h1 className="header-title"> Tutor Name </h1>
        </div>
        <div className="line1"></div>
          <div className= "reviews-title">
            <p> Reviews </p>
            <button className='popUpButton' onClick={togglePopup}>Add Review</button>
          </div>
          <div className="line"></div>
          {showPopup && <Popup content={popUpText} onClose={togglePopup} onSubmit={addReview}  />}
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
              <i className="fa-solid fa-flag"/>
             </div>
            </div>
            <div className = "review-text">
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