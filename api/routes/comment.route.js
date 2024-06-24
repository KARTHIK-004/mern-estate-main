import { Router } from "express";

import {
    getComments,
    getCommentById,
    addComment,
  } from "../controllers/comment.controller.js";
  


const router = Router();

router.post("/addComment",addComment);
router.get("/allComments/:listingId",getComments);
router.get("/getComment/:id",getCommentById);


export default router;
