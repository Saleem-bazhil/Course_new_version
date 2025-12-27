import * as service from "./pdf.service.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { success } from "../../utils/apiResponse.js";
import ApiError from "../../utils/ApiError.js";
import { checkUserPurchase } from "../payment/payment.service.js";

export const getPdf = asyncHandler(async (req, res) => {
  const pdfs = await service.findAll(req.query);
  
  // If user is authenticated, check purchases and hide pdfUrl for unpurchased guides
  if (req.user) {
    const pdfsWithAccess = await Promise.all(
      pdfs.map(async (pdf) => {
        const hasPurchased = await checkUserPurchase(req.user._id, pdf._id);
        const pdfObj = pdf.toObject ? pdf.toObject() : pdf;
        if (!hasPurchased) {
          delete pdfObj.pdfUrl;
        }
        return pdfObj;
      })
    );
    return success(res, pdfsWithAccess);
  }
  
  // If not authenticated, hide all pdfUrls
  const pdfsWithoutUrls = pdfs.map((pdf) => {
    const pdfObj = pdf.toObject ? pdf.toObject() : pdf;
    delete pdfObj.pdfUrl;
    return pdfObj;
  });
  
  success(res, pdfsWithoutUrls);
});

export const getPdfById = asyncHandler(async (req, res) => {
  const pdf = await service.findById(req.params.id);
  
  if (!pdf) {
    throw new ApiError("PDF not found", 404);
  }
  
  // If user is authenticated, check if they purchased this guide
  if (req.user) {
    const hasPurchased = await checkUserPurchase(req.user._id, pdf._id);
    const pdfObj = pdf.toObject ? pdf.toObject() : pdf;
    
    if (!hasPurchased) {
      delete pdfObj.pdfUrl;
    }
    
    return success(res, pdfObj, "PDF fetched successfully");
  }
  
  // If not authenticated, hide pdfUrl
  const pdfObj = pdf.toObject ? pdf.toObject() : pdf;
  delete pdfObj.pdfUrl;
  
  success(res, pdfObj, "PDF fetched successfully");
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
