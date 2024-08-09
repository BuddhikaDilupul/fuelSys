const express = require("express");
const router = express.Router();
const { authenticate } = require("../../middlewares/authenticate");
const ROLES = require("../../../ROLES");
const { authorize } = require("../../middlewares/authorize");
const pumpController = require("../../controllers/pump.controller");
const pumpValidation = require("../../validations/pump.validation");

const  {validate} = require("express-validation");

router.post(
  "/admin/save",
  authenticate,
  authorize([ROLES.admin, ROLES.manager]),
  validate(pumpValidation.createPump),
  pumpController.savePump
);
router.put(
  "/admin/updatePumpStateToInUse/:id",
  authenticate,
  authorize([ROLES.admin, ROLES.manager]),
  pumpController.updatePumpStateToInUse
);
router.put(
  "/admin/updatePumpStateToFree/:id",
  authenticate,
  authorize([ROLES.admin, ROLES.manager]),
  pumpController.updatePumpStateToFree
);
router.put(
  "/admin/updatePumpListStateToFree",
  authenticate,
  authorize([ROLES.admin, ROLES.manager]),
  pumpController.updatePumpListStateToFree);
router.get(
  "/all/view",
  authenticate,
  authorize([ROLES.admin, ROLES.manager, ROLES.pumper]),
  pumpController.getAllPumps
);
router.get(
  "/all/view/:id",
  authenticate,
  authorize([ROLES.admin, ROLES.manager, ROLES.pumper]),
  pumpController.getPumpById
);
router.get(
  "/sys/:id",
  pumpController.getPumpById
);


module.exports = router;
