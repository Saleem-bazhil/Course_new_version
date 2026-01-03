import asyncHandler from "../../utils/asyncHandler.js";
import { success } from "../../utils/apiResponse.js";
import * as CourseService from "./course.service.js";

export const createCourse = asyncHandler(async (req, res) => {
  const course = await CourseService.createCourse(req.body);
  success(res, course, "Course created");
});

export const getCourses = asyncHandler(async (req, res) => {
  const courses = await CourseService.getAllCourses();
  success(res, courses, "Courses fetched");
});

export const getCourse = asyncHandler(async (req, res) => {
  const course = await CourseService.getCourseById(req.params.id);
  success(res, course, "Course fetched");
});

export const updateCourse = asyncHandler(async (req, res) => {
  const course = await CourseService.updateCourse(
    req.params.id,
    req.body
  );
  success(res, course, "Course updated");
});

export const deleteCourse = asyncHandler(async (req, res) => {
  await CourseService.deleteCourse(req.params.id);
  success(res, null, "Course deleted");
});
