import { Comment } from "./comments.model.js";

export const createComment = (data) => Comment.create(data);

export const getCourseComments = (courseId) =>
  Comment.find({ course: courseId, parentComment: null })
    .populate("user", "name email")
    .sort({ createdAt: -1 });

export const getReplies = (commentId) =>
  Comment.find({ parentComment: commentId })
    .populate("user", "name email")
    .sort({ createdAt: 1 });

export const deleteComment = (id, userId) =>
  Comment.findOneAndDelete({ _id: id, user: userId });
