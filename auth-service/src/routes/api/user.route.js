const express = require("express");
const router = express.Router();
const { authenticate } = require("../../middlewares/authenticate");
const ROLES = require("../../ROLES");
const { authorize } = require("../../middlewares/authorize");
const getUserController = require("../../controllers/user.controller");
const { validate } = require("express-validation");
const authValidation = require("../../validations/auth.validation");


router.get(
  "/managers",
  authenticate,
  authorize([ROLES.admin, ROLES.manager, ROLES.pumper]),
  getUserController.getAllManagers
);
router.get(
  "/pumpers",
  authenticate,
  authorize([ROLES.admin, ROLES.manager, ROLES.pumper]),
  getUserController.getAllManagers
);

router.get(
  "/",
  authenticate,
  authorize([ROLES.admin, ROLES.manager, ROLES.pumper]),
  getUserController.getAll
);

router.put(
  "/:id",
  validate(authValidation.updateUser),
  authenticate,
  authorize([ROLES.admin, ROLES.manager]),
  getUserController.updateUserData
);

router.get(
  "/:email",
  authenticate,
  authorize([ROLES.admin]),
  getUserController.getUserDataByEmail
);


module.exports = router;
