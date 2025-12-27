import Joi from "joi";

export const createPdfValidation = Joi.object({
  image: Joi.string().required(),
  title: Joi.string().min(3).required(),
  description: Joi.string().required(),
  chapters: Joi.string().required(),
  pdfUrl: Joi.string().required(),
  price: Joi.number().required(),
  image_detail: Joi.object({
    image1: Joi.string().required(),
    image2: Joi.string().required(),
    image3: Joi.string().required(),
    image4: Joi.string().required(),
  }).required(),
});

export const updatePdfValidation = Joi.object({
  id: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(), // MongoDB ObjectId
});
