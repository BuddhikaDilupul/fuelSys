const express = require("express");
const router = express.Router();
const { validate } = require("express-validation");
const authValidation = require("../../validations/auth.validation");
const authController = require("../../controllers/auth.controller");


router.post(
  "/login",
  validate(authValidation.login),
  authController.userLogin
);
router.post(
  "/",
  validate(authValidation.createUser),
  authController.createUser
);


module.exports = router;
