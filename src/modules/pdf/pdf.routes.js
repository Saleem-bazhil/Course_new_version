import { Router } from "express";
const router = Router();
import * as ctrl from "./pdf.controller.js";
import joiValidate from "../../middlewares/joiValidate.middleware.js";
import { createPdfValidation } from "./pdf.validation.js";
<<<<<<< HEAD
import { optionalAuthenticate } from "../../middlewares/optionalAuth.middleware.js";
=======
import auth from "../../middlewares/auth.middleware.js";
>>>>>>> recover-admin

router
  .route("/")
  .get(optionalAuthenticate, ctrl.getPdf)
  .post(joiValidate(createPdfValidation), ctrl.createPdf);

// Secure download route: only authenticated users with a valid payment
// for the requested PDF will be able to fetch it.
router.get("/download/:id", auth, ctrl.downloadPdf);

router
  .route("/:id")
<<<<<<< HEAD
  .get(optionalAuthenticate, ctrl.getPdfById) 
=======
  .get(ctrl.getPdfById)
>>>>>>> recover-admin
  .put(ctrl.updatePdf)
  .patch(ctrl.updatePdf)
  .delete(ctrl.deletePdf);
export default router;
