

const express = require("express");
const router = express.Router();
const { authenticate } = require("../../middlewares/authenticate");
const ROLES = require("../../../ROLES");
const { authorize } = require("../../middlewares/authorize");
const fuelController = require("../../controllers/fuel.controller");

// Create a new fuel entry
router.post(
  "/admin/save",
  authenticate,
  authorize([ROLES.admin, ROLES.manager]),
  fuelController.createFuel
);

// View all fuel entries
router.get(
  "/all/view",
  authenticate,
  authorize([ROLES.admin, ROLES.manager, ROLES.pumper]),
  fuelController.getAllFuels
);

// View all fuel entries
router.get(
  "/sys/view",
  fuelController.getAllFuels
);

// View a single fuel entry by ID
router.get(
  "/all/view/:id",
  authenticate,
  authorize([ROLES.admin, ROLES.manager]),
  fuelController.getFuelById
);

// Update a fuel entry by ID
router.put(
  "/admin/update/:id",
  authenticate,
  authorize([ROLES.admin, ROLES.manager]),
  fuelController.updateFuel
);

// Change the status of a fuel entry by ID
router.put(
  "/admin/status/:id",
  authenticate,
  authorize([ROLES.admin, ROLES.manager]),
  fuelController.changeStatus
);

module.exports = router;
