import React from "react";
import { FiEdit2, FiTrash } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import CommentForm from "./CommentForm";

const Comment = ({
  comment,
  logginedUserId,
  affectedComment,
  setAffectedComment,
  // addComment,
  // parentId = null,
  updateComment,
  deleteComment,
}) => {
  const commentBelongsToUser = logginedUserId == comment.user;
  console.log({logginedUserId,commentId : comment._id})
  console.log({comment : comment.comment,commentBelongsToUser,logginedUserId,commentUserId : comment._id})
  const isEditing =
    affectedComment &&
    affectedComment.type === "editing" &&
    affectedComment._id === comment._id;

  return (
    <div className="flex flex-nowrp items-start gap-x-3 bg-slate-200 p-3 rounded-lg">
      <img
        src={comment.avatar}
        alt="user profile"
        className="w-9 h-9 object-cover rounded-full"
      />
      <div className="flex-1 flex flex-col">
      <div className="flex items-center justify-between">
          <h5 className="font-bold text-slate-700 text-xs lg:text-sm">
            {comment.username}
          </h5>
          <div className="flex ml-2">
            {[...Array(5)].map((_, index) => (
              <FaStar  key={index} className="w-4 h-4 text-slate-500" />
            ))}
          </div>
        </div>
        <span className="text-xs text-slate-500">
          {new Date(comment.createdAt).toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "2-digit",
          })}
        </span>
        {!isEditing && (
          <p className="font-opensans mt-[10px] text-slate-700">
            {comment.comment}
          </p>
        )}
        {isEditing && (
          <CommentForm
            btnLabel="Update"
            formSubmitHanlder={(value) => updateComment(value, comment._id)}
            formCancelHandler={() => setAffectedComment(null)}
            initialText={comment.comment}
          />
        )}
        <div className="flex items-center gap-x-3 text-slate-700 text-sm mt-3 mb-3">
          {!!commentBelongsToUser && (
            <>
              <button
                className="flex items-center space-x-2"
                onClick={() =>
                  setAffectedComment({ type: "editing", _id: comment._id })
                }
              >
                <FiEdit2 className="w-4 h-auto" />
                <span>Edit</span>
              </button>
              <button
                className="flex items-center space-x-2"
                onClick={() => deleteComment(comment._id)}
              >
                <FiTrash className="w-4 h-auto" />
                <span>Delete</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comment;
