const express = require("express");
const router = express.Router();
const { authenticate } = require("../../middlewares/authenticate");
const ROLES = require("../../../ROLES");
const { authorize } = require("../../middlewares/authorize");
const pumpHistoryController = require("../../controllers/pumpHistory.controller");

router.post(
  "/create",
  authenticate,
  authorize([ROLES.admin, ROLES.manager]),
  pumpHistoryController.createPumpHistory
);

router.put(
  "/update/:id",
  authenticate,
  authorize([ROLES.admin, ROLES.manager]),
  pumpHistoryController.updatePumpHistoryStatus
);

module.exports = router;
