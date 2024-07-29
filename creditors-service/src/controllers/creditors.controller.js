const Creditors = require("../models/creditors.model");

// Create a new creditor
exports.createCreditor = async (req, res) => {
  const { name, address, phoneNumber, status } = req.body;

  try {
    const creditor = await Creditors.findOne({ name: name });
    if (creditor) {
      res.status(400).json({ message: `${creditor.name} already saved` });
    } else {
      const newCreditor = new Creditors({
        name,
        address,
        phoneNumber,
        status,
      });

      const savedCreditor = await newCreditor.save();
      res.status(201).json(savedCreditor);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// View all creditors
exports.getAllCreditors = async (req, res) => {
  try {
    const creditors = await Creditors.find();
    res.status(200).json(creditors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// View one creditor by ID
exports.getCreditorById = async (req, res) => {
  const { id } = req.params;

  try {
    const creditor = await Creditors.findById(id);
    if (!creditor) {
      return res.status(404).json({ error: "Creditor not found" });
    }
    res.status(200).json(creditor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update creditor information
exports.updateCreditor = async (req, res) => {
  const { id } = req.params;
  const { name, address, phoneNumber, status } = req.body;

  try {
    const updatedCreditor = await Creditors.findByIdAndUpdate(
      id,
      { name, address, phoneNumber, status, updatedAt: Date.now() },
      { new: true }
    );

    if (!updatedCreditor) {
      return res.status(404).json({ error: "Creditor not found" });
    }

    res.status(200).json(updatedCreditor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a creditor (update status to 'deleted')
exports.deleteCreditor = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCreditor = await Creditors.findByIdAndUpdate(
      id,
      { status: "deleted", updatedAt: Date.now() },
      { new: true }
    );

    if (!deletedCreditor) {
      return res.status(404).json({ error: "Creditor not found" });
    }

    res.status(200).json(deletedCreditor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
