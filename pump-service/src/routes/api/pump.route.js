const express = require("express");
const router = express.Router();
const { authenticate } = require("../../middlewares/authenticate");
const ROLES = require("../../../ROLES");
const { authorize } = require("../../middlewares/authorize");
const pumpController = require("../../controllers/pump.controller");


router.post(
  "/admin/save",
  authenticate,
  authorize([ROLES.admin, ROLES.manager]),
  pumpController.savePump
);
router.get(
  "/all/view",
  authenticate,
  authorize([ROLES.admin, ROLES.manager]),
  pumpController.getAllPumps
);
router.get(
  "/all/view/:id",
  authenticate,
  // authorize([ROLES.admin, ROLES.manager]),
  pumpController.getPumpById
);


module.exports = router;
