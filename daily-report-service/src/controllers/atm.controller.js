const ATM = require('../models/atm.model');

// Create a new ATM record
exports.createATM = async (req, res) => {
  try {
    const { createdBy, billdata, status } = req.body;

    // Calculate the totalAmount by summing up the 'Amount' field in the billdata array
    const totalAmount = billdata.reduce((total, bill) => total + bill.Amount, 0);

    const newATM = new ATM({
      totalAmount,
      createdBy,
      billdata,
      status,
    });

    await newATM.save();
    res.status(201).json(newATM);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// Get an ATM record by ID
exports.getATMById = async (req, res) => {
  try {
    const atm = await ATM.findById(req.params.id);
    if (!atm) {
      return res.status(404).json({ message: 'ATM record not found' });
    }
    res.json(atm);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all ATM records
exports.getAllATMs = async (req, res) => {
  try {
    const atms = await ATM.find();
    res.json(atms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an ATM record by ID
exports.updateATMById = async (req, res) => {
  try {
    const { totalAmount, createdBy, billdata, status } = req.body;

    const atm = await ATM.findById(req.params.id);
    if (!atm) {
      return res.status(404).json({ message: 'ATM record not found' });
    }

    if (totalAmount !== undefined) atm.totalAmount = totalAmount;
    if (createdBy !== undefined) atm.createdBy = createdBy;
    if (billdata !== undefined) atm.billdata = billdata;
    if (status !== undefined) atm.status = status;

    await atm.save();
    res.json(atm);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete an ATM record by ID
exports.deleteATMById = async (req, res) => {
  try {
    const atm = await ATM.findByIdAndDelete(req.params.id);
    if (!atm) {
      return res.status(404).json({ message: 'ATM record not found' });
    }
    res.json({ message: 'ATM record deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
