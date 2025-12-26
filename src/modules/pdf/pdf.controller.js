const service = require("./pdf.service");
const asyncHandler = require("../../utils/asyncHandler");
const { success } = require("../../utils/apiResponse");

exports.getPdf = asyncHandler(async (req, res) => {
  const pdfs = await service.findAll(req.query);
  success(res, pdfs);
});

exports.createPdf = asyncHandler(async (req, res) => {
  const pdf = await service.create(req.body);
  success(res, pdf, "PDF created");
});
  
exports.updatePdf = asyncHandler(async (req, res) => {
  const pdf = await service.update(req.params.id, req.body);
  if (!pdf) throw new Error("PDF not found");
  success(res, pdf, "PDF updated");
});
