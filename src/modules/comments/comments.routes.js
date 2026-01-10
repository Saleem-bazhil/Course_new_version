import express from "express";
import {
  addComment,
  getCommentsByCourse,
  getReplies,
  deleteComment,
} from "./comments.controller.js";
import { authenticate } from "../../middlewares/auth.middleware.js";

const router = express.Router();

// Create comment / reply
router.post("/", authenticate, addComment);

// Get comments for a course
router.get("/course/:courseId", getCommentsByCourse);

// Get replies for a comment
router.get("/replies/:commentId", getReplies);

// Delete own comment
router.delete("/:id", authenticate, deleteComment);

export default router;
