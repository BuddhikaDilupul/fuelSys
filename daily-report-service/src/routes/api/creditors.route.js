const express = require("express");
const router = express.Router();
const { authenticate } = require("../../middlewares/authenticate");
const ROLES = require("../../../ROLES");
const { authorize } = require("../../middlewares/authorize");
const creditController = require("../../controllers/creditors.controller");

// Create a new Credit record
router.post(
  "/save",
  authenticate,
  authorize([ROLES.admin, ROLES.manager, ROLES.pumper]),
  creditController.createCreditors
);


// Update a Credit record by ID
router.put(
  "/:id",
  authenticate,
  authorize([ROLES.admin, ROLES.manager]),
  creditController.updateCreditorsById
);


module.exports = router;
