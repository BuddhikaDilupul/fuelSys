const express = require("express");
const router = express.Router();
const { authenticate } = require("../../middlewares/authenticate");
const ROLES = require("../../../ROLES");
const { authorize } = require("../../middlewares/authorize");
const atmController = require("../../controllers/atm.controller");

// Create a new ATM report
router.post(
  "/save",
  authenticate,
  authorize([ROLES.admin, ROLES.manager, ROLES.pumper]),
  atmController.createATM
);

// Get an ATM report by ID
router.get(
  "/atm-report/:id",
  authenticate,
  authorize([ROLES.admin, ROLES.manager, ROLES.pumper]),
  atmController.getATMById
);
router.get(
  "/pumper/:id",
  authenticate,
  authorize([ROLES.admin, ROLES.manager, ROLES.pumper]),
  atmController.getPumperReport
);

// Get all ATM reports
router.get(
  "/atm-reports",
  authenticate,
  authorize([ROLES.admin, ROLES.manager]),
  atmController.getAllATMs
);

// Update an ATM report by ID
router.put(
  "/:id",
  authenticate,
  authorize([ROLES.admin, ROLES.manager]),
  atmController.updateATMById
);

// Delete an ATM report by ID
router.delete(
  "/atm-report/delete/:id",
  authenticate,
  authorize([ROLES.admin, ROLES.manager]),
  atmController.deleteATMById
);

module.exports = router;
