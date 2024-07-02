import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.ObjectId, ref: "User" },
    comment: String,
    username : String,
    avatar : String,
    listingId : {type : mongoose.Schema.ObjectId , ref : "Listing"},
    rating : {type : Number, required : true},
    sentimentScore : {type : Number, required : true}
    // parent : {type : mongoose.Schema.ObjectId,ref : 'Comment'}
  },
  { timestamps: true }
);

const Comment = mongoose.model("comments", commentSchema);

export default Comment;
