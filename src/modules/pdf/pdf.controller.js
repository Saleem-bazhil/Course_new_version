import * as service from "./pdf.service.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { success } from "../../utils/apiResponse.js";
import ApiError from "../../utils/ApiError.js";

export const getPdf = asyncHandler(async (req, res) => {
  const pdfs = await service.findAll(req.query);
  success(res, pdfs);
});

export const getPdfById = asyncHandler(async (req, res) => {
  const pdf = await service.findById(req.params.id);
  success(res, pdf, "PDF fetched successfully");
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

// Download / stream the PDF bytes for a user who has purchased it.
export const downloadPdf = asyncHandler(async (req, res) => {
  if (!req.user || !req.user.id) {
    throw new ApiError("Unauthorized", 401);
  }

  const pdfId = req.params.id;

  const { stream, filename } = await service.getPdfStreamForUser(
    pdfId,
    req.user.id,
    req.user.role
  );

  if (!stream) {
    throw new ApiError("Unable to fetch PDF", 500);
  }

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `inline; filename="${encodeURIComponent(filename || "file.pdf")}"`
  );

  stream.pipe(res);
});
