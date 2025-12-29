import { Router } from "express";
const router = Router();
import * as ctrl from "./pdf.controller.js";
import joiValidate from "../../middlewares/joiValidate.middleware.js";
import { createPdfValidation } from "./pdf.validation.js";
import auth from "../../middlewares/auth.middleware.js";

router
  .route("/")
  .get(ctrl.getPdf)
  .post(joiValidate(createPdfValidation), ctrl.createPdf);

// Secure download route: only authenticated users with a valid payment
// for the requested PDF will be able to fetch it.
router.get("/download/:id", auth, ctrl.downloadPdf);

router
  .route("/:id")
  .get(ctrl.getPdfById)
  .put(ctrl.updatePdf)
  .patch(ctrl.updatePdf)
  .delete(ctrl.deletePdf);
export default router;
