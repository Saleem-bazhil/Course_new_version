import asyncHandler from "../../utils/asyncHandler.js";
import { success } from "../../utils/apiResponse.js";
import ApiError from "../../utils/ApiError.js";
import * as CourseService from "./course.service.js";
import { checkUserPurchase } from "../payment/payment.service.js";

export const createCourse = asyncHandler(async (req, res) => {
  const course = await CourseService.createCourse(req.body);
  success(res, course, "Course created");
});

export const getCourses = asyncHandler(async (req, res) => {
  const courses = await CourseService.getAllCourses();

  const result = await Promise.all(
    courses.map(async (course) => {
      const obj = course.toObject();

      obj.isPurchased = req.user
        ? await checkUserPurchase(req.user._id, course._id, "Course")
        : false;

      return obj;
    })
  );

  success(res, result, "Courses fetched");
});

export const getCourse = asyncHandler(async (req, res) => {
  const course = await CourseService.getCourseById(req.params.id);
  if (!course) throw new ApiError("Course not found", 404);

  const obj = course.toObject();
  obj.isPurchased = req.user
    ? await checkUserPurchase(req.user._id, course._id, "Course")
    : false;

  success(res, obj, "Course fetched");
});

export const updateCourse = asyncHandler(async (req, res) => {
  const course = await CourseService.updateCourse(req.params.id, req.body);
  success(res, course, "Course updated");
});

export const deleteCourse = asyncHandler(async (req, res) => {
  await CourseService.deleteCourse(req.params.id);
  success(res, null, "Course deleted");
});
