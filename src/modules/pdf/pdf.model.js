import mongoose from "mongoose";

const PdfSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  chapters: {
    type: String,
    required: true,
  },
  pdfUrl: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image_detail: {
    image1: {
      type: String,
      required: true,
    },

    image2: {
      type: String,
      required: true,
    },
    image3: {
      type: String,
      required: true,
    },
    image4: {
      type: String,
      required: true,
    },
  },
});

export default mongoose.model("Pdf", PdfSchema);
