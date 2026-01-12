import express from "express";
import { authenticate } from "../../middlewares/auth.middleware.js";
import {
  createNote,
  getNotes,
  updateNote,
  deleteNote,
} from "./notes.controller.js";

const router = express.Router();

router.post("/", authenticate, createNote);
router.get("/course/:courseId", authenticate, getNotes);
router.put("/:id", authenticate, updateNote);
router.delete("/:id", authenticate, deleteNote);

export default router;
