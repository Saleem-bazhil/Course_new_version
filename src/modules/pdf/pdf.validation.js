import { body, param } from "express-validator";

export const createPdfValidation = [
  body("image").notEmpty().withMessage("Image is required"),

  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 3 })
    .withMessage("Title must be at least 3 characters"),

  body("description").notEmpty().withMessage("Description is required"),
  body("chapters").notEmpty().withMessage("Chapters are required"),
  body("pdfUrl").notEmpty().withMessage("PDF URL is required"),

  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isNumeric()
    .withMessage("Price must be a number"),

  body("image_detail.image1").notEmpty().withMessage("Image1 is required"),
  body("image_detail.image2").notEmpty().withMessage("Image2 is required"),
  body("image_detail.image3").notEmpty().withMessage("Image3 is required"),
  body("image_detail.image4").notEmpty().withMessage("Image4 is required"),
];

export const updatePdfValidation = [
  param("id").isMongoId().withMessage("Invalid PDF ID"),
];
