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

  const addCommentHandler = async (value,rating) => {
    if(value==="") return
    console.log(rating)
    console.log(logginedUserId,value)
    const newComment = await fetch("/api/comment/addComment", {
      method: "POST",
      headers : {
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify({
        userId : logginedUserId,
        comment : value,
        listingId ,
        rating
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
    if(value==="") return
    const res = await fetch(`/api/comment/updateComment/${commentId}`,{
      method : "PATCH",
      headers : {
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify({
        comment : value, 
      })
    });
    console.log(res);
    setAffectedComment(null);
    (async () => {
      const commentDataRes = await fetch(`/api/comment/allComments/${listingId}`);
      const commentData = await commentDataRes.json();
      console.log(commentData.comments);
      setComments(commentData.comments);
    })();
    
  };

  const deleteCommentHandler = async(commentId) => {
    const res = await fetch(`/api/comment/deleteComment/${commentId}`,{
      method : "DELETE"
    })
    console.log(res);
    // const updateCommments = comments.filter((comment) => {
    //   return comment._id !== commentId;
    // });
    (async () => {
      const commentDataRes = await fetch(`/api/comment/allComments/${listingId}`);
      const commentData = await commentDataRes.json();
      console.log(commentData.comments);
      setComments(commentData.comments);
    })();
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
        formSubmitHanlder={async(value,rating) => await addCommentHandler(value,rating)}
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
