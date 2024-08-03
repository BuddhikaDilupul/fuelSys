const express = require("express");
const router = express.Router();
const { authenticate } = require("../../middlewares/authenticate");
const ROLES = require("../../../ROLES");
const { authorize } = require("../../middlewares/authorize");
const reportController = require("../../controllers/report.controller");

// Create a new Report
router.post(
  "/save",
  authenticate,
  authorize([ROLES.admin, ROLES.manager, ROLES.pumper]),
  reportController.createReport
);

// Get a Report by ID
router.get(
  "/report/:id",
  authenticate,
  authorize([ROLES.admin, ROLES.manager]),
  reportController.getReportById
);

// Get all Reports
router.get(
  "/reports",
  authenticate,
  authorize([ROLES.admin, ROLES.manager]),
  reportController.getAllReports
);

// Update a Report by ID
router.put(
  "/report/update/:id",
  authenticate,
  authorize([ROLES.admin, ROLES.manager]),
  reportController.updateReportById
);

// Delete a Report by ID
router.delete(
  "/report/delete/:id",
  authenticate,
  authorize([ROLES.admin, ROLES.manager]),
  reportController.deleteReportById
);

module.exports = router;
