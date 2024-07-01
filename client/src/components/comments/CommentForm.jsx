/* eslint-disable react/prop-types */
import React, { useState } from "react";

const CommentForm = ({
  btnLabel,
  formSubmitHanlder,
  formCancelHandler = null,
  initialText = "",
  loading = false,
}) => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  const handleRatingChange = (event) => {
    const newRating = Number(event.target.dataset.value);
    setRating(newRating);
    console.log(`Star clicked: ${newRating}`);
  };

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  const handleSubmit = () => {
    if (rating === 0 || feedback.trim() === "") {
      alert("Please provide both a star rating and feedback.");
      return;
    }
    console.log(`Rating: ${rating}`);
    console.log(`Feedback: ${feedback}`);
  };
  // const [value, setValue] = useState(initialText);

  const submitHandler = async(e) => {
    e.preventDefault();
    await formSubmitHanlder(feedback,rating);
    setFeedback("");
    setRating(0)
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="wrapper p-6 flex flex-col items-center gap-3 rounded-lg bg-white  z-1">
        <div className="title text-2xl font-semibold">Rate your experience</div>
        <div className="content text-center text-gray-600 leading-relaxed">
          We highly value your feedback! Kindly take a moment to rate your
          experience and provide us with your valuable feedback.
        </div>
        <div className="rate-box flex flex-row-reverse gap-2">
          {[...Array(5)].map((_, i) => (
            <label
              key={i}
              data-value={5 - i}
              onClick={handleRatingChange}
              className={`star cursor-pointer text-3xl ${
                rating >= 5 - i ? "text-slate-500" : "text-gray-300"
              }`}
            >
              ★
            </label>
          ))}
        </div>

        <textarea
          cols="30"
          rows="6"
          placeholder="Leave your comment here..."
          value={feedback}
          onChange={handleFeedbackChange}
          className="border-none resize-none w-full p-2 text-base leading-relaxed rounded-lg shadow-inner bg-white bg-opacity-30 focus:outline-none focus:ring-2 focus:ring-slate-400"
        />

        <button
          onClick={handleSubmit}
          disabled={rating === 0 || feedback.trim() === ""}
          className={`px-6 py-2.5 rounded-lg font-semibold mt-2 bg-slate-700 text-white disabled:opacity-70 disabled:cursor-not-allowed ${
            rating === 0 || feedback.trim() === ""
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-slate-500 hover:bg-slate-500 transition-all duration-200 active:transform active:translate-y-1"
          }`}
        >
          Send
        </button>
      </div>

      {/* <div className="flex flex-col items-end border border-slate-700 rounded-lg p-4">
        <textarea
          className="w-full focus:outline-none bg-transparent"
          rows="5"
          placeholder="Leave your comment here..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        ></textarea>
        <div className="flex flex-col-reverse gap-y-2 items-center gap-x-2 pt-2 min-[420px]:flex-row">
          {formCancelHandler && (
            <button
              onClick={formCancelHandler}
              className="px-6 py-2.5 rounded-lg border font-semibold mt-2 bg-red-700 text-white"
            >
              Cancel
            </button>
          )}
          <button
            disabled={loading}
            type="submit"
            className="px-6 py-2.5 rounded-lg font-semibold mt-2 bg-slate-700 text-white disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {btnLabel}
          </button>
        </div>
      </div> */}
    </form>
  );
};

export default CommentForm;
