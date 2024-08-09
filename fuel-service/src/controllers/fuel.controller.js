const Fuel = require("../models/fuel.model");
const priceOverFuelModel = require("../models/priceOverFuel.model");
const priceOverFuel = require("../models/priceOverFuel.model");

// Create a new fuel entry
exports.createFuel = async (req, res) => {
  const { fuel, price } = req.body;

  try {
    const newFuel = new Fuel({
      fuel,
      price,
    });
    const isExist = priceOverFuel.findOne({fuel})
    if (isExist) {
      return res.status(400).json({ message: "Fuel already exist" });
      }
    const newPriceOverFuel = new priceOverFuel({
      fuel,
      price,
      status:"active"
    });

    await newPriceOverFuel.save();
    const savedFuel = await newFuel.save();
    res.status(201).json(savedFuel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all fuel entries
exports.getAllFuels = async (req, res) => {
  try {
    const fuels = await Fuel.find({ status: "active" }).lean();
    res.status(200).json(fuels);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single fuel entry by ID
exports.getFuelById = async (req, res) => {
  const { id } = req.params;

  try {
    const fuel = await Fuel.findById(id);
    if (!fuel) {
      return res.status(404).json({ message: "Fuel entry not found" });
    }
    res.status(200).json(fuel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a fuel entry by ID
exports.updateFuel = async (req, res) => {
  const { id } = req.params;
  const { fuel, price } = req.body;

  try {
    const updatedFuel = await Fuel.findByIdAndUpdate(
      id,
      { fuel, price, updatedAt: Date.now() },
      { new: true }
    );

    if (!updatedFuel) {
      return res.status(404).json({ message: "Fuel entry not found" });
    }

    res.status(200).json(updatedFuel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Change the status of a fuel entry by ID
exports.changeStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!["active", "expired"].includes(status)) {
    return res.status(400).json({ message: "Invalid status value" });
  }

  try {
    const updatedFuel = await Fuel.findByIdAndUpdate(
      id,
      { status, updatedAt: Date.now() },
      { new: true }
    );

    if (!updatedFuel) {
      return res.status(404).json({ message: "Fuel entry not found" });
    }

    res.status(200).json(updatedFuel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
