import * as service from "./pdf.service.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { success } from "../../utils/apiResponse.js";
import ApiError from "../../utils/ApiError.js";

export const getPdf = asyncHandler(async (req, res) => {
  const pdfs = await service.findAll(req.query);
  success(res, pdfs);
});

export const createPdf = asyncHandler(async (req, res) => {
  const pdf = await service.create(req.body);
  success(res, pdf, "PDF created");
});

export const updatePdf = asyncHandler(async (req, res) => {
  const pdf = await service.update(req.params.id, req.body);
  if (!pdf) throw new ApiError("PDF not found", 404);
  success(res, pdf, "PDF updated");
});

export const deletePdf = asyncHandler(async (req, res) => {
  const pdf = await service.deletePdf(req.params.id);
  if (!pdf) throw new ApiError("PDF not found", 404);
  success(res, pdf, "PDF deleted");
});
