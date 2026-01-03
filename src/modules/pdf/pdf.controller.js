import * as service from "./pdf.service.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { success } from "../../utils/apiResponse.js";
import ApiError from "../../utils/ApiError.js";
import { checkUserPurchase } from "../payment/payment.service.js";

/** 
 * GET ALL PDFS
 */
export const getPdf = asyncHandler(async (req, res) => {
  const pdfs = await service.findAll(req.query);

  const result = await Promise.all(
    pdfs.map(async (pdf) => {
      const pdfObj = pdf.toObject();

      pdfObj.image =
        pdfObj.image ||
        pdfObj.image_detail?.url ||
        pdfObj.image_detail?.secure_url ||
        null;

      if (req.user) {
        const hasPurchased = await checkUserPurchase(
          req.user._id,
          pdf._id
        );
        pdfObj.isPurchased = hasPurchased;

        if (!hasPurchased) {
          delete pdfObj.pdfUrl;
        }
      } else {
        pdfObj.isPurchased = false;
        delete pdfObj.pdfUrl;
      }

      return pdfObj;
    })
  );

  success(res, result);
});

/**
 * GET PDF BY ID
 */
export const getPdfById = asyncHandler(async (req, res) => {
  const pdf = await service.findById(req.params.id);
  if (!pdf) throw new ApiError("PDF not found", 404);

  const pdfObj = pdf.toObject();
  pdfObj.image =
    pdfObj.image ||
    pdfObj.image_detail?.url ||
    pdfObj.image_detail?.secure_url ||
    null;

  if (req.user) {
    const hasPurchased = await checkUserPurchase(
      req.user._id,
      pdf._id
    );
    pdfObj.isPurchased = hasPurchased;

    if (!hasPurchased) {
      delete pdfObj.pdfUrl;
    }

    return success(res, pdfObj, "PDF fetched successfully");
  }

  // Not logged in
  pdfObj.isPurchased = false;
  delete pdfObj.pdfUrl;

  success(res, pdfObj, "PDF fetched successfully");
});


/**
 * CREATE PDF
 */
export const createPdf = asyncHandler(async (req, res) => {
  const pdf = await service.create(req.body);
  success(res, pdf, "PDF created");
});

/**
 * UPDATE PDF
 */
export const updatePdf = asyncHandler(async (req, res) => {
  const pdf = await service.update(req.params.id, req.body);
  if (!pdf) throw new ApiError("PDF not found", 404);
  success(res, pdf, "PDF updated");
});

/**
 * DELETE PDF
 */
export const deletePdf = asyncHandler(async (req, res) => {
  const pdf = await service.deletePdf(req.params.id);
  if (!pdf) throw new ApiError("PDF not found", 404);
  success(res, pdf, "PDF deleted");
});

/**
 * STREAM PDF (ONLY IF PURCHASED)
 */
export const downloadPdf = asyncHandler(async (req, res) => {
  if (!req.user || !req.user.id) {
    throw new ApiError("Unauthorized", 401);
  }

  const pdfId = req.params.id;

  const { stream, filename } =
    await service.getPdfStreamForUser(
      pdfId,
      req.user.id,
      req.user.role
    );

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `inline; filename="${encodeURIComponent(
      filename || "file.pdf"
    )}"`
  );

  stream.pipe(res);
});
