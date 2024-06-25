import Comment from "../models/comment.model.js"
import User from "../models/user.model.js"
const addComment = async(req,res) =>{
    const {comment,userId,listingId} = req.body;
    try{
        const userDoc = await User.findById({_id : userId});
        console.log(userDoc)
        const newComment = await Comment.create({comment,user : userId,username : userDoc.username,avatar : userDoc.avatar,listingId});
        console.log("comment created");
        res.status(201).json({commentId : newComment._id, message : "Comment has been created"});
    }catch(err){
        console.log(err);
        res.status(500).json({message : "Error while creating comment"});
    }   
}


const getComments = async(req,res) =>{
    try{
        // const comments = await  
        const {listingId} = req.params
        const comments = await Comment.find({listingId});
        res.status(200).json({comments});
    }catch(err){
        console.log(err);
        res.status(500);
    }
}

const getCommentById = async(req,res) =>{
    const {id} = req.params
    try{
        const comment = await Comment.findById({_id : id})
        res.status(200).json(comment)
    }catch(err){
        console.log(err);
    }
}

const deleteCommentById = async(req,res)=>{
    const {id} = req.params;
    try{
        await Comment.deleteOne({_id : id});
        res.status(204).json({message : "deleted the comment"});
    }catch(err){
        res.status(501).json({err});
    }
}

const updateCommentById = async(req,res)=>{
    const {id} = req.params;
    const {comment} = req.body;
    try{
        const commentDoc = await Comment.findById({_id : id});
        commentDoc.comment = comment;
        await commentDoc.save();
        res.status(200).json({message : "ok"})
    }catch(err){
        console.log(err);
        res.status(501).json({err});
    }
}

export {addComment,getComments,getCommentById,deleteCommentById,updateCommentById};