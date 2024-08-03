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

exports.getCreditorsByPumperId = async (req, res) => {
  try {
    // Extract pumperId and fuelType from request parameters or query
    const { id: pumperId } = req.params;

    // Find the creditors record by pumperId
    const creditors = await Creditors.find({
      "createdBy.pumperId": pumperId,
    });

    // Check if the creditors record is found
    if (!creditors) {
      return res.status(404).json({ message: "Creditors record not found" });
    }

    // // Generate a report
    const totalAmount = creditors.reduce(
      (total, record) => total + record.totalAmount,
      0
    );
    const report = {
      pumperId,
      pumperName: creditors[0].createdBy.pumperName,
      totalAmount,
      creditors,
    };

    const fuelSummary = creditors?.reduce((acc, creditor) => {
      creditor.creditorData.forEach((data) => {
        const { fuelType, fuelAmount, fuelPrice } = data;
    
        // If the fuelType already exists in the accumulator, update the totals
        if (acc[fuelType]) {
          acc[fuelType].totalAmount += fuelAmount;
          acc[fuelType].totalPrice += fuelAmount * fuelPrice;
        } else {
          // Otherwise, initialize the totals for this fuelType
          acc[fuelType] = {
            totalAmount: fuelAmount,
            totalPrice: fuelAmount * fuelPrice,
          };
        }
      });
    
      return acc;
    }, {});
    
    // Convert the result to an array of objects if needed
    const fuelSummaryArray = Object.keys(fuelSummary).map((fuelType) => ({
      fuelType,
      totalAmount: fuelSummary[fuelType].totalAmount,
      totalPrice: fuelSummary[fuelType].totalPrice,
    }));
    
    console.log(fuelSummaryArray);
    
    res.json({ report, fuelSummary });
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
