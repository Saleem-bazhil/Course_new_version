import express from "express";
import {
  addComment,
  getCommentsByCourse,
  deleteComment,
} from "./comments.controller.js";
import { authenticate } from "../../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", authenticate, addComment);
router.get("/course/:courseId", getCommentsByCourse);
router.delete("/:id", authenticate, deleteComment);

export default router;
