const router = require("express").Router();
const ctrl = require("./pdf.controller");
const validate = require("../../middlewares/validate.middleware");
const {
  createPdfValidation,
  updatePdfValidation,
} = require("./pdf.validation");

router.route("/")
  .get(ctrl.getPdf) 
  .post(createPdfValidation, validate, ctrl.createPdf);

router.route("/:id")
  .put(updatePdfValidation, validate, ctrl.updatePdf)
  .patch(updatePdfValidation, validate, ctrl.updatePdf)
  .delete(ctrl.deletePdf);
module.exports = router;
