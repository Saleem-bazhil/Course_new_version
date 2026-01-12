import asyncHandler from "../../utils/asyncHandler.js";
import { success } from "../../utils/apiResponse.js";
import { Note } from "./notes.model.js";

export const createNote = asyncHandler(async (req, res) => {
  const note = await Note.create({
    title: req.body.title,
    content: req.body.content,
    course: req.body.course,
    user: req.user._id,
  });

  success(res, note, "Note created");
});

export const getNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find({
    course: req.params.courseId,
    user: req.user._id,
  }).sort({ createdAt: -1 });

  success(res, notes);
});

export const updateNote = asyncHandler(async (req, res) => {
  const note = await Note.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    req.body,
    { new: true }
  );

  success(res, note, "Note updated");
});

export const deleteNote = asyncHandler(async (req, res) => {
  await Note.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id,
  });

  success(res, null, "Note deleted");
});
