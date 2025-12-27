import { Router } from "express";
const router = Router();
import * as ctrl from "./pdf.controller.js";
import validate from "../../middlewares/validate.middleware.js";
import { createPdfValidation, updatePdfValidation } from "./pdf.validation.js";

router
  .route("/")
  .get(ctrl.getPdf)
  .post(createPdfValidation, validate, ctrl.createPdf);

router
  .route("/:id")
  .put(updatePdfValidation, validate, ctrl.updatePdf)
  .patch(updatePdfValidation, validate, ctrl.updatePdf)
  .delete(ctrl.deletePdf);
export default router;
