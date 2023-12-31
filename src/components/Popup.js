import {React, useState} from 'react';
import '../css/Popup.css';


const Popup = ({ content, onClose, onSubmit }) => {
  const [rating, setRating] = useState(0); // State for the rating (1-5 stars)
  const [comments, setComments] = useState(''); // State for the review text
  
  const handleRatingChange = (event) => {
    setRating(parseInt(event.target.value));
  };
  
  const handleReviewChange = (event) => {
    setComments(event.target.value);
  };
  
  const handleSubmit = () => {
    // Validate and submit the rating and review
    if (rating >= 1 && rating <= 5 && comments.trim() !== '') {
      onSubmit({ rating, comments });
      onClose(); // Close the popup
    }
  };
  return (
  <div className="popup">
    <div className="popup-content">
      <span className="close-button" onClick={onClose}>
        &times;
      </span>
      <div className="input-container">
          <p>Enter Rating: 
            <input
              type="number"
              min="1"
              max="5"
              value={rating}
              onChange={handleRatingChange}
            />
          </p>
          <p>Enter Review:
            <textarea
              value={comments}
              onChange={handleReviewChange}
            />
          </p>
        </div>
        <button className="submit-button" onClick={handleSubmit}>Submit</button>
      </div>
    </div>
);
}

export default Popup;