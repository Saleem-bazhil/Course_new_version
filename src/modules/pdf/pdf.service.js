import Pdf from "./pdf.model.js";
import { Payment } from "../payment/payment.model.js";
import axios from "axios";

export const findAll = (query) => Pdf.find(query);
export const findById = (id) => Pdf.findById(id);
export const create = (data) => Pdf.create(data);
export const update = (id, data) =>
  Pdf.findByIdAndUpdate(id, data, { new: true, runValidators: true });
export const deletePdf = (id) => Pdf.findByIdAndDelete(id);

// Ensure the requesting user has a successful payment linked to
// the requested PDF, then fetch and stream the PDF bytes from
// the remote pdfUrl on the server side (avoids browser CORS).
export const getPdfStreamForUser = async (pdfId, userId, role = "USER") => {
  const pdf = await Pdf.findById(pdfId);
  if (!pdf) {
    const error = new Error("PDF not found");
    error.statusCode = 404;
    throw error;
  }

  // Allow admins to bypass payment checks
  if (role !== "ADMIN") {
    const hasPayment = await Payment.findOne({
      user: userId,
      item: pdfId,
      itemType: "Pdf",
    });

    if (!hasPayment) {
      const error = new Error("You have not purchased this guide");
      error.statusCode = 403;
      throw error;
    }
  }

  if (!pdf.pdfUrl) {
    const error = new Error("PDF URL is missing");
    error.statusCode = 500;
    throw error;
  }

  // Fetch the PDF as a stream on the server side (no browser CORS issues)
  let response;
  try {
    response = await axios.get(pdf.pdfUrl, {
      responseType: "stream",
      // You can add timeout or headers here if needed
    });
  } catch (err) {
    // Network or DNS error, or non-2xx without response body
    const error = new Error("Unable to fetch PDF from source");
    error.statusCode = err.response?.status === 404 ? 404 : 502;
    throw error;
  }

  // If upstream responded but not with a successful status, treat as not found
  if (!response || response.status >= 400 || !response.data) {
    const error = new Error("PDF not found at source URL");
    error.statusCode = response?.status === 404 ? 404 : 502;
    throw error;
  }

  return {
    stream: response.data,
    filename: `${pdf.title || "guide"}.pdf`,
  };
};
