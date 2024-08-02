const express = require("express");
const router = express.Router();
const { authenticate } = require("../../middlewares/authenticate");
const ROLES = require("../../ROLES");
const { authorize } = require("../../middlewares/authorize");
const getUserController = require("../../controllers/user.controller");
const  {validate} = require("express-validation");
const authValidation = require("../../validations/auth.validation");

router.get(
  "/:email",
  authenticate,
  authorize([ROLES.admin]),
  getUserController.getUserDataByEmail
);

router.get(
  "/",
  authenticate,
  authorize( [ROLES.admin]),
  getUserController.getAll
);
router.put(
  "/:id",
  validate(authValidation.updateUser),
  authenticate,
  authorize( [ROLES.admin]),
  getUserController.updateUserData
);


module.exports = router;
