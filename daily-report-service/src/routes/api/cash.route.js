const express = require("express");
const router = express.Router();
const { authenticate } = require("../../middlewares/authenticate");
const ROLES = require("../../../ROLES");
const { authorize } = require("../../middlewares/authorize");
const cashController = require("../../controllers/cash.controller");

// Create a new Cash record
router.post(
  "/save",
  authenticate,
  authorize([ROLES.admin, ROLES.manager, ROLES.pumper]),
  cashController.createCash
);

// Get a Cash record by ID
router.get(
  "/:id",
  authenticate,
  authorize([ROLES.admin, ROLES.manager, ROLES.pumper]),
  cashController.getCashById
);
router.get(
  "/pumper/:id",
  authenticate,
  authorize([ROLES.admin, ROLES.manager, ROLES.pumper]),
  cashController.getRecordsByPumperId
);

// Get all Cash records
router.get(
  "/",
  authenticate,
  authorize([ROLES.admin, ROLES.manager]),
  cashController.getAllCash
);

// Update a Cash record by ID
router.put(
  "/cash/update/:id",
  authenticate,
  authorize([ROLES.admin, ROLES.manager]),
  cashController.updateCashById
);

// Delete a Cash record by ID
router.delete(
  "/cash/delete/:id",
  authenticate,
  authorize([ROLES.admin, ROLES.manager]),
  cashController.deleteCashById
);

module.exports = router;
