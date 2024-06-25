import { Router } from "express";

import {
    getComments,
    getCommentById,
    addComment,
    deleteCommentById,
    updateCommentById
  } from "../controllers/comment.controller.js";
  


const router = Router();

router.post("/addComment",addComment);
router.get("/allComments/:listingId",getComments);
router.get("/getComment/:id",getCommentById);
router.delete("/deleteComment/:id",deleteCommentById);
router.patch("/updateComment/:id",updateCommentById);

export default router;
