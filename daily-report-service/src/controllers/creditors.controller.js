const Creditors = require("../models/creditors.model");
const httpStatus = require("http-status");

// Create a new Creditors record
exports.createCreditors = async (req, res) => {
  try {
    const { creditorData, createdBy } = req.body;

    // Calculate totalAmount
    const totalAmount = creditorData.reduce(
      (total, creditor) => total + creditor.amount,
      0
    );

    const newCreditors = new Creditors({
      creditorData,
      totalAmount,
      createdBy,
    });

    await newCreditors.save();
    res.status(httpStatus.CREATED).json(newCreditors);
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json({ error: error.message });
  }
};

// Get a Creditors record by ID
exports.getCreditorsById = async (req, res) => {
  try {
    const creditors = await Creditors.findById(req.params.id);
    if (!creditors) {
      return res.status(404).json({ message: "Creditors record not found" });
    }
    res.json(creditors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Get a Creditors record by ID
exports.getCreditorsBypumperId = async (req, res) => {
  try {
    const creditors = await Creditors.findById({
      "createdBy.pumperId": req.params.id,
    });
    if (!creditors) {
      return res.status(404).json({ message: "Creditors record not found" });
    }
    res.json(creditors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all Creditors records
exports.getAllCreditors = async (req, res) => {
  try {
    const creditors = await Creditors.find();
    res.json(creditors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a Creditors record by ID
exports.updateCreditorsById = async (req, res) => {
  try {
    const { creditorData, createdBy, status } = req.body;

    const creditors = await Creditors.findById(req.params.id);
    if (!creditors) {
      return res.status(404).json({ message: "Creditors record not found" });
    }

    if (creditorData !== undefined) creditors.creditorData = creditorData;
    if (createdBy !== undefined) creditors.createdBy = createdBy;
    if (status !== undefined) creditors.status = status;

    await creditors.save();
    res.json(creditors);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a Creditors record by ID
exports.deleteCreditorsById = async (req, res) => {
  try {
    const creditors = await Creditors.findByIdAndDelete(req.params.id);
    if (!creditors) {
      return res.status(404).json({ message: "Creditors record not found" });
    }
    res.json({ message: "Creditors record deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
