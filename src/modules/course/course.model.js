import mongoose from "mongoose";

const chapterSchema = new mongoose.Schema(
  {
    chapter_title: { type: String, required: true },
    chapter_description: { type: String, required: true },
    duration: { type: Number, required: true }, // minutes
  },
  { _id: true } // allowed
);

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    rating: { type: Number, default: 0 },
    hours: { type: Number, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },

    chapters: [chapterSchema],
  },
  { timestamps: true }
);

export const Course = mongoose.model("Course", courseSchema);
