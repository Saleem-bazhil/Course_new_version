import { Router } from "express";
const router = Router();
import * as ctrl from "./pdf.controller.js";
import joiValidate from "../../middlewares/joiValidate.middleware.js";
import { createPdfValidation } from "./pdf.validation.js";

router
  .route("/")
  .get(ctrl.getPdf)
  .post(joiValidate(createPdfValidation), ctrl.createPdf);

router
  .route("/:id")
  .put(ctrl.updatePdf)
  .patch(ctrl.updatePdf)
  .delete(ctrl.deletePdf);
export default router;
