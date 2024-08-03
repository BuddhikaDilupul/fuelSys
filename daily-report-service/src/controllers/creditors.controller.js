const Creditors = require('../models/creditors.model');

// Create a new Creditors record
exports.createCreditors = async (req, res) => {
  try {
    const { creditorData, createdBy } = req.body;

    const newCreditors = new Creditors({
      creditorData,
      createdBy,
    });

    await newCreditors.save();
    res.status(201).json(newCreditors);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a Creditors record by ID
exports.getCreditorsById = async (req, res) => {
  try {
    const creditors = await Creditors.findById(req.params.id);
    if (!creditors) {
      return res.status(404).json({ message: 'Creditors record not found' });
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
      return res.status(404).json({ message: 'Creditors record not found' });
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
      return res.status(404).json({ message: 'Creditors record not found' });
    }
    res.json({ message: 'Creditors record deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
