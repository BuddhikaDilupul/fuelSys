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



// Get all Reports
router.get(
  "/reports",
  authenticate,
  authorize([ROLES.admin, ROLES.manager]),
  reportController.getAllReports
);

// Get all pumper Reports
router.get(
  "/pumper-reports",
  authenticate,
  authorize([ROLES.admin, ROLES.manager]),
  reportController.getAllReportsSubmittedByPumper
);


// Update a Report by ID
router.put(
  "/report/update/:id",
  authenticate,
  authorize([ROLES.admin, ROLES.manager]),
  reportController.updateReportById
);

// Get a Report by ID
router.get(
  "/assignedTo/:username",
  authenticate,
  authorize([ROLES.admin, ROLES.manager]),
  reportController.getReportByAssignedPerson
);


// Delete a Report by ID
router.delete(
  "/report/delete/:id",
  authenticate,
  authorize([ROLES.admin, ROLES.manager]),
  reportController.deleteReportById
);



// Get a Report by ID
router.get(
  "/:id",
  authenticate,
  authorize([ROLES.admin, ROLES.manager]),
  reportController.getReportById
);


module.exports = router;
