import React, { useState } from 'react';
import CommentForm from '../comments/CommentForm';

const FeedbackForm = () => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  const handleRatingChange = (event) => {
    const newRating = Number(event.target.dataset.value);
    setRating(newRating);
    console.log(`Star clicked: ${newRating}`);
  };

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  const handleSubmit = () => {
    if (rating === 0 || feedback.trim() === '') {
      alert('Please provide both a star rating and feedback.');
      return;
    }
    console.log(`Rating: ${rating}`);
    console.log(`Feedback: ${feedback}`);
  };

  return (
    <div className="wrapper p-6 flex flex-col items-center gap-3 rounded-lg shadow-lg bg-white bg-opacity-50 z-1">
      <div className="title font-bold text-lg">Rate your experience</div>
      <div className="content text-center text-gray-600 leading-relaxed">
        We highly value your feedback! Kindly take a moment to rate your experience and provide us with your valuable feedback.
      </div>
      <div className="rate-box flex flex-row-reverse gap-2">
        {[...Array(5)].map((_, i) => (
          <label
            key={i}
            data-value={5 - i}
            onClick={handleRatingChange}
            className={`star cursor-pointer text-3xl ${
              rating >= 5 - i ? 'text-yellow-400' : 'text-gray-300'
            }`}
          >
            ★
          </label>
        ))}
      </div>
      
      <textarea
        cols="30"
        rows="6"
        placeholder="Tell us about your experience!"
        value={feedback}
        onChange={handleFeedbackChange}
        className="border-none resize-none w-full p-2 text-base leading-relaxed rounded-lg shadow-inner bg-white bg-opacity-30 focus:outline-none focus:ring-2 focus:ring-yellow-400"
      />

      <button
        onClick={handleSubmit}
        disabled={rating === 0 || feedback.trim() === ''}
        className={`submit-btn py-2 px-5 shadow-lg rounded-full cursor-pointer ${
          rating === 0 || feedback.trim() === ''
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-yellow-400 hover:bg-yellow-500 transition-all duration-200 active:transform active:translate-y-1'
        }`}
      >
        Send
      </button>
    </div>
  );
};

export default FeedbackForm;
