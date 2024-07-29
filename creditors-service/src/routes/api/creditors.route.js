const express = require("express");
const router = express.Router();
const { authenticate } = require("../../middlewares/authenticate");
const ROLES = require("../../../ROLES");
const { authorize } = require("../../middlewares/authorize");
const creditorsController = require("../../controllers/creditors.controller");

router.post(
  "/admin/save",
  authenticate,
  authorize([ROLES.admin, ROLES.manager]),
  creditorsController.createCreditor
);
router.get(
  "/all/view",
  authenticate,
  authorize([ROLES.admin, ROLES.manager,ROLES.pumper]),
  creditorsController.getAllCreditors
);
router.post(
  "/all/view/:id",
  authenticate,
  authorize([ROLES.admin, ROLES.manager,ROLES.pumper]),
  creditorsController.getCreditorById
);
router.post(
  "/admin/update",
  authenticate,
  authorize([ROLES.admin, ROLES.manager]),
  creditorsController.updateCreditor
);
router.get(
  "/admin/delete",
  authenticate,
  authorize([ROLES.admin, ROLES.manager]),
  creditorsController.deleteCreditor
);

module.exports = router;
