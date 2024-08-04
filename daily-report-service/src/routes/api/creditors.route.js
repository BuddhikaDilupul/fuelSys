const express = require("express");
const router = express.Router();
const { authenticate } = require("../../middlewares/authenticate");
const ROLES = require("../../../ROLES");
const { authorize } = require("../../middlewares/authorize");
const creditController = require("../../controllers/creditors.controller");

// Create a new Cash record
router.post(
  "/save",
  authenticate,
  authorize([ROLES.admin, ROLES.manager, ROLES.pumper]),
  creditController.createCreditors
);


// Update a Cash record by ID
router.put(
  "/:id",
  authenticate,
  authorize([ROLES.admin, ROLES.manager]),
  creditController.updateCreditorsById
);

// Delete a Cash record by ID
router.delete(
  "/cash/delete/:id",
  authenticate,
  authorize([ROLES.admin, ROLES.manager]),
  cashController.deleteCashById
);

module.exports = router;
