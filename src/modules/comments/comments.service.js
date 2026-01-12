import { Comment } from "./comments.model.js";

export const createComment = async (data) => {
  return Comment.create(data);
};

export const getCourseCommentsWithReplies = async (courseId) => {
  const comments = await Comment.find({ course: courseId })
    .populate("user", "name email")
    .sort({ createdAt: 1 })
    .lean();

  // Convert flat → nested
  const map = {};
  const roots = [];

  comments.forEach((c) => {
    map[c._id] = { ...c, replies: [] };
  });

  comments.forEach((c) => {
    if (c.parentComment) {
      map[c.parentComment]?.replies.push(map[c._id]);
    } else {
      roots.push(map[c._id]);
    }
  });

  return roots;
};

export const deleteComment = (id, userId) =>
  Comment.findOneAndDelete({ _id: id, user: userId });
