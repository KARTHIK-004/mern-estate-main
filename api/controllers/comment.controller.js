import Comment from "../models/comment.model.js"

const addComment = async(req,res) =>{
    const {comment,userId} = req.body;
    try{
        const newComment = await Comment.create({comment,user : userId});
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
        const comments = await Comment.find({});
        
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

export {addComment,getComments,getCommentById};