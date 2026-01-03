import { Course } from "./course.model.js";

export const createCourse = (data) => Course.create(data);

export const getAllCourses = () => Course.find();

export const getCourseById = (id) => Course.findById(id);

export const updateCourse = (id, data) =>
  Course.findByIdAndUpdate(id, data, { new: true });

export const deleteCourse = (id) =>
  Course.findByIdAndDelete(id);
