import asyncHandler from "../../utils/asyncHandler.js";
import ApiError from "../../utils/ApiError.js";
import { success } from "../../utils/apiResponse.js";
import * as CommentService from "./comments.service.js";

export const addComment = asyncHandler(async (req, res) => {
  const { content, courseId, parentComment } = req.body;

  if (!content || !courseId) {
    throw new ApiError("Content and courseId are required", 400);
  }

  const comment = await CommentService.createComment({
    content,
    course: courseId,
    parentComment: parentComment || null,
    user: req.user._id,
  });

  success(res, comment, "Comment added");
});

export const getCommentsByCourse = asyncHandler(async (req, res) => {
  const { courseId } = req.params;

  const comments = await CommentService.getCourseComments(courseId);

  success(res, comments, "Comments fetched");
});

export const getReplies = asyncHandler(async (req, res) => {
  const { commentId } = req.params;

  const replies = await CommentService.getReplies(commentId);

  success(res, replies, "Replies fetched");
});

export const deleteComment = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const deleted = await CommentService.deleteComment(id, req.user._id);

  if (!deleted) {
    throw new ApiError("Comment not found or unauthorized", 403);
  }

  success(res, null, "Comment deleted");
});
