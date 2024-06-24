/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

import Comment from "./Comment.jsx";
import CommentForm from "./CommentForm";

// import { getCommentsData } from "../../data/comment.js";

const CommentContainer = ({ className, logginedUserId ,listingId  }) => {
  const [comments, setComments] = useState([]);
  // const mainComment = comments.filter((comment) => comment.parent === null);
  const [affectedComment, setAffectedComment] = useState(null);

  console.log(comments);

  useEffect(() => {
    (async () => {
      const commentDataRes = await fetch(`/api/comment/allComments/${listingId}`);
      const commentData = await commentDataRes.json();
      console.log(commentData.comments);
      setComments(commentData.comments);
    })();
  }, []);

  const addCommentHandler = async (value) => {
    console.log(logginedUserId,value)
    const newComment = await fetch("/api/comment/addComment", {
      method: "POST",
      headers : {
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify({
        userId : logginedUserId,
        comment : value,
        listingId 
      })
    });
    console.log(newComment);
    (async () => {
      const commentDataRes = await fetch(`/api/comment/allComments/${listingId}`);
      const commentData = await commentDataRes.json();
      console.log(commentData.comments);
      setComments(commentData.comments);
    })();
  };

  const updateCommentHandler = async(value, commentId) => {
    alert('comment updated');
  };

  const deleteCommentHandler = (commentId) => {
    const updateCommments = comments.filter((comment) => {
      return comment._id !== commentId;
    });
    setComments(updateCommments);
  };

  // const getCommentHandler = (commentId) => {
  //   return comments
  //     .filter((comment) => comment.parent === commentId)
  //     .sort((a, b) => {
  //       return (
  //         new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  //       );
  //     });
  // };
  return (
    <div className={`${className}`}>
      <CommentForm
        btnLabel="Send"
        formSubmitHanlder={(value) => addCommentHandler(value)}
      />
      <div className="space-y-4 mt-8">
        {comments?.map((comment) => (
          <Comment
            key={comment._id}
            comment={comment}
            logginedUserId={logginedUserId}
            affectedComment={affectedComment}
            setAffectedComment={setAffectedComment}
            // addComment={addCommentHandler}
            updateComment={updateCommentHandler}
            deleteComment={deleteCommentHandler}
            // replies={getCommentHandler(comment._id)}
          />
        ))}
      </div>
    </div>
  );
};

export default CommentContainer;
