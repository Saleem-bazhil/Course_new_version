const express = require("express");
const router = express.Router();

// Import module routes here
const pdfRoutes = require("./modules/pdf/pdf.routes");
router.use("/pdf", pdfRoutes);

module.exports = router;