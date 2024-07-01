import React, { useState } from 'react';
import Sentiment from 'sentiment';

const sentiment = new Sentiment();

const CommentSection = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [analysis, setAnalysis] = useState(null);

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      const result = sentiment.analyze(newComment);
      setAnalysis(result);
      setComments([...comments, { text: newComment, sentiment: result }]);
      setNewComment('');
    }
  };

  return (
    <div>
      <h2>Comment Section</h2>
      <form onSubmit={handleCommentSubmit}>
        <textarea
          value={newComment}
          onChange={handleCommentChange}
          placeholder="Write a comment..."
        />
        <button type="submit">Post Comment</button>
      </form>
      <div>
        {comments.map((comment, index) => (
          <div key={index}>
            <p>{comment.text}</p>
            <p>Sentiment Score: {comment.sentiment.score}</p>
            <p>
              Sentiment: {comment.sentiment.score > 0 ? 'Positive' : comment.sentiment.score < 0 ? 'Negative' : 'Neutral'}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
