import express from "express";
import {
  createCourse,
  getCourses,
  getCourse,
  updateCourse,
  deleteCourse,
} from "./course.controller.js";
import { authenticate } from "../../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", createCourse);
router.get("/",authenticate, getCourses);
router.get("/:id",authenticate, getCourse);
router.put("/:id", updateCourse);
router.delete("/:id", deleteCourse);

export default router;
